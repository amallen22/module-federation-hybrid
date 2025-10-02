import translate from 'counterpart';
import React, { useEffect, useState } from 'react';

import { getUserTypeText } from '../../helpers/getUserTypeText';
import useProfile from '../../hooks/useProfile';
import useSubscription from '../../hooks/useSubscription';
import { Debit } from '../../models/debits';
import { ApiError } from '../../models/error';
import { Amount, Product } from '../../models/products';
import { StyledProfileTitle } from '../../pages/AccountManagement/styles';
import { apiService } from '../../services/ApiService';
import { FrontLogService } from '../../services/FrontLogService';
import { SubscriptionInfoPanel } from '../SubscriptionInfoPanel/SubscriptionInfoPanel';
import { SubscriptionInfoPanelUpgrade } from '../SubscriptionInfoPanelUpgrade';
import { SubscriptionPaymentHistory } from '../SubscriptionPaymentHistory/SubscriptionPaymentHistory';
import { Loading } from './Loading';

function getPriceWithCurrency(amount: Amount) {
    if (amount.currencyPrefix) {
        return `${amount.currencyPrefix}${amount.display}`;
    }

    return `${amount.display}${amount.currencySuffix}`;
}

const initialState = {
    loading: false,
};

const SubscriptionInfo = () => {
    const [loading, setLoading] = useState(initialState.loading);
    const [products, setProducts] = useState<Product[]>([]);
    const [userProduct, setUserProduct] = useState<Product>();
    const [debits, setDebits] = useState<Debit[]>([]);

    const {
        subscriptionId,
        productId,
        createdAt: subscriptionDate,
        expirationDate,
        isSubscribed,
        loadingSubscription,
    } = useSubscription();

    const {
        groupPermission,
        userLanguage,
        createdAt: userRegistrationDate,
        pricingModel,
        loadingProfile,
    } = useProfile();

    const translatedUserType = getUserTypeText(groupPermission);
    const subscriptionInfo = {
        subscriptionDate,
        isSubscribed,
        translatedUserType,
        userRegistrationDate,
        pricingModel,
    };

    const getDebits = () => {
        if (!subscriptionId) {
            return;
        }

        const params = {
            subscriptionId,
            // If we specify this, the first debit in the array it's the first payment
            withFirstPayment: true,
            // We want to show 2 last debits, but we also need to retrieve the first payment
            // In case there is only 1 payment made, so we show the first debit then
            limit: 3,
            descendingOrder: true,
            status: expirationDate ? 'accepted' : 'accepted,pending',
        };

        return apiService.getDebits(params).then(({ debits }) => {
            const _debits = (debits && [...debits]) || [];
            if (_debits.length >= 3) {
                // If it's 3 or more debits, we reverse the array, to put the first payment last
                _debits.reverse();
            }
            const [debit1, debit2] = _debits;
            setDebits([debit1, debit2].filter(Boolean));
        });
    };

    const getProducts = () => {
        if (isSubscribed && productId && subscriptionDate) {
            return apiService.getProductById(productId).then((product) => {
                setUserProduct(product[0]);
            });
        }
        const params = debits.length ? { currency: debits[0].currency } : {};

        return apiService.getProductList(params).then((products) => {
            setProducts(products);
        });
    };

    useEffect(() => {
        if (!loadingSubscription && !loadingProfile) {
            Promise.all([getDebits(), getProducts()])
            .then(() => {
                setLoading(false);
            })
            .catch((err: ApiError) => {
                setLoading(false);
                FrontLogService.logAjaxResponse({
                    className: 'SubscriptionManagement',
                    funcName: 'useEffect',
                    err,
                });
            });
        }
    }, [loadingSubscription, loadingProfile, subscriptionId, productId, isSubscribed]);

    const RenderSubSection = () => {
        const subscribedUser =
            pricingModel === 'subscription' &&
            (groupPermission === 'premium' || groupPermission === 'limited') &&
            isSubscribed &&
            debits.length > 0;
        const freemium = (groupPermission === 'premium' || groupPermission === 'limited') && !debits.length;

        if (freemium) {
            return null;
        }

        if (subscribedUser) {
            return (
                <SubscriptionPaymentHistory
                    debits={debits}
                    subscriptionPlan={(userProduct && userProduct.detail) || ''}
                    userLanguage={userLanguage}
                    subscribedUser={subscribedUser}
                />
            );
        }

        let startingPrice;
        if (products.length) {
            const amount = products[0].price.amount[Object.keys(products[0].price.amount)[0]];
            startingPrice = getPriceWithCurrency(amount);
        }

        return <SubscriptionInfoPanelUpgrade startingPrice={startingPrice} />;
    };

    const isLoading = loading || loadingSubscription || loadingProfile;
    if ((isLoading && !isSubscribed) || (isSubscribed && !userProduct)) {
        return <Loading />;
    }

    return (
        <React.Fragment>
            <StyledProfileTitle data-qa='account-tab'>{translate('Membership')}</StyledProfileTitle>
            <SubscriptionInfoPanel
                product={userProduct}
                subscriptionInfo={subscriptionInfo}
                userLanguage={userLanguage}
                subscribedUser={
                    !!(
                        pricingModel === 'subscription' &&
                        groupPermission === 'premium' &&
                        isSubscribed &&
                        debits.length > 0
                    )
                }
            />
            <RenderSubSection />
        </React.Fragment>
    );
};

export { SubscriptionInfo };
