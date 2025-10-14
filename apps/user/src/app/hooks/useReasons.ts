import { useEffect, useState } from 'react';

import { Error } from '../models/error';
import { Reason } from '../models/reason';
import { apiService } from '../services/ApiService';
import { FrontLogService } from '../services/FrontLogService';

function useReasons(reasonId?: null | string) {
    const [loadingReasons, setLoadingReasons] = useState(true);
    const [reasons, setReasons] = useState<Reason[] | null>();

    const onPrefetchError = (err: Error) => {
        setLoadingReasons(false);
        FrontLogService.logAjaxResponse({
            className: 'useSubscription',
            funcName: 'useEffect',
            err,
        });
    };

    useEffect(() => {
        apiService
        .getUnsubscribeReasons()
        .then((res) => {
            setReasons(res);
            setLoadingReasons(false);
        })
        .catch(onPrefetchError);
    }, []);

    const selectedReason = reasons?.find((reason) => reason.id === reasonId);

    return {
        loadingReasons,
        reasons,
        selectedReason,
    };
}

export default useReasons;
