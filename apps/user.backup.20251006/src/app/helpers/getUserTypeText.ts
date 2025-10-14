import translate from 'counterpart';

export const getUserTypeText = (userType: string | null) => {
    switch (userType) {
        case 'free':
            return translate('Free User');
        case 'limited':
            return translate('Unlimited User');
        case 'premium':
            return translate('Unlimited User');
        default:
            return userType;
    }
};
