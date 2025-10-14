import React, { Component } from 'react';

import { Routes } from '../internals/router/Routes';

export const withGtmCategory = (WrappedComponent) => {
    return class extends Component {
        render() {
            return <WrappedComponent data-tm-event-category={setCategoryAttr()} {...this.props} />;
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
