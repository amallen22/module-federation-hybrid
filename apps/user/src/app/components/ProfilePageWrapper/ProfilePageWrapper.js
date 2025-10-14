import './ProfilePageWrapper.scss';

import styled from '@emotion/styled';
import { withMobile } from '@npm_leadtech/cv-lib-app-components';
import classNames from 'classnames';
import React from 'react';

import { background } from '../../styles/colors';

const DesktopDiv = styled.div`
    background: ${background.white};
`;

const MobileDiv = styled(DesktopDiv)`
    background: #fff;
    padding-bottom: 30px;
    overflow: auto;
`;

const ProfilePageWrapper = ({ children, className, hideSidebar, mobile }) => {
    const wrapperClassName = classNames('profile-page-wrapper', {
        [className]: !!className,
    });

    const layoutClassName = classNames('row', 'collapse', 'u-fullWidth', {
        'cvLayout': !mobile,
        'cvLayout-mobile': mobile,
    });

    const contentClassName = classNames({
        'profile-page-wrapper-content': !hideSidebar,
        'profile-page-wrapper-content-mobile': !hideSidebar && mobile,
    });

    const WrapperDiv = mobile ? MobileDiv : DesktopDiv;

    return (
        <div>
            <WrapperDiv className={wrapperClassName}>
                <div className={layoutClassName}>
                    <div className='container'>
                        <div className={contentClassName}>{children}</div>
                    </div>
                </div>
            </WrapperDiv>
        </div>
    );
};

const ProfilePageWrapperWithMobile = withMobile(ProfilePageWrapper);

export { ProfilePageWrapperWithMobile as ProfilePageWrapper };
