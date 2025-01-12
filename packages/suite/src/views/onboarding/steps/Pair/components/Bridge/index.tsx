import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Select } from '@trezor/components';
import { Link } from '@trezor/components-v2';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { Translation } from '@suite-components/Translation';

import { goToSubStep, goToNextStep, goToPreviousStep } from '@onboarding-actions/onboardingActions';
import messages from '@suite/support/messages';
import { Loaders, Text, OnboardingButton, Wrapper } from '@onboarding-components';
import { AppState } from '@suite-types';

const PageWrapper = styled.div``;

const SelectWrapper = styled(Select)`
    margin-right: 10px;
    width: 180px;
`;

const Download = styled.div`
    margin: 24px auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
`;
interface Installer {
    label: string;
    value: string;
    signature: string;
    preferred: boolean;
}

interface BridgeState {
    target: Installer;
    uri: string;
    installers: Installer[];
}

interface Props {
    transport: AppState['suite']['transport'];
    activeSubStep: AppState['onboarding']['activeSubStep'];
    onboardingActions: {
        goToNextStep: typeof goToNextStep;
        goToSubStep: typeof goToSubStep;
        goToPreviousStep: typeof goToPreviousStep;
    };
}

class InstallBridge extends PureComponent<Props & WrappedComponentProps, BridgeState> {
    constructor(props: Props & WrappedComponentProps) {
        super(props);
        const installers = this.getInstallers();
        this.state = {
            target: installers.find((i: Installer) => i.preferred === true) || installers[0],
            uri: 'https://data.trezor.io/', // todo: urls
            installers,
        };
    }

    onChange(value: Installer) {
        this.setState({
            target: value,
        });
    }

    getStatus() {
        if (this.props.transport!.type === 'bridge') {
            return 'installed';
        }
        return this.props.activeSubStep;
    }

    getInstallers() {
        // todo: typescript from connect
        return this.props.transport!.bridge.packages.map((p: any) => ({
            label: p.name,
            value: p.url,
            signature: p.signature,
            preferred: p.preferred,
        }));
    }

    download() {
        this.props.onboardingActions.goToSubStep('downloading');
    }

    render() {
        const { target, uri, installers } = this.state;
        const status = this.getStatus();

        return (
            // this wrapper is just to be able to have data-test attribute
            <PageWrapper data-test="@onboarding/bridge">
                <Text size="small">
                    {status === 'installed' && (
                        <Translation
                            {...messages.TR_TREZOR_BRIDGE_IS_RUNNING_VERSION}
                            values={{ version: this.props.transport!.version }}
                        />
                    )}
                    {status !== 'installed' && (
                        <Translation {...messages.TR_TREZOR_BRIDGE_IS_NOT_RUNNING} />
                    )}
                </Text>

                <Text>
                    <Translation {...messages.TR_BRIDGE_SUBHEADING} />
                </Text>

                {status === null && (
                    <Download>
                        <SelectWrapper
                            isSearchable={false}
                            isClearable={false}
                            value={target}
                            onChange={(v: Installer) => this.onChange(v)}
                            options={installers}
                        />
                        <Link href={`${uri}${target.value}`}>
                            <OnboardingButton.Cta onClick={() => this.download()}>
                                <Translation {...messages.TR_DOWNLOAD} />
                            </OnboardingButton.Cta>
                        </Link>
                    </Download>
                )}

                {status === 'downloading' && (
                    <>
                        <Text>1.</Text>
                        <Text>
                            <Translation {...messages.TR_WAIT_FOR_FILE_TO_DOWNLOAD} />
                        </Text>
                        {target.signature && (
                            <Text>
                                <Link href={uri + target.signature}>
                                    <Translation {...messages.TR_CHECK_PGP_SIGNATURE} />
                                </Link>
                            </Text>
                        )}
                        <Text>2.</Text>
                        <Text>
                            <Translation {...messages.TR_DOUBLE_CLICK_IT_TO_RUN_INSTALLER} />
                        </Text>
                        <Text>3.</Text>
                        <Text>
                            <Translation {...messages.TR_DETECTING_BRIDGE} />
                            <Loaders.Dots maxCount={3} />
                        </Text>
                    </>
                )}

                {status === 'installed' && (
                    <>
                        <Wrapper.Controls>
                            <OnboardingButton.Cta
                                onClick={() => this.props.onboardingActions.goToNextStep()}
                            >
                                <Translation {...messages.TR_CONTINUE} />
                            </OnboardingButton.Cta>
                        </Wrapper.Controls>
                    </>
                )}
            </PageWrapper>
        );
    }
}

export default injectIntl(InstallBridge);
