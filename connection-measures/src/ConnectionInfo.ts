import SpeedTest from '@cloudflare/speedtest';

/**
 * Svelte-free implementation in order to be unit-testable
 */
export class ConnectionInfo {
  private saveData: boolean | undefined = undefined;
  private connectionSpeed: 'fast' | 'slow' | undefined = undefined;

  get hasMeasured(): boolean {
     return this.saveData === true || this.connectionSpeed !== undefined;
  }

  /**
   * If the measurement has completed with 'fast' and no "data saver" is set, we can use the fast
   * connection. If anything went wrong or until the test is done, always fallback to 'slow'
   */
  get canUseFastConnection(): boolean {
    return this.connectionSpeed === 'fast' && this.saveData === false;
  }

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
    this.saveData = ConnectionInfo.readSaveData();
    if (!this.saveData) {
      ConnectionInfo.measureConnectionSpeed(options, (decision) => {
        this.connectionSpeed = decision;
        console.debug('measured speed', decision);
      });
    }
  }


  private static readSaveData(): boolean {
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
  private static measureConnectionSpeed(
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
      const mbps = (bps ?? 0) / 1000000; // megabits per second
      decided = typeof bps === 'number' && mbps >= options.thresholdMbps ? 'fast' : 'slow';
      console.debug(`connection speed ${ConnectionInfo.getReadableFileSizeString(bps)} => ${decided}`);
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

  public static getReadableFileSizeString(fileSizeInBytes)  {
    let i = -1;
    const byteUnits = [' kbps', ' Mbps', ' Gbps', ' Tbps', 'Pbps', 'Ebps', 'Zbps', 'Ybps'];
    do {
      fileSizeInBytes = fileSizeInBytes / 1024;
      i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  };

}
