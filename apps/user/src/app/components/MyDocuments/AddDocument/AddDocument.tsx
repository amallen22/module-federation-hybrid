import AddIcon from '@mui/icons-material/Add';
import { Spinner } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useState } from 'react';

import { setCategoryAttr } from '../../../helpers/setCategoryAttr';
import useManageDocument from '../../../hooks/useManageDocument';
import { DocumentType, DocumentTypeEnum } from '../../../models/documents';
import { AddButton, AddNewDocument, SpinnerContainer } from './styles';

interface Props {
    documentType: DocumentType;
    groupPermission: string | null;
    loadingDocuments: boolean;
    createdDocuments: number;
}

const AddDocument = ({ documentType, groupPermission, loadingDocuments }: Props) => {
    const [loading, setLoading] = useState(false);
    const { createDocument } = useManageDocument({ groupPermission });

    const type = documentType === DocumentTypeEnum.CoverLetter ? 'cover letter' : 'resume';

    const createNewDocumentHandler = () => {
        setLoading(true);
        createDocument({ documentType });
    };

    const goToCreateNewDocument = () => {
        if (loadingDocuments) {
            return;
        }

        createNewDocumentHandler();
    };

    return (
        <AddNewDocument
            onClick={goToCreateNewDocument}
            data-tm-event-category={setCategoryAttr()}
            data-tm-event-action='Create new'
            data-tm-event-label={documentType}
            data-qa={`create-new-${documentType}`}
        >
            {loading ? (
                <SpinnerContainer data-qa={`create-new-${documentType}-loader`}>
                    <Spinner color='blue' />
                </SpinnerContainer>
            ) : (
                <>
                    <AddButton>
                        <AddIcon />
                    </AddButton>
                    {translate(`new ${type}`)}
                </>
            )}
        </AddNewDocument>
    );
};

export { AddDocument };
