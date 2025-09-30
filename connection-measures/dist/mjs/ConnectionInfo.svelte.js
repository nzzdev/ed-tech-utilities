import SpeedTest from '@cloudflare/speedtest';
export class ConnectionInfo {
    constructor() {
        this.saveData = $state();
        this.connectionSpeed = $state();
        this.hasMeasured = $derived(this.saveData === true || this.connectionSpeed !== undefined);
        /**
         * If the measurement has completed with 'fast' and no "data saver" is set, we can use the fast
         * connection. If anything went wrong or until the test is done, always fallback to 'slow'
         */
        this.canUseFastConnection = $derived(this.connectionSpeed === 'fast' && this.saveData === false);
    }
    /**
     *
     * Does a quick connection speed test and decides if the connection is fast or slow. Also, if the client
     * has the "data saver" flag, the speed test is skipped and we will assume 'slow' connection.
     *
     * @param options.thresholdMbps if the connection is faster than this, we decide it is 'fast', otherwise 'slow'
     * @param options.timeoutMs if the test goes longer than this, stop and assume 'slow'
     */
    measureConnectionSpeed(options) {
        this.saveData = readSaveData();
        if (!this.saveData) {
            measureConnectionSpeed(options, (decision) => {
                this.connectionSpeed = decision;
                console.debug('measured speed', decision);
            });
        }
    }
}
function readSaveData() {
    const connection = 
    // @ts-expect-error Unsupported vendor-prefixed connection accessors.
    (navigator === null || navigator === void 0 ? void 0 : navigator.connection) || (navigator === null || navigator === void 0 ? void 0 : navigator.mozConnection) || (navigator === null || navigator === void 0 ? void 0 : navigator.webkitConnection);
    const saveData = connection === null || connection === void 0 ? void 0 : connection.saveData;
    console.debug('saveData', saveData);
    return saveData === true;
}
/**
 * Does a quick connection speed test and decides if the connection is fast or slow
 * @param options.thresholdMbps if the connection is faster than this, we decide it is 'fast', otherwise 'slow'
 * @param options.timeoutMs if the test goes longer than this, stop and assume 'slow'
 * @param onDecision do something with the result
 */
function measureConnectionSpeed(options, onDecision) {
    // download 3 x 1KB:
    const packageSizeBytes = 1024 * 10;
    const packageCount = 3;
    let decided;
    console.log('measuring connection speed...');
    const st = new SpeedTest({
        autoStart: false,
        measureDownloadLoadedLatency: false,
        measureUploadLoadedLatency: false,
        measurements: [{ type: 'download', bytes: packageSizeBytes, count: packageCount }],
        bandwidthMinRequestDuration: 10,
    });
    const decide = () => {
        var _a, _b;
        const bps = (_b = (_a = st.results).getDownloadBandwidth) === null || _b === void 0 ? void 0 : _b.call(_a); // bits per second
        const kbps = Math.floor((bps !== null && bps !== void 0 ? bps : 0) / 1024);
        const mbps = (kbps !== null && kbps !== void 0 ? kbps : 0) / 1024; // megabits per second
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
        if (!decided)
            decided = 'slow';
        console.debug('connection speed onError');
        onDecision(decided !== null && decided !== void 0 ? decided : 'slow');
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
