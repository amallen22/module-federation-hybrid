import { Link } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React from 'react';

import { setCategoryAttr } from '../../../../helpers/setCategoryAttr';
import { Routes } from '../../../../internals/router/Routes';

interface Props {
    type: string;
    token: string | null;
    disabled: boolean;
    text: string;
}

const RedirectToPreviewButton = ({ type, token, disabled, text }: Props) => {
    const onClickPreviewHandler = () => {
        window.open(`${Routes.share}/${token}`, '_blank');
    };

    return (
        <Link
            disabled={disabled}
            data-qa='share-preview'
            data-tm-event-category={setCategoryAttr()}
            data-tm-event-action='preview'
            data-tm-event-label={type}
            onClick={onClickPreviewHandler}
        >
            {translate(text || 'Preview online')}
        </Link>
    );
};

export { RedirectToPreviewButton };
