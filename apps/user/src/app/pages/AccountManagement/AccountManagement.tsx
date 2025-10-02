import { AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics';
import { InitialLoading } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React from 'react';

import { Footer } from '../../components/Footer/Footer';
import { ProfilePageWrapper } from '../../components/ProfilePageWrapper';
import { SubscriptionInfo } from '../../components/SubscriptionInfo';
import UserInfo from '../../components/UserInfo/UserInfo';
import useProfile from '../../hooks/useProfile';
import { AccountManagementWrapper, Container, SectionTitle, StyledProfileDiv, SubscriptionInfoSection } from './styles';

interface Props {
    // classes: {
    //     root: string;
    //     formControl: string;
    //     selectEmpty: string;
    // };
    history: any;
}

const AccountManagement = (props: Props) => {
    const { email, groupPermission, firstName, lastName, profilePhoto } = useProfile();

    if (!groupPermission) return <InitialLoading />;

    return (
        <>
            <AnalyticsLocationChange analyticsViewEvent='view_profile' />
            <ProfilePageWrapper history={props.history} className='subscription-management'>
                <Container>
                    <SectionTitle data-qa='account-settings-text'>{translate('Account Settings')}</SectionTitle>
                    <AccountManagementWrapper>
                        <StyledProfileDiv>
                            <UserInfo
                                email={email}
                                firstName={firstName}
                                lastName={lastName}
                                profilePhoto={profilePhoto}
                            />
                        </StyledProfileDiv>
                        <SubscriptionInfoSection>
                            <SubscriptionInfo />
                        </SubscriptionInfoSection>
                    </AccountManagementWrapper>
                </Container>
            </ProfilePageWrapper>
            <Footer />
        </>
    );
};

export default AccountManagement;
