/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable global-require */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fixtures from './fixtures/deviceSettings';

const { getSuiteDevice } = global.JestMocks;

jest.mock('trezor-connect', () => {
    let fixture: any;

    return {
        __esModule: true, // this property makes it work
        default: {
            applySettings: () => Promise.resolve(fixture),
            wipeDevice: () => Promise.resolve(fixture),
            changePin: () => Promise.resolve(fixture),
        },
        setTestFixtures: (f: any) => {
            fixture = f;
        },
    };
});

export const getInitialState = (): any => {
    return {
        suite: { device: getSuiteDevice() },
    };
};
const mockStore = configureStore<ReturnType<typeof getInitialState>, any>([thunk]);

describe('DeviceSettings Actions', () => {
    fixtures.forEach(f => {
        it(f.description, async () => {
            if (f.mocks) {
                require('trezor-connect').setTestFixtures(f.mocks);
            }

            const state = getInitialState();
            const store = mockStore(state);
            await store.dispatch(f.action());

            if (f.result) {
                if (f.result.actions) {
                    expect(store.getActions()).toMatchObject(f.result.actions);
                }
            }
        });
    });
});
