import translate from 'counterpart';
import React from 'react';

import { Product } from '../../models/products';
import { Reason } from '../../models/reason';
import { Footer } from '../Footer/Footer';
import { HelpCard } from '../HelpCard/HelpCard';
import { OffersCards } from '../OffersCards/OffersCards';
import { UnsubscribeButtons } from '../UnsubscribeButtons/UnsubscribeButtons';
import {
    FlexContainer,
    HeaderContainer,
    HeaderLabel,
    Headline,
    PageContainer,
    PageWrapper,
    Subtitle,
    Title,
} from './styles';

interface Props {
    relatedProducts: Product[];
    currency: string;
    subscriptionId?: string;
    reason?: Reason;
}

const UnsubscribeOffers = ({ relatedProducts, currency, subscriptionId, reason }: Props) => {
    const {
        // @ts-ignore
        target: {
            config: { header, text },
        },
    } = reason;

    return (
        <PageWrapper>
            <PageContainer>
                <HeaderContainer>
                    <Headline>
                        <Title data-qa='before-you-go'>{header}</Title>
                        <Subtitle>{text}</Subtitle>
                        <HeaderLabel data-qa='limited-time-only'>
                            {translate('Available for a limited time only')}
                        </HeaderLabel>
                    </Headline>
                    <HelpCard />
                </HeaderContainer>
                <OffersCards relatedProducts={relatedProducts} currency={currency} subscriptionId={subscriptionId} />
                <FlexContainer>
                    <UnsubscribeButtons />
                </FlexContainer>
            </PageContainer>
            <Footer />
        </PageWrapper>
    );
};

export { UnsubscribeOffers };
