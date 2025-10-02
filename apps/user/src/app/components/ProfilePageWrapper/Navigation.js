import styled from '@emotion/styled';
import { withGtmEvent } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React from 'react';
import { Link } from 'react-router-dom';

import { withGtmCategory } from '../../hoc/withGtmCategory';
import { Routes } from '../../internals/router/Routes';
import { primary } from '../../styles/colors';
import fonts from '../../styles/fonts';

const DesktopDiv = styled.div`
    width: 30%;
    float: left;
    font-family: ${fonts.secondary};

    li {
        list-style-type: none;
        margin-bottom: 36px;
        a {
            color: ${primary.primary};
            &.active {
                color: ${primary.alt};
            }
        }
    }
`;

const MobileDiv = styled(DesktopDiv)`
    width: 100%;
    ul {
        padding-left: 0;
    }
`;

const LinkWithGtm = withGtmEvent(withGtmCategory(Link));

export const Navigation = ({ history, mobile }) => {
    const Div = mobile ? MobileDiv : DesktopDiv;

    return (
        <Div>
            <ul>
                <li>
                    <LinkWithGtm
                        data-qa='tab-profile-account'
                        to={Routes.profile}
                        className={history.location.pathname === Routes.profile ? 'active' : undefined}
                        gtmAction='tab-profile-account'
                    >
                        {translate('Your account')}
                    </LinkWithGtm>
                </li>
                <li>
                    <LinkWithGtm
                        data-qa='tab-profile-subscription'
                        to={Routes.subscription}
                        className={history.location.pathname === Routes.subscription ? 'active' : undefined}
                        gtmAction='tab-profile-subscription'
                    >
                        {translate('Subscription')}
                    </LinkWithGtm>
                </li>
            </ul>
        </Div>
    );
};
