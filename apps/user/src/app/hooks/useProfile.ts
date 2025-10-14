import { useEffect, useState } from 'react';

import { Error } from '../models/error';
import { apiService } from '../services/ApiService';
import { FrontLogService } from '../services/FrontLogService';

function useProfile() {
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [groupPermission, setGroupPermission] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState<string | undefined>('');
    const [lastName, setLastName] = useState<string | undefined>('');
    const [profilePhoto, setProfilePhoto] = useState<string | undefined>('');
    const [userLanguage, setUserLanguage] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [pricingModel, setPricingModel] = useState('');

    const onPrefetchError = (err: Error) => {
        setLoadingProfile(false);
        FrontLogService.logAjaxResponse({
            className: 'useProfile',
            funcName: 'useEffect',
            err,
        });
    };

    useEffect(() => {
        apiService
        .getProfile()
        .then(({ groupPermission, email, userLanguage, createdAt, pricingModel, firstName, lastName, photo }) => {
            setGroupPermission(groupPermission);
            setEmail(email);
            setUserLanguage(userLanguage);
            setCreatedAt(createdAt);
            setPricingModel(pricingModel);
            setFirstName(firstName);
            setLastName(lastName);
            setProfilePhoto(photo);
            setLoadingProfile(false);
        })
        .catch(onPrefetchError);
    }, []);

    return {
        loadingProfile,
        groupPermission,
        email,
        userLanguage,
        createdAt,
        pricingModel,
        firstName,
        lastName,
        profilePhoto,
    };
}

export default useProfile;
