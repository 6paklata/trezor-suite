import { Translation } from '@suite-components/Translation';
import { TrezorDevice } from '@suite-types';
import messages from '@suite/support/messages';
import { Loader } from '@trezor/components';
import { Button, H2, P } from '@trezor/components-v2';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import styled from 'styled-components';

const ButtonContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const StyledP = styled(P)`
    padding: 20px 0;
`;

const Wrapper = styled.div`
    width: 360px;
    padding: 30px 48px;
`;

const Text = styled.div``;

const Column = styled.div`
    display: flex;
    flex-direction: column;

    button + button {
        margin-top: 10px;
    }
`;

const StyledLoader = styled(Loader)`
    padding-left: 6px;
`;

const ButtonWithLoader = styled(Button)`
    padding-top: 6px;
    padding-bottom: 6px;
`;

interface State {
    countdown: number;
}

interface Props {
    device: TrezorDevice;
    instances?: TrezorDevice[];
    onRememberDevice: (device: TrezorDevice) => void;
    onForgetDevice: (device: TrezorDevice) => void;
}

const RememberDevice: FunctionComponent<Props> = ({
    device,
    instances,
    onRememberDevice,
    onForgetDevice,
}) => {
    const [countdown, setCountdown] = useState<State['countdown']>(10);
    const deviceCount = instances ? instances.length : 0;
    useHotkeys('enter', () => onForgetDevice(device));

    useEffect(() => {
        let timeout = -1;
        if (countdown > 0) {
            timeout = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else {
            onForgetDevice(device);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [countdown, device, onForgetDevice]);

    return (
        <Wrapper>
            <H2>
                <Translation
                    {...messages.TR_FORGET_LABEL}
                    values={{
                        deviceLabel: device.label,
                    }}
                />
            </H2>
            <StyledP size="small">
                <Translation
                    {...messages.TR_WOULD_YOU_LIKE_TREZOR_WALLET_TO}
                    values={{
                        deviceCount,
                    }}
                />
            </StyledP>
            <Column>
                <ButtonWithLoader onClick={() => onForgetDevice(device)}>
                    <ButtonContent>
                        <Text>
                            <Translation {...messages.TR_FORGET_DEVICE} />
                        </Text>
                        <StyledLoader
                            isSmallText
                            isWhiteText
                            size={28}
                            text={countdown.toString()}
                        />
                    </ButtonContent>
                </ButtonWithLoader>
                <Button variant="secondary" onClick={() => onRememberDevice(device)}>
                    <Translation {...messages.TR_REMEMBER_DEVICE} />
                </Button>
            </Column>
        </Wrapper>
    );
};

export default RememberDevice;
