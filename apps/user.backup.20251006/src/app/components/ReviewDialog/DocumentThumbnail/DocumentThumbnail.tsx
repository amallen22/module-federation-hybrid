import translate from 'counterpart';
import React from 'react';

import { dateToUpdatedLocale } from '../../../helpers/dateFormatter';
import { getThumbnail } from '../../../helpers/getThumbnail';
import { Document, DocumentTypeEnum } from '../../../models/documents';
import { Card, DocumentDate, DocumentTitle, Footer, Select, Thumbnail } from './styles';

interface Props {
    document: Document;
    handleClick: () => void;
    userLanguage: string;
}

export const DocumentThumbnail = ({ document, handleClick, userLanguage }: Props) => {
    if (!document || !userLanguage) return <></>;

    return (
        <Card onClick={() => handleClick()} type='submit'>
            <Thumbnail
                src={getThumbnail({
                    documentType: DocumentTypeEnum.Resume,
                    previewThumbnail: document.previewThumbnail ? document.previewThumbnail : null,
                })}
            />
            <Select className='select'>{translate('Select')}</Select>
            <Footer>
                <DocumentTitle>{document.title ? document.title : translate('Document untitled')}</DocumentTitle>
                <DocumentDate>{dateToUpdatedLocale({ date: document.createdAt, userLanguage })}</DocumentDate>
            </Footer>
        </Card>
    );
};
