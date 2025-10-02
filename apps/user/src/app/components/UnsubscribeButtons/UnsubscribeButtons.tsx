import translate from 'counterpart';
import React, { useState } from 'react';

import { ModalUnsubscribe } from '../ModalUnsubscribe/ModalUnsubscribe';
import { Button, ButtonUnsubscribe, Title, Wrapper } from './styles';

const UnsubscribeButtons = () => {
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <Wrapper>
            <Title>{translate('Are you sure you want to unsubscribe?')}</Title>
            <Button
                href='/user/'
                data-tm-type='event'
                data-tm-event-category='User-Unsubscribe'
                data-tm-event-action='button-no-cancel'
                data-qa='button-no-cancel'
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
