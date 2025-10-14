import { useEffect, useState } from 'react';

import { ApiError } from '../models/error';
import { apiService } from '../services/ApiService';
import { FrontLogService } from '../services/FrontLogService';

function useSubscription() {
    const [loadingSubscription, setLoadingSubscription] = useState(true);
    const [subscriptionId, setSubscriptionId] = useState<string | undefined>();
    const [productId, setProductId] = useState<string | undefined>();
    const [createdAt, setCreatedAt] = useState<string | undefined>();
    const [expirationDate, setExpirationDate] = useState<string | undefined>();
    const [isSubscribed, setIsSubscribed] = useState(false);

    const onPrefetchError = (err: Error) => {
        setLoadingSubscription(false);
        FrontLogService.logAjaxResponse({
            className: 'useSubscription',
            funcName: 'useEffect',
            err,
        });
    };

    useEffect(() => {
        apiService
        .getSubscription()
        .then(({ subscriptionId, productId, createdAt, expirationDate }) => {
            setSubscriptionId(subscriptionId);
            setProductId(productId);
            setCreatedAt(createdAt);
            setExpirationDate(expirationDate);
            setLoadingSubscription(false);
            setIsSubscribed(!!subscriptionId);
        })
        .catch(onPrefetchError);
    }, []);

    return {
        subscriptionId,
        productId,
        createdAt,
        expirationDate,
        loadingSubscription,
        isSubscribed,
    };
}

export default useSubscription;
