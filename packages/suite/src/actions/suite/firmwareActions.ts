import TrezorConnect from 'trezor-connect';
import Rollout from '@trezor/rollout';

import { lockUI } from '@suite-actions/suiteActions';

//  TODO: should be reworked to deviceManagementActions

// todo: refactor to suite
// import * as notificationActions from '@wallet-actions/notificationActions';
import { SET_UPDATE_STATUS } from '@suite-actions/constants/firmware';
import { AnyStatus } from '@suite-reducers/firmwareReducer';
import { Dispatch, GetState } from '@suite-types';

export const firmwareUpdate = () => async (dispatch: Dispatch, getState: GetState) => {
    // todo remove error notification
    // dispatch(notificationActions.add({
    //     variant: "success",
    //     title: 'hello',
    // }))

    const { device } = getState().suite;
    if (!device || !device.connected || device.type !== 'acquired') {
        return;
        // todo: probably dispatch error notification?
    }
    dispatch(lockUI(true));
    dispatch({ type: SET_UPDATE_STATUS, payload: 'started' });
    dispatch({ type: SET_UPDATE_STATUS, payload: 'downloading' });

    const rollout = Rollout({
        releasesListsPaths: {
            1: 'data/firmware/1/releases.json',
            2: 'data/firmware/2/releases.json',
        },
        baseUrl: 'https://beta-wallet.trezor.io',
    });

    let fw;
    try {
        fw = await rollout.getFw(device.features);
        if (!fw) {
            throw new Error('no firmware found');
        }
    } catch (error) {
        // todo dispatch error notification
        return;
    }

    dispatch({ type: SET_UPDATE_STATUS, payload: 'installing' });

    // todo: when types in connect ready
    const payload: any = {
        payload: fw,
        keepSession: false,
        skipFinalReload: true,
        device,
        length: fw.byteLength, // todo: this should be inferred by connect auto magically probably
    };
    const updateResponse = await TrezorConnect.firmwareUpdate(payload);
    if (!updateResponse.success) {
        // todo dispatch error notification
        dispatch({ type: SET_UPDATE_STATUS, payload: 'error' });
        return dispatch(lockUI(false));
    }

    dispatch({ type: SET_UPDATE_STATUS, payload: 'restarting' });

    dispatch(lockUI(false));
};

export interface FirmwareUpdateActions {
    updateFirmware: typeof firmwareUpdate;
}

interface SetUpdateStatusAction {
    type: typeof SET_UPDATE_STATUS;
    payload: AnyStatus;
}

export type FirmwareUpdateActionTypes = SetUpdateStatusAction;