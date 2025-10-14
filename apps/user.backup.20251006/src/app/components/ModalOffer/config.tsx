import { Spinner } from '@npm_leadtech/cv-lib-app-components';
import React from 'react';
import Lottie from 'react-lottie';

import errorIcon from './animations/error-icon.json';
import successIcon from './animations/success-icon.json';
import ConfirmationIcon from './img/confirmation-icon.svg';
import ErrorImage from './img/error-content-image.svg';
import Present from './img/present.svg';
import Success from './img/success-content-image.svg';
import { ContentImage, modalImageStyles } from './styles';

const successOptions = {
    loop: false,
    autoplay: true,
    animationData: JSON.parse(successIcon),
};

const errorOptions = {
    loop: false,
    autoplay: true,
    animationData: JSON.parse(errorIcon),
};

export const modalConfig = {
    confirmation: {
        headerImage: <img style={modalImageStyles} src={ConfirmationIcon} />,
        dataQaTitle: 'confirmationTitle',
        contentImage: <ContentImage width='120' height='126' src={Present} />,
        isFixed: false,
        closeIcon: true,
    },
    loading: {
        headerImage: <Spinner color='blue' />,
        title: 'We are applying your offer…',
        dataQaTitle: 'loadingTitle',
        contentImage: <ContentImage src={Present} />,
        isFixed: true,
        closeIcon: false,
    },
    success: {
        headerImage: <Lottie options={successOptions} width='30' height='30' />,
        title: 'Thanks for your purchase!',
        dataQaTitle: 'successTitle',
        subtitle: 'We’ve sent you an email as confirmation.',
        contentImage: <ContentImage width='151' height='126' src={Success} />,
        isFixed: true,
        closeIcon: false,
    },
    error: {
        headerImage: <Lottie options={errorOptions} width='30' height='30' />,
        title: 'Something went wrong',
        dataQaTitle: 'errorTitle',
        contentImage: <ContentImage width='151' height='126' src={ErrorImage} />,
        isFixed: false,
        closeIcon: true,
    },
};
