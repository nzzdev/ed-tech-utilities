import SpeedTest from '@cloudflare/speedtest';

export class ConnectionInfo {
  saveData: boolean | undefined = $state();
  connectionSpeed: 'fast' | 'slow' | undefined = $state();

  hasMeasured: boolean = $derived(this.saveData === true || this.connectionSpeed !== undefined);

  /**
   * If the measurement has completed with 'fast' and no "data saver" is set, we can use the fast
   * connection. If anything went wrong or until the test is done, always fallback to 'slow'
   */
  canUseFastConnection: boolean = $derived(this.connectionSpeed === 'fast' && this.saveData === false);

  /**
   *
   * Does a quick connection speed test and decides if the connection is fast or slow. Also, if the client
   * has the "data saver" flag, the speed test is skipped and we will assume 'slow' connection.
   *
   * @param {Object} options - options
   * @param options.thresholdMbps if the connection is faster than this, we decide it is 'fast', otherwise 'slow'
   * @param options.timeoutMs if the test goes longer than this, stop and assume 'slow'
   */
  public measureConnectionSpeed(options: { thresholdMbps: number; timeoutMs: number }) {
    this.saveData = readSaveData();
    if (!this.saveData) {
      measureConnectionSpeed(options, (decision) => {
        this.connectionSpeed = decision;
        console.debug('measured speed', decision);
      });
    }
  }
}

function readSaveData(): boolean {
  const connection =
    // @ts-expect-error Unsupported vendor-prefixed connection accessors.
    navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;
  const saveData = connection?.saveData;
  console.debug('saveData', saveData);
  return saveData === true;
}

/**
 * Does a quick connection speed test and decides if the connection is fast or slow
 * @param {Object} options - options
 * @param options.thresholdMbps - if the connection is faster than this, we decide it is 'fast', otherwise 'slow'
 * @param options.timeoutMs - if the test goes longer than this, stop and assume 'slow'
 * @param onDecision - do something with the result
 */
function measureConnectionSpeed(
  options: {
    thresholdMbps: number;
    timeoutMs: number;
  },
  onDecision: (decision: 'fast' | 'slow') => void,
) {
  // download 3 x 1KB:
  const packageSizeBytes = 1024 * 10;
  const packageCount = 3;
  let decided: 'fast' | 'slow';
  console.log('measuring connection speed...');

  const st = new SpeedTest({
    autoStart: false,
    measureDownloadLoadedLatency: false,
    measureUploadLoadedLatency: false,
    measurements: [{ type: 'download', bytes: packageSizeBytes, count: packageCount }],
    bandwidthMinRequestDuration: 10,
  });

  const decide = () => {
    const bps = st.results.getDownloadBandwidth?.(); // bits per second
    const kbps = Math.floor((bps ?? 0) / 1024);
    const mbps = (kbps ?? 0) / 1024; // megabits per second
    decided = typeof bps === 'number' && mbps >= options.thresholdMbps ? 'fast' : 'slow';
    console.debug(`connection speed ${mbps.toLocaleString('de', { maximumFractionDigits: 1 })}Mbps = ${decided}`);
  };

  st.onFinish = () => {
    console.debug(`connection speed onFinish`);
    decide();
    onDecision(decided);
  };

  // Fehler -> slow
  st.onError = () => {
    if (!decided) decided = 'slow';
    console.debug('connection speed onError');
    onDecision(decided ?? 'slow');
  };

  // stop anyway after a given timeout
  setTimeout(() => {
    if (!decided) {
      console.debug(`connection speed onTimeout`);
      decide();
      st.pause();
      onDecision(decided);
    }
  }, options.timeoutMs);

  st.play();
}
