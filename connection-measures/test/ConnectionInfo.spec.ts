import {describe, it, vi, expect, type Mock, test, beforeEach, afterEach} from 'vitest';

// SpeedTest Mock - important: this must be before other imports
vi.mock('@cloudflare/speedtest', () => {

    interface TestBehavior {
        clientBandwidth: number,
        error: boolean
    }

    class FakeSpeedTest {
        play = vi.fn();
        pause = vi.fn();
        onFinish?: () => void;
        onError?: () => void;
        results = { getDownloadBandwidth: vi.fn() };
    }

    let testBehavior: TestBehavior;
    let lastInstance: any;

    const fakeContructor = vi.fn().mockImplementation((opts) => {
        lastInstance = new FakeSpeedTest();

        // mock play depending on testBehavior
        lastInstance.play.mockImplementation(() => {
            // async:
            queueMicrotask(() => {
                if (testBehavior.error) {
                    lastInstance.onError?.();
                    return;
                }
                // TODO on timeout
                lastInstance.onFinish?.();
            })
        });

        // results depending on testBehavior
        lastInstance.results.getDownloadBandwidth.mockImplementation(vi.fn().mockReturnValue(testBehavior.error ? undefined : testBehavior.clientBandwidth));

        return lastInstance;
    });
    return {
        __esModule: true,
        default: fakeContructor,
        _setTestBehavior: (b: TestBehavior) => (testBehavior = b),
        _getLastInstance: () => lastInstance,
    }
});

// Important: imports must be _after_ mocking
import { ConnectionInfo } from '../src/ConnectionInfo';
// @ts-expect-error we need this for the mock test behavior
import { _setTestBehavior, _getLastInstance } from '@cloudflare/speedtest';

describe('ConnectionInfo', async () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('error -> slow', async () => {
        await basicFn(100_000_000, undefined, 5, 100,  true,false);
    })

    it('10Mbps client (threshold 5Mbps) -> fast', async () => {
        await basicFn(10_000_000, undefined, 5, 100,  false,true);
    })


    it('1Mbps client (threshold 5Mbps) -> slow', async () => {
        await basicFn(1_000_000, undefined, 5, 100,  false,false);
    })


    it('52Mbps client (threshold 50Mbps) -> fast', async () => {
        await basicFn(52_000_000, undefined, 50, 100,  false,true);
    })

    it('10Mbps client (threshold 50Mbps) -> slow', async () => {
        await basicFn(10_000_000, undefined, 50, 100,  false,false);
    })


    it('fast client with saveData -> slow', async () => {
        await basicFn(10_000_000, true, 5, 100, false,false);
    })



    const basicFn = async (clientBandwidth: number, clientSaveData: boolean | undefined, thresholdMbps: number, timeoutMs: number, error: boolean, expectedCanUseFast: boolean) => {

        // Mock SpeedTest
        _setTestBehavior({clientBandwidth, error});

        // Mock saveData
        if (clientSaveData !== undefined) {
            Object.defineProperty(global.navigator, 'connection', {
                value: { saveData: clientSaveData },
                configurable: true,
            });
        }

        const connectionInfo = new ConnectionInfo();

        // assert initial state
        expect(connectionInfo.hasMeasured).toBeFalsy();
        expect(connectionInfo.canUseFastConnection).toBeFalsy();

        // execute
        connectionInfo.measureConnectionSpeed({ thresholdMbps: thresholdMbps, timeoutMs: timeoutMs });

        // proceed in time TODO choose wisely
        // vi.runAllTimers?.();
        // vi.advanceTimersByTime(timeoutMs);
        await Promise.resolve(); // wait for queueMicrotask onError/onFinish

        // assert result
        expect(connectionInfo.hasMeasured).toBeTruthy();
        expect(connectionInfo.canUseFastConnection).toEqual(expectedCanUseFast);
    }

});
