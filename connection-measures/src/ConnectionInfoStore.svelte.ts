import {ConnectionInfo, ConnectionSpeedTestOptions} from "./ConnectionInfo";

export class ConnectionInfoStore {
  private connectionInfoBasic = new ConnectionInfo();

  constructor() {
    this.connectionInfoBasic.onChange = () => this.updateFrom(this.connectionInfoBasic); // update values when they change
    this.updateFrom(this.connectionInfoBasic); // initial values
  }

  private updateFrom(ci: ConnectionInfo) {
    this.canUseFastConnection = ci.canUseFastConnection;
    this.hasMeasured = ci.hasMeasured;
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
   * @param {ConnectionSpeedTestOptions} options - options
   * @param options.thresholdMbps if the connection is faster than this, we decide it is 'fast', otherwise 'slow'
   * @param options.timeoutMs if the test goes longer than this, stop and assume 'slow'
   */
  public measureConnectionSpeed(options: ConnectionSpeedTestOptions) {
    this.connectionInfoBasic.measureConnectionSpeed(options);
  }

}
