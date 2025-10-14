import { Toast } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useState } from 'react';

import { Text, ToastContainer } from './styles';

export const PreviewSnackbar = () => {
    const showSnackbar = sessionStorage.getItem('previewSnackbar');
    const [isOpen, setIsOpen] = useState(showSnackbar === 'true' || showSnackbar === null);

    const onCloseHandler = () => {
        sessionStorage.setItem('previewSnackbar', 'false');
        setIsOpen(false);
    };
    
    return (
        isOpen && (
            <ToastContainer data-qa='preview-snackbar'>
                <Toast type='toast-info' onCloseHandler={() => onCloseHandler()} dataQa='preview-snackbar'>
                    <Text>
                        {translate(
                            "Looks like you've been away for a bit, so your documents are temporarily inactive. To bring back a document, open and edit it as usual.",
                        )}
                    </Text>
                </Toast>
            </ToastContainer>
        )
    );
};
