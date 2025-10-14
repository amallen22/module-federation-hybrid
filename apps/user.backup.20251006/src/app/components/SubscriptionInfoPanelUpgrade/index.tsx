import translate from 'counterpart';
import React from 'react';

import { Routes } from '../../internals/router';
import { SectionSubtitle, StartNowBtn } from '../../pages/AccountManagement/styles';
import { config } from './config';
import { Loading } from './Loading';
import { HeaderButtonWrapper, HeaderWrapper, ListOfFeatures, StartingFrom, UnlockTitle, Wrapper } from './styles';

interface Props {
    startingPrice: string | undefined;
}

const SubscriptionInfoPanelUpgrade = ({ startingPrice }: Props) => {
    if (!startingPrice) {
        return <Loading />;
    }

    return (
        <Wrapper>
            <HeaderWrapper>
                <div>
                    <SectionSubtitle>{translate('PREMIUM ACCOUNT')}</SectionSubtitle>
                    <UnlockTitle>{translate('Unlock our premium features')}</UnlockTitle>
                </div>
                <HeaderButtonWrapper>
                    <StartNowBtn data-qa={'subscribe-actionbutton'} href={Routes.product}>
                        {translate('UPGRADE NOW')}
                    </StartNowBtn>
                    <StartingFrom>
                        {translate('Starting from')}: {startingPrice}
                    </StartingFrom>
                </HeaderButtonWrapper>
            </HeaderWrapper>

            <ListOfFeatures>
                {config.map((element) => (
                    <li key={Math.random()}>
                        <img src={element.icon} />
                        {translate(element.text)}
                    </li>
                ))}
            </ListOfFeatures>
        </Wrapper>
    );
};

export { SubscriptionInfoPanelUpgrade };
