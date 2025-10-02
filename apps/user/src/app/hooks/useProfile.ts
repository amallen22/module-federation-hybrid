import { useEffect, useState } from 'react';

import { ApiError } from '../models/error';
import { isDevelopment, mockDelay, mockProfileData } from '../mocks/mockData';
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
        // En desarrollo local, usar datos mock para evitar errores de CORS
        if (isDevelopment) {
            console.log('🔧 [DEV MODE] Using mock profile data');
            mockDelay(300).then(() => {
                const { groupPermission, email, userLanguage, createdAt, pricingModel, firstName, lastName, photo } = mockProfileData;
                setGroupPermission(groupPermission);
                setEmail(email);
                setUserLanguage(userLanguage);
                setCreatedAt(createdAt);
                setPricingModel(pricingModel);
                setFirstName(firstName);
                setLastName(lastName);
                setProfilePhoto(photo);
                setLoadingProfile(false);
            });
            return;
        }

        // En producción, usar la API real
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
        .catch(e => {
            console.error('Error fetching profile data', e);
            onPrefetchError(e);
        });
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
