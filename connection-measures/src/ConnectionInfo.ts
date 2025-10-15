import SpeedTest, {Results} from '@cloudflare/speedtest';

export interface ConnectionSpeedTestOptions {
  thresholdMbps: number;
  timeoutMs: number;
}
/**
 * Svelte-free implementation in order to be unit-testable
 */
export class ConnectionInfo {
  private saveData: boolean | undefined = undefined;
  private connectionSpeed: 'fast' | 'slow' | undefined = undefined;

  onChange?: () => void;

  constructor(onChange?: () => void) {
    this.onChange = onChange;
  }

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
   * @param {ConnectionSpeedTestOptions} options - options
   * @param options.thresholdMbps if the connection is faster than this, we decide it is 'fast', otherwise 'slow'
   * @param options.timeoutMs if the test goes longer than this, stop and assume 'slow'
   */
  public measureConnectionSpeed(options: ConnectionSpeedTestOptions) {
    this.saveData = ConnectionInfo.readSaveData();
    this.onChange?.();
    if (!this.saveData) {
      ConnectionInfo.measureConnectionSpeed(options, (decision) => {
        this.connectionSpeed = decision;
        this.onChange?.();
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
   * @param {ConnectionSpeedTestOptions} options - options
   * @param options.thresholdMbps - if the connection is faster than this, we decide it is 'fast', otherwise 'slow'
   * @param options.timeoutMs - if the test goes longer than this, stop and assume 'slow'
   * @param onDecision - do something with the result
   */
  private static measureConnectionSpeed(
      options: ConnectionSpeedTestOptions,
      onDecision: (decision: 'fast' | 'slow') => void
  ) {
    let decided: 'fast' | 'slow';
    console.log('measuring connection speed...');

    const st = new SpeedTest({
      autoStart: false,
      measureDownloadLoadedLatency: true,
      measureUploadLoadedLatency: false,
      bandwidthFinishRequestDuration: 500, // The minimum duration (in milliseconds) to reach in download/upload measurement sets for halting further measurements with larger file sizes in the same direction.
      measurements: [
        // initial download estimation (important: bypassMinDuration=true, otherwise a fast connection will get no results!)
        { type: 'download', bytes: 1e4, count: 1, bypassMinDuration: true }, // 1KB

        // more precise measurements
        { type: 'download', bytes: 1e4, count: 10 }, // 5 x 1KB
        { type: 'download', bytes: 1e5, count: 10 }, // 5 x 10KB
        { type: 'download', bytes: 1e6, count: 2 }, // 2 x 100KB
      ],
    });

    const decide = () => {
      const finalOrTmpResults = st.results;

      const bps = finalOrTmpResults.getDownloadBandwidth?.(); // bits per second
      if (bps === 0) {
        console.info(`connection speed bandwidth returned nothing`, bps, finalOrTmpResults.getSummary());
        return;
      }
      const mbps = (bps ?? 0) / 1_000_000; // megabits per second
      decided = typeof bps === 'number' && mbps >= options.thresholdMbps ? 'fast' : 'slow';
      console.info(`connection speed ${ConnectionInfo.getReadableFileSizeString(bps)} => ${decided}`, bps, finalOrTmpResults, finalOrTmpResults.getSummary(), options.thresholdMbps);

    };

    st.onFinish = (_results: Results) => {
      console.debug(`connection speed onFinish`);
      decide();
      onDecision(decided ?? 'slow');
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
        onDecision(decided ?? 'slow');
      }
    }, options.timeoutMs);

    st.play();
  }

  public static getReadableFileSizeString(fileSizeInBytes)  {
    let i = -1;
    const byteUnits = [' kbps', ' Mbps', ' Gbps'];
    do {
      fileSizeInBytes = fileSizeInBytes / 1000;
      i++;
    } while (fileSizeInBytes > 1000);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  };

}
