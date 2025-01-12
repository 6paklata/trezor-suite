import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { bindActionCreators } from 'redux';

import { H2, Icon, colors, variables } from '@trezor/components-v2';
import * as routerActions from '@suite-actions/routerActions';
import { AppState, Dispatch } from '@suite-types';
import { IconType } from '@trezor/components-v2/lib/support/types';
import { Translation } from '@suite-components/Translation';
import messages from '@suite/support/messages';

const mapStateToProps = (state: AppState) => ({
    router: state.router,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    goto: bindActionCreators(routerActions.goto, dispatch),
});

type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

const LEFT_PADDING = '10px';
const TEXT_COLOR = colors.BLACK25;
const ACTIVE_TEXT_COLOR = colors.BLACK0;
const SECONDARY_COLOR = colors.BLACK96;

const ContentWrapper = styled.div`
    padding: 0 ${LEFT_PADDING};
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Bottom = styled.div`
    margin-top: auto;
`;

const Heading = styled(H2)`
    padding-left: ${LEFT_PADDING};
    color: ${colors.BLACK50};
    font-size: ${variables.FONT_SIZE.NORMAL};
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
    text-transform: uppercase;
`;

const Items = styled.div``;

const ItemWrapper = styled.div<{ isActive?: boolean }>`
    width: 100%;
    height: 50px;
    border-radius: 6px;
    font-size: ${variables.FONT_SIZE.SMALL};
    cursor: pointer;
    color: ${({ isActive }) => (isActive ? ACTIVE_TEXT_COLOR : TEXT_COLOR)};
    /* todo: not in variables */
    font-weight: ${({ isActive }) => (isActive ? 500 : variables.FONT_WEIGHT.REGULAR)};
    display: flex;
    align-items: center;

    ${({ isActive }) =>
        isActive &&
        css`
            background-color: ${SECONDARY_COLOR};
        `}
`;

const StyledIcon = styled(Icon)`
    padding-left: ${LEFT_PADDING};
    padding-right: 10px;
    margin-bottom: 2px;
`;

interface ItemProps {
    label: string;
    icon: IconType;
    onClick?: () => void;
    dataTest?: string;
    isActive?: boolean;
}

const Item = ({ label, icon, onClick, dataTest, isActive }: ItemProps) => (
    <ItemWrapper
        onClick={onClick}
        data-test={`@suite/settings/menu/${dataTest}`}
        isActive={isActive}
    >
        <StyledIcon color={isActive ? ACTIVE_TEXT_COLOR : TEXT_COLOR} icon={icon} size={18} />
        {label}
    </ItemWrapper>
);

const ITEMS = [
    {
        label: 'General',
        dataTest: 'general',
        icon: 'SETTINGS',
        route: 'settings-index',
    },
    {
        label: 'Device',
        dataTest: 'device',
        icon: 'TREZOR',
        route: 'settings-device',
    },
    {
        label: 'Dashboard',
        dataTest: 'dashboard',
        icon: 'DASHBOARD',
        route: 'settings-dashboard',
    },
    {
        label: 'Wallet',
        dataTest: 'wallet',
        icon: 'WALLET',
        route: 'settings-wallet',
    },
    {
        label: 'Coins',
        dataTest: 'coins',
        icon: 'COINS',
        route: 'settings-coins',
    },
] as const;

const BOTTOM_ITEMS = [
    {
        label: 'Support',
        icon: 'SUPPORT',
    },
    {
        label: 'Show log',
        icon: 'LOG',
    },
] as const;

const SettignsMenu = ({ goto, router }: Props) => {
    return (
        <ContentWrapper>
            <Heading>
                <Translation>{messages.TR_SETTINGS}</Translation>
            </Heading>
            <Items>
                {ITEMS.map(i => (
                    <Item
                        key={i.label}
                        {...i}
                        onClick={() => goto(i.route)}
                        isActive={
                            router &&
                            typeof router.route !== 'undefined' &&
                            i.route === router.route.name
                        }
                    />
                ))}
            </Items>

            <Bottom>
                <Items>
                    {BOTTOM_ITEMS.map(i => (
                        <Item key={i.label} {...i} />
                    ))}
                </Items>
            </Bottom>
        </ContentWrapper>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SettignsMenu);
