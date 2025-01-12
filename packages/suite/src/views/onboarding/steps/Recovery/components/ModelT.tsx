import * as connectActions from '@onboarding-actions/connectActions';
import { RECOVER_DEVICE } from '@onboarding-actions/constants/calls';
import * as onboardingActions from '@onboarding-actions/onboardingActions';
import { OnboardingButton, Text, Wrapper } from '@onboarding-components';
import { Translation } from '@suite-components/Translation';
import { AppState, Dispatch } from '@suite-types';
import messages from '@suite/support/messages';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import styled from 'styled-components';
const mapStateToProps = (state: AppState) => ({
    uiInteraction: state.onboarding.uiInteraction,
    deviceCall: state.onboarding.deviceCall,
    device: state.suite.device,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onboardingActions: {
        goToNextStep: bindActionCreators(onboardingActions.goToNextStep, dispatch),
        goToPreviousStep: bindActionCreators(onboardingActions.goToPreviousStep, dispatch),
    },
    connectActions: {
        recoveryDevice: bindActionCreators(connectActions.recoveryDevice, dispatch),
        resetCall: bindActionCreators(connectActions.resetCall, dispatch),
    },
});

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps> &
    WrappedComponentProps;

const RecoveryStepModelT = (props: Props) => {
    const { deviceCall, device, uiInteraction, connectActions } = props;

    const getStatus = () => {
        // todo: legacy, older firmwares dont respond with ButtonRequest_Success
        // this could be deleted if we forbid user to continue without updating fw to the latest
        if (deviceCall.result && deviceCall.name === RECOVER_DEVICE) {
            return 'success';
        }
        if (uiInteraction.name === 'ButtonRequest_Success') {
            return 'success';
        }
        if (
            deviceCall.error &&
            deviceCall.error !== 'Cancelled' &&
            deviceCall.name === RECOVER_DEVICE &&
            // on model T, recovery is persistent. when devices reaches recovery_mode, disconnecting
            // does not mean failure.
            device &&
            device.features &&
            device.features.recovery_mode !== true
        ) {
            return 'error';
        }
        return null;
    };

    const recoveryDevice = () => {
        connectActions.recoveryDevice();
    };

    return (
        <Wrapper.Step>
            <Wrapper.StepHeading>
                {getStatus() === null && 'Recover your device from seed'}
                {/* todo ? */}
                {getStatus() === 'success' && 'Device recovered from seed'}
            </Wrapper.StepHeading>
            <Wrapper.StepBody>
                {getStatus() === null && (
                    <>
                        <Text>
                            <Translation {...messages.TR_RECOVER_SUBHEADING_MODEL_T} />
                        </Text>
                        <Wrapper.Controls>
                            <OnboardingButton.Cta
                                onClick={() => {
                                    recoveryDevice();
                                }}
                            >
                                <Translation {...messages.TR_START_RECOVERY} />
                            </OnboardingButton.Cta>
                        </Wrapper.Controls>
                    </>
                )}
                {getStatus() === 'success' && (
                    <Wrapper.Controls>
                        <OnboardingButton.Cta
                            onClick={() => props.onboardingActions.goToNextStep()}
                        >
                            Continue
                        </OnboardingButton.Cta>
                    </Wrapper.Controls>
                )}
                {getStatus() === 'error' && (
                    <>
                        <Text>
                            <Translation
                                {...messages.TR_RECOVERY_ERROR}
                                values={{ error: deviceCall.error || '' }}
                            />
                        </Text>
                        <OnboardingButton.Cta
                            onClick={() => {
                                props.connectActions.resetCall();
                            }}
                        >
                            <Translation {...messages.TR_RETRY} />
                        </OnboardingButton.Cta>
                    </>
                )}
            </Wrapper.StepBody>

            <Wrapper.StepFooter>
                {getStatus() == null && (
                    <OnboardingButton.Back
                        onClick={() => props.onboardingActions.goToPreviousStep()}
                    >
                        Back
                    </OnboardingButton.Back>
                )}
            </Wrapper.StepFooter>
        </Wrapper.Step>
    );
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(RecoveryStepModelT));
