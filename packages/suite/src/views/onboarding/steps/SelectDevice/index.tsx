import React from 'react';
import { Translation } from '@suite-components/Translation';
import { TrezorImage } from '@trezor/components';
import { P } from '@trezor/components-v2';
import { Wrapper, OnboardingButton, Option } from '@onboarding-components';

import messages from '@suite/support/messages';
import { Props } from './Container';

const DEVICE_HEIGHT = 130;

const SelectDeviceStep = ({ onboardingActions }: Props) => {
    return (
        <Wrapper.Step>
            <Wrapper.StepHeading>
                <Translation {...messages.TR_SELECT_YOUR_DEVICE_HEADING} />
            </Wrapper.StepHeading>
            <Wrapper.StepBody>
                <Wrapper.Options>
                    <Option
                        data-test="@onboarding/option-model-one-path"
                        onClick={() => {
                            onboardingActions.selectTrezorModel(1);
                            onboardingActions.goToNextStep();
                        }}
                    >
                        <TrezorImage style={{ margin: '15px' }} model={1} height={DEVICE_HEIGHT} />
                        <P weight="bold">
                            <Translation {...messages.TR_MODEL_ONE} />
                        </P>
                    </Option>
                    <Option
                        data-test="@onboarding/option-model-t-path"
                        onClick={() => {
                            onboardingActions.selectTrezorModel(2);
                            onboardingActions.goToNextStep();
                        }}
                    >
                        <TrezorImage style={{ margin: '15px' }} model={2} height={DEVICE_HEIGHT} />
                        <P weight="bold">
                            <Translation {...messages.TR_MODEL_T} />
                        </P>
                    </Option>
                </Wrapper.Options>
            </Wrapper.StepBody>
            <Wrapper.StepFooter>
                <Wrapper.Controls>
                    <OnboardingButton.Back
                        onClick={() => {
                            onboardingActions.goToPreviousStep();
                        }}
                    >
                        Back
                    </OnboardingButton.Back>
                </Wrapper.Controls>
            </Wrapper.StepFooter>
        </Wrapper.Step>
    );
};

export default SelectDeviceStep;
