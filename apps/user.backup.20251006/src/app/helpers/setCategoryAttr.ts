import { Routes } from '../internals/router/Routes';

export const setCategoryAttr = () => {
    if (location.href.includes(Routes.resumes)) {
        return 'Resume list';
    }
    if (location.href.includes(Routes.covers)) {
        return 'Cover letter list';
    }
    if (location.href.includes(Routes.profile)) {
        return 'Profile';
    }
    if (location.href.includes(Routes.unsubscribe)) {
        return 'Unsubscribe';
    }
    if (location.href.includes(Routes.documents)) {
        return 'Documents';
    }
    return 'Dashboard';
};
