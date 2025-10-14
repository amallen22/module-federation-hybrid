import { AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics';
import { useMobile } from '@npm_leadtech/cv-lib-app-components';
import { CurrencyDescriptor } from '@npm_leadtech/cv-lib-app-config';
import { ProductCard } from '@npm_leadtech/cv-ui-kit';
import translate from 'counterpart';
import React, { useState } from 'react';

import { APP_CONFIG } from '../../config/appConfig';
import { Product } from '../../models/products';
import ModalOffer from '../ModalOffer/ModalOffer';
import { CardsContainer, CardWrapper, Disclaimer } from './styles';

interface Props {
    relatedProducts: Product[];
    currency: string;
    subscriptionId?: string;
}

interface ProductInfo {
    image: string;
    text: string;
    buttonText: string;
    title: string;
    modalText: string;
    dataQa: string;
    dataTmEvent: string;
    type: string;
    informalTitle: string;
    informalSubtitle: string;
    usePriceInTitles: boolean;
    price: string;
    popular: boolean;
}

const domain = APP_CONFIG.domain;
const basePath = `https://static.${domain}`;
const getAssetPathFromS3 = (filename: string) => `${basePath}/assets/common/unsubscribe/${filename}`;

const OffersCards = ({ relatedProducts, currency, subscriptionId }: Props) => {
    const { isMobile } = useMobile();

    const [modalOpened, setModalOpened] = useState(false);
    const [titleModal, setTitle] = useState('');
    const [modalText, setModalText] = useState('');
    const [modalOfferText, setModalOfferText] = useState('');
    const [productId, setProductId] = useState('');
    const [productType, setProductType] = useState('');

    function getProductInfo(price: string, product: Product): ProductInfo {
        switch (product.category) {
            case 'Extra Days': {
                return {
                    image: getAssetPathFromS3('trial-plan.png'),
                    text: translate('Keep your trial rolling for another month of unlimited access completely free*.'),
                    buttonText: translate('Get another 30 days free'),
                    title: translate('Extend your Premium unlimited access!'),
                    modalText: translate('30 extra days unlimited access free'),
                    dataQa: 'product-extra-days',
                    dataTmEvent: 'replan-30-days-free',
                    type: 'bonus',
                    informalTitle: product.properties.informalTitle,
                    informalSubtitle: product.properties.informalSubtitle || '',
                    usePriceInTitles: product.properties.usePriceInTitles,
                    price,
                    popular: product.popular,
                };
            }
            case 'Monthly discount': {
                return {
                    image: getAssetPathFromS3('monthly-plan.png'),
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
                    informalTitle: product.properties.informalTitle,
                    informalSubtitle: product.properties.informalSubtitle || '',
                    usePriceInTitles: product.properties.usePriceInTitles,
                    price,
                    popular: product.popular,
                };
            }
            default: {
                return {
                    image: getAssetPathFromS3('year-plan.png'),
                    text: translate(
                        'Save up to 90%% with a one-off fee of %(price)s for 1 year’s unlimited access to all our resume tools.',
                        { price },
                    ),
                    buttonText: translate('Select our %(price)s a year offer', { price }),
                    title: translate('Pay for a month, get 11 for free!'),
                    modalText: translate('1 year’s unlimited access for the price of a month'),
                    dataQa: 'product-yearly',
                    dataTmEvent: 'replan-yearly',
                    type: 'annual',
                    informalTitle: product.properties.informalTitle,
                    informalSubtitle: product.properties.informalSubtitle || '',
                    usePriceInTitles: product.properties.usePriceInTitles,
                    price,
                    popular: product.popular,
                };
            }
        }
    }

    const renderRelatedProducts = () => {
        let sortedProducts = relatedProducts;

        if (isMobile) {
            sortedProducts = [...relatedProducts].sort(
                (a, b) => Number(b.popular) - Number(a.popular)
            );
        }

        return sortedProducts.map((product: Product) => {
            const {
                category,
                productId,
                popular,
                price: {
                    amount: {
                        [currency]: { currencyPrefix, currencySuffix, recurrent },
                    },
                },
            } = product;

            const price = currencyPrefix + CurrencyDescriptor.toString(currency, recurrent) + currencySuffix;
            const productInfo = getProductInfo(price, product);
            return (
                <CardWrapper key={productId}>
                    <ProductCard
                        data-qa={productInfo.dataQa}
                        size={'M'}
                        title={`${productInfo.informalTitle}\n${productInfo.informalSubtitle} ${
                            productInfo.usePriceInTitles ? price : ''
                        }`}
                        subtitle={productInfo.text}
                        image={<img src={productInfo.image} />}
                        tag={
                            popular
                                ? {
                                    text: translate('MOST POPULAR'),
                                    dataQa: 'most-popular-chip',
                                }
                                : undefined
                        }
                        button={{
                            text: productInfo.buttonText,
                            variant: popular ? 'primary' : 'secondary',
                            tmEvent: {
                                category: 'User-Unsubscribe',
                                action: productInfo.dataTmEvent,
                            },
                        }}
                        selected={popular}
                        isFullWidth={true}
                        onClick={() => {
                            setModalText(productInfo.text);
                            setTitle(productInfo.title);
                            setModalOfferText(productInfo.modalText);
                            setProductId(productId);
                            setModalOpened(true);
                            setProductType(productInfo.type);
                        }}
                    />
                    {category === 'Extra Days' ? (
                        <Disclaimer data-qa='renew-text'>
                            {translate('* (This will renew at a monthly cost of %(price)s after 30 days)', {
                                price,
                            })}
                        </Disclaimer>
                    ) : null}
                </CardWrapper>
            );
        });
    };

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
