import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import translate from 'counterpart';
import React from 'react';

import { dateStringComposer } from '../../helpers/dateFormatter';
import { Routes } from '../../internals/router';
import { Product } from '../../models/products';
import { UpgradeBtn } from '../../pages/AccountManagement/styles';
import medal from './images/group-5.png';
import {
    ImageWrapper,
    InfoWrapper,
    StyledCurrentPlanLabel,
    StyledCurrentPlanName,
    StyledDiv,
    StyledRow,
    StyledSpan,
    StyledWrapperContainer,
    StyledWrapperDiv,
} from './styles';

interface Props {
    product?: Product;
    subscriptionInfo: {
        subscriptionDate?: string;
        isSubscribed: boolean;
        translatedUserType: string | null;
        userRegistrationDate: string;
        pricingModel: string;
    };
    userLanguage: string;
    subscribedUser: boolean;
}

export const SubscriptionInfoPanel = ({
    product,
    userLanguage,
    subscriptionInfo: { subscriptionDate, isSubscribed, translatedUserType, userRegistrationDate, pricingModel },
    subscribedUser,
}: Props) => {
    const userDate = new Date(userRegistrationDate);
    const subsDate = new Date(subscriptionDate || '');

    const renderAction = () => {
        if (isSubscribed || pricingModel === 'free') {
            return <div></div>;
        }

        return (
            <UpgradeBtn data-qa={'subscribe-actionbutton'} href={Routes.product}>
                {translate('Upgrade')}
            </UpgradeBtn>
        );
    };

    return (
        <StyledWrapperContainer>
            <StyledRow>
                <div>
                    <StyledCurrentPlanLabel data-qa={'current-plan-label'}>
                        {translate('Current Plan')}
                    </StyledCurrentPlanLabel>
                    <StyledCurrentPlanName data-qa='current-plan-name'>
                        {(product && product.detail) || translate('Free User')}
                    </StyledCurrentPlanName>
                    {renderAction()}
                </div>
                <InfoWrapper>
                    <StyledDiv>
                        <TodayOutlinedIcon />
                        <StyledWrapperDiv data-qa={'user-register-date'}>
                            <StyledSpan>{translate('Registered')}</StyledSpan>
                            <StyledSpan>
                                {dateStringComposer({
                                    date: userDate,
                                    userLanguage,
                                })}
                            </StyledSpan>
                        </StyledWrapperDiv>
                    </StyledDiv>
                    {isSubscribed && (
                        <StyledDiv data-section={'user-subscribed-date'}>
                            <TodayOutlinedIcon />
                            <StyledWrapperDiv data-qa={'user-subscribed-date'}>
                                <StyledSpan>{translate('Subscribed')}</StyledSpan>
                                <StyledSpan>
                                    {dateStringComposer({
                                        date: subsDate,
                                        userLanguage,
                                    })}
                                </StyledSpan>
                            </StyledWrapperDiv>
                        </StyledDiv>
                    )}
                    <StyledDiv data-qa={'user-type-role'}>
                        <PersonOutlineOutlinedIcon />
                        {translatedUserType}
                    </StyledDiv>
                </InfoWrapper>
                {subscribedUser && (
                    <ImageWrapper>
                        <img src={medal} alt='medal' />
                    </ImageWrapper>
                )}
            </StyledRow>
        </StyledWrapperContainer>
    );
};
