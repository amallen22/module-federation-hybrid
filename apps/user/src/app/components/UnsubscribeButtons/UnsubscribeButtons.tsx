import { Button } from '@npm_leadtech/cv-ui-kit';
import translate from 'counterpart';
import React, { useState } from 'react';

import { Routes } from '../../internals/router/Routes';
import { ModalUnsubscribe } from '../ModalUnsubscribe/ModalUnsubscribe';
import { ButtonUnsubscribe, Title, Wrapper } from './styles';

const UnsubscribeButtons = () => {
    const [modalOpened, setModalOpened] = useState(false);
    
    const goToUser = () => {
        window.location.href = Routes.dashboard;
    };

    return (
        <Wrapper>
            <Title className='cv-unsubscribe-button__title'>{translate('Are you sure you want to unsubscribe?')}</Title>
            <Button
                isFullWidth={true}
                variant={'secondary'}
                size={'M'}
                shape={'rounded'}
                data-tm-type='event'
                data-tm-event-category='User-Unsubscribe'
                data-tm-event-action='button-no-cancel'
                data-qa='button-no-cancel'
                onClick={goToUser}
            >
                {translate('No, don’t cancel it!')}
            </Button>
            <ButtonUnsubscribe
                data-tm-type='event'
                data-tm-event-category='User-Unsubscribe'
                data-tm-event-action='button-unsubscribe'
                onClick={() => setModalOpened(true)}
                data-qa='button-unsubscribe'
            >
                {translate('Yes, cancel my subscription')}
            </ButtonUnsubscribe>
            <ModalUnsubscribe modalOpened={modalOpened} setModalOpened={setModalOpened} />
        </Wrapper>
    );
};

export { UnsubscribeButtons };
