import { AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics';
import translate from 'counterpart';
import React, { useState } from 'react';

import { Product } from '../../models/products';
import ModalOffer from '../ModalOffer/ModalOffer';
import IconBadge from './icons/icon-badge.svg';
import IconCalendar from './icons/icon-calendar.svg';
import IconTick from './icons/icon-tick.svg';
import {
    Card,
    CardButton,
    CardIcon,
    CardPopular,
    CardsContainer,
    CardText,
    CardTitle,
    CardWrapper,
    Disclaimer,
} from './styles';

interface Props {
    relatedProducts: Product[];
    currency: string;
    subscriptionId?: string;
}

const OffersCards = ({ relatedProducts, currency, subscriptionId }: Props) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [titleModal, setTitle] = useState('');
    const [modalText, setModalText] = useState('');
    const [modalOfferText, setModalOfferText] = useState('');
    const [productId, setProductId] = useState('');
    const [productType, setProductType] = useState('');

    const renderRelatedProducts = () =>
        relatedProducts.map((product: Product) => {
            const {
                category,
                productId,
                popular,
                price: {
                    amount: {
                        [currency]: { currencyPrefix, currencySuffix, recurrent },
                    },
                },
                properties: { informalTitle, informalSubtitle, usePriceInTitles },
            } = product;

            const price = currencyPrefix + recurrent + currencySuffix;

            let productInfo = {
                icon: '',
                text: '',
                buttonText: '',
                title: '',
                modalText: '',
                dataQa: '',
                dataTmEvent: '',
                type: '',
            };

            switch (category) {
                case 'Extra Days':
                    productInfo = {
                        icon: IconTick,
                        text: translate(
                            'Keep your trial rolling for another month of unlimited access completely free*.',
                        ),
                        buttonText: translate('Get another 30 days free'),
                        title: translate('Extend your Premium unlimited access!'),
                        modalText: translate('30 extra days unlimited access free'),
                        dataQa: 'product-extra-days',
                        dataTmEvent: 'replan-30-days-free',
                        type: 'bonus',
                    };
                    break;
                case 'Monthly discount':
                    productInfo = {
                        icon: IconBadge,
                        text: translate(
                            'Keep unlimited access to our resume builder until you find your ideal job for just %(offerPrice)s a month.',
                            { offerPrice: price },
                        ),
                        buttonText: translate('Select our %(offerPrice)s a month offer', { offerPrice: price }),
                        title: translate('Get your 90%% discount!'),
                        modalText: translate('Unlimited access for %(offerPrice)s per month', { offerPrice: price }),
                        dataQa: 'product-monthly',
                        dataTmEvent: 'replan-monthly',
                        type: 'month',
                    };
                    break;
                case 'Yearly Discount':
                    productInfo = {
                        icon: IconCalendar,
                        text: translate(
                            'Save up to 90%% with a one-off fee of %(price)s for 1 year’s unlimited access to all our resume tools.',
                            { price: price },
                        ),
                        buttonText: translate('Select our %(price)s a year offer', { price: price }),
                        title: translate('Pay for a month, get 11 for free!'),
                        modalText: translate('1 year’s unlimited access for the price of a month'),
                        dataQa: 'product-yearly',
                        dataTmEvent: 'replan-yearly',
                        type: 'annual',
                    };
                    break;
            }

            return (
                <CardWrapper key={productId}>
                    <Card popular={popular}>
                        {popular ? (
                            <CardPopular data-qa='most-popular-chip'>{translate('MOST POPULAR')}</CardPopular>
                        ) : null}
                        <CardIcon src={productInfo.icon} />
                        <CardTitle data-qa={`${productInfo.dataQa}-title`}>
                            {informalTitle}{' '}
                            <span>
                                {informalSubtitle} {usePriceInTitles ? price : null}
                            </span>
                        </CardTitle>
                        <CardText data-qa={`${productInfo.dataQa}-text`}>{productInfo.text}</CardText>
                        <CardButton
                            data-tm-type='event'
                            data-tm-event-category='User-Unsubscribe'
                            data-tm-event-action={productInfo.dataTmEvent}
                            onClick={() => {
                                setModalText(productInfo.text);
                                setTitle(productInfo.title);
                                setModalOfferText(productInfo.modalText);
                                setProductId(productId);
                                setModalOpened(true);
                                setProductType(productInfo.type);
                            }}
                            data-qa={productInfo.dataQa}
                            popular={popular}
                        >
                            {productInfo.buttonText}
                        </CardButton>
                    </Card>
                    {category === 'Extra Days' ? (
                        <Disclaimer data-qa='renew-text'>
                            {translate('* (This will renew at a monthly cost of %(price)s after 30 days)', {
                                price: price,
                            })}
                        </Disclaimer>
                    ) : null}
                </CardWrapper>
            );
        });

    return (
        <>
            <AnalyticsLocationChange analyticsViewEvent='view_offers' />
            <CardsContainer>{renderRelatedProducts()}</CardsContainer>
            <ModalOffer
                modalHandler={setModalOpened}
                modalOpened={modalOpened}
                modalTitle={titleModal}
                modalText={modalText}
                modalOfferText={modalOfferText}
                subscriptionId={subscriptionId}
                productId={productId}
                productType={productType}
            />
        </>
    );
};

export { OffersCards };
