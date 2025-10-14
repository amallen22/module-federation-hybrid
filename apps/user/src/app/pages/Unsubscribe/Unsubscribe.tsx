import { InitialLoading } from '@npm_leadtech/cv-lib-app-components';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Unsubscribe from '../../components/Unsubscribe/Unsubscribe';
import { UnsubscribeOffers } from '../../components/UnsubscribeOffers/UnsubscribeOffers';
import useReasons from '../../hooks/useReasons';
import useSubscription from '../../hooks/useSubscription';
import { Product, RelatedProductsParams } from '../../models/products';
import { apiService } from '../../services/ApiService';

const UnsubscribePage = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const reasonId = urlParams.get('reasonId');

    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState<undefined | Product[]>();
    const [currency, setCurrency] = useState('');

    const { subscriptionId, productId } = useSubscription();
    const { selectedReason, loadingReasons } = useReasons(reasonId);

    const debitsParams = {
        subscriptionId,
        withFirstPayment: true,
        limit: 1,
        descendingOrder: true,
        status: 'accepted,pending',
    };

    useEffect(() => {
        if (subscriptionId && productId && selectedReason) {
            apiService.getDebits(debitsParams).then(({ debits }) => {
                setCurrency(debits[0].currency);
                const paymentVendor = debits[0].providerType;
                const params: RelatedProductsParams = {
                    productId,
                    currency: debits[0].currency,
                    tags: selectedReason.target.config.productTag,
                };
                if (paymentVendor) {
                    params.paymentVendor = paymentVendor;
                }

                fetchRelatedProducts(params);
            });
        }
    }, [subscriptionId, productId, selectedReason]);

    function fetchRelatedProducts(params: RelatedProductsParams) {
        apiService
        .getRelatedProducts(params)
        .then(({ result }) => {
            setRelatedProducts(result);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
        });
    }

    if (loading || loadingReasons) {
        return (
            <div className='cv-initial-loading' data-qa='user-loader'>
                <InitialLoading />
            </div>
        );
    }

    if (relatedProducts && relatedProducts.length > 0) {
        return (
            <UnsubscribeOffers
                relatedProducts={relatedProducts}
                currency={currency}
                subscriptionId={subscriptionId}
                reason={selectedReason}
            />
        );
    }

    return <Unsubscribe subscriptionId={subscriptionId} />;
};

export default UnsubscribePage;
