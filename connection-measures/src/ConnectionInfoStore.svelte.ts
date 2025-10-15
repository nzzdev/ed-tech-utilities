import {ConnectionInfo} from "./ConnectionInfo";

export class ConnectionInfoStore {
  private connectionInfoBasic = new ConnectionInfo();

  constructor() {
    this.connectionInfoBasic.onChange = this.react; // update values when they change
    this.react(); // initial values
  }

  private react() {
    this.canUseFastConnection = this.connectionInfoBasic.canUseFastConnection;
    this.hasMeasured = this.connectionInfoBasic.hasMeasured;
  }

  /**
   * If the measurement has completed with 'fast' and no "data saver" is set, we can use the fast
   * connection. If anything went wrong or until the test is done, always fallback to 'slow'
   */
  public canUseFastConnection: boolean = $state(false);

  /**
   * Returns true as soon as the measurement has finished or aborted
   */
  public hasMeasured = $state(false);

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
    this.connectionInfoBasic.measureConnectionSpeed(options);
  }

}
