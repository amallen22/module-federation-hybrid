import React, { Component } from 'react';

import { Routes } from '../internals/router/Routes';

export const withGtmCategory = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return class extends Component<P> {
        render() {
            return <WrappedComponent data-tm-event-category={setCategoryAttr()} {...this.props as P} />;
        }
    };
};

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
    if (location.href.includes(Routes.subscription)) {
        return 'Subscription';
    }
    if (location.href.includes(Routes.unsubscribe)) {
        return 'Unsubscribe';
    }
    if (location.href.includes(Routes.documents)) {
        return 'Documents';
    }
    return 'Dashboard';
};
