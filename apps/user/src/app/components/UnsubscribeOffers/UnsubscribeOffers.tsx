import { useMobile } from '@npm_leadtech/cv-lib-app-components';
import { Icon, IconName, ProductCard, Tag } from '@npm_leadtech/cv-ui-kit';
import translate from 'counterpart';
import React from 'react';

import { APP_CONFIG } from '../../config/appConfig';
import { Product } from '../../models/products';
import { Reason } from '../../models/reason';
import { Footer } from '../Footer/Footer';
import { OffersCards } from '../OffersCards/OffersCards';
import { UnsubscribeButtons } from '../UnsubscribeButtons/UnsubscribeButtons';
import {
    HeadlineGridArea,
    HelpCardGridArea,
    OffersCardsGridArea,
    PageContainer,
    PageWrapper,
    Subtitle,
    Title,
    UnsubscribeButtonsGridArea,
} from './styles';

const { contactMail, contactInfo } = APP_CONFIG;

interface Props {
    relatedProducts: Product[];
    currency: string;
    subscriptionId?: string;
    reason?: Reason;
}

const UnsubscribeOffers = ({ relatedProducts, currency, subscriptionId, reason }: Props) => {
    const { isMobile } = useMobile();
    const header = reason?.target?.config?.header ?? '';
    const text = reason?.target?.config?.text ?? '';

    return (
        <PageWrapper>
            <PageContainer>
                <HeadlineGridArea>
                    <Title data-qa='before-you-go'>{header}</Title>
                    <Subtitle>{text}</Subtitle>
                    <Tag variant='info' mode={'warning'} shape={'outlined'} data-qa='limited-time-only'>
                        {translate('Available for a limited time only').toUpperCase()}
                    </Tag>
                </HeadlineGridArea>

                <HelpCardGridArea>
                    <ProductCard
                        data-qa={'need-any-help'}
                        size={'XS'}
                        isFullWidth={isMobile}
                        icon={<Icon name={IconName.Speak} />}
                        title={translate('Need any help?')}
                        subtitle={
                            <>
                                {translate(contactInfo)} {translate('or send an e-mail to')}{' '}
                                <a href={`mailto:${contactMail}`}>{contactMail}</a>
                            </>
                        }
                        onClick={() => { window.location.href = `mailto:${contactMail}`; }}
                    />
                </HelpCardGridArea>

                <OffersCardsGridArea>
                    <OffersCards
                        relatedProducts={relatedProducts}
                        currency={currency}
                        subscriptionId={subscriptionId}
                    />
                </OffersCardsGridArea>

                <UnsubscribeButtonsGridArea>
                    <UnsubscribeButtons />
                </UnsubscribeButtonsGridArea>
            </PageContainer>
            <Footer />
        </PageWrapper>
    );
};

export { UnsubscribeOffers };
