import React, { Fragment } from 'react';

import { Document, DocumentType } from '../../../models/documents';
import { Language } from '../../../models/language';
import { AddDocument } from '../AddDocument/AddDocument';
import { DocumentWrapper } from '../Document/Document';
import { DocumentBoxWrapper } from './styles';

interface Props {
    documentsList: Array<Document>;
    documentType: DocumentType;
    groupPermission: string | null;
    loadingDocuments: boolean;
    createdDocuments: number;
    languages: Array<Language>;
    openOnlineDocument: (_document: Document) => void;
    duplicateDocument: (_documentId: string, _documentTitle: string) => void;
    deleteDocument: (_documentId: string) => void;
}

const DocumentBox = ({
    documentType,
    documentsList,
    groupPermission,
    loadingDocuments,
    createdDocuments,
    languages,
    openOnlineDocument,
    duplicateDocument,
    deleteDocument,
}: Props) => {
    return (
        <Fragment>
            <AddDocument
                documentType={documentType}
                groupPermission={groupPermission}
                loadingDocuments={loadingDocuments}
                createdDocuments={createdDocuments}
            />
            {documentsList.map((document, index) => {
                return (
                    <DocumentBoxWrapper key={document.documentId}>
                        <DocumentWrapper
                            listOrder={index}
                            document={document}
                            languages={languages}
                            openOnlineDocument={() => openOnlineDocument(document)}
                            duplicateDocument={duplicateDocument}
                            deleteDocument={deleteDocument}
                            groupPermission={groupPermission}
                        />
                    </DocumentBoxWrapper>
                );
            })}
        </Fragment>
    );
};

export { DocumentBox };
