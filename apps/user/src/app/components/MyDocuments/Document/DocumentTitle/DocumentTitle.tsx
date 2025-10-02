import { EditableLabel } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React from 'react';

import { DocumentTypeEnum } from '../../../../models/documents';
import { apiService } from '../../../../services/ApiService';

interface Props {
    initialValue: string;
    value: string;
    type: string;
    documentId: string;
    setDocumentTitle: (_state: string) => void;
}

export const DocumentTitle = ({ type, initialValue, value, documentId, setDocumentTitle }: Props) => {
    const handleOnChange = (newValue: string) => {
        setDocumentTitle(newValue);
    };

    const handleOnTitleBlur = () => {
        apiService.putDocumentTitle({ documentId, title: value });
    };

    return (
        <EditableLabel
            placeholder={translate('Document untitled')}
            tooltipText={translate(`Rename ${type === DocumentTypeEnum.Resume ? 'your resume' : 'your cover letter'}`)}
            initialValue={initialValue}
            maxCharacters={20}
            onChange={handleOnChange}
            onBlur={handleOnTitleBlur}
        />
    );
};
