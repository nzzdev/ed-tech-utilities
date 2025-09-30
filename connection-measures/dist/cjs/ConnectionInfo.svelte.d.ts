export declare class ConnectionInfo {
    saveData: boolean | undefined;
    connectionSpeed: 'fast' | 'slow' | undefined;
    hasMeasured: boolean;
    /**
     * If the measurement has completed with 'fast' and no "data saver" is set, we can use the fast
     * connection. If anything went wrong or until the test is done, always fallback to 'slow'
     */
    canUseFastConnection: boolean;
    /**
     *
     * Does a quick connection speed test and decides if the connection is fast or slow. Also, if the client
     * has the "data saver" flag, the speed test is skipped and we will assume 'slow' connection.
     *
     * @param {Object} options - options
     * @param options.thresholdMbps if the connection is faster than this, we decide it is 'fast', otherwise 'slow'
     * @param options.timeoutMs if the test goes longer than this, stop and assume 'slow'
     */
    measureConnectionSpeed(options: {
        thresholdMbps: number;
        timeoutMs: number;
    }): void;
}
