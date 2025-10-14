import { Spinner } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useEffect, useState } from 'react';

import { duplicatedDocumentTitleFormatter } from '../../helpers/duplicatedDocumentTitleFormatter';
import useManageDocument from '../../hooks/useManageDocument';
import { fetchDocuments } from '../../internals/redux/documentSlice';
import { useAppDispatch, useAppSelector } from '../../internals/redux/hooks';
import { Routes } from '../../internals/router';
import { DocumentType, DocumentTypeEnum } from '../../models/documents';
import { Language } from '../../models/language';
import { DocumentBox } from './DocumentBox/DocumentBox';
import { ButtonWrapper, ContainerWrapper, MyDocumentsWrapper, ViewAllContainer } from './styles';

interface Props {
    documentType: DocumentType;
    groupPermission: string | null;
    languages?: Language[];
}

const defaultDocumentsLimit = 3;

export const MyDocuments = ({ documentType, groupPermission, languages }: Props) => {
    const [showAllDocuments, setShowAllDocuments] = useState(false);
    const documentDispatch = useAppDispatch();
    const { deleteDocument, duplicateDocument, openOnlineDocument, loadingAction } = useManageDocument({
        groupPermission,
    });
    const documentCount =
        documentType === DocumentTypeEnum.Resume
            ? useAppSelector((state) => state.documents.resumeCount)
            : useAppSelector((state) => state.documents.letterCount);
    const documents =
        documentType === DocumentTypeEnum.Resume
            ? useAppSelector((state) => state.documents.resumes)
            : useAppSelector((state) => state.documents.letters);
    const loading =
        documentType === DocumentTypeEnum.Resume
            ? useAppSelector((state) => state.documents.loadingResumes)
            : useAppSelector((state) => state.documents.loadingLetters);

    useEffect(() => {
        documentDispatch(fetchDocuments({ limit: defaultDocumentsLimit, documentType }));
    }, []);

    useEffect(() => {
        if (!showAllDocuments) window.scrollTo(0, 0);
    }, [showAllDocuments]);

    const loadAllDocuments = () => {
        if (documents.length < documentCount) {
            documentDispatch(fetchDocuments({ documentType }));
        }
        setShowAllDocuments(true);
    };

    const renderViewAllDocumentsButton = () => {
        if (documentCount <= defaultDocumentsLimit) return;
        if (loading || !documents) {
            return <Spinner color='blue' />;
        }
        if (showAllDocuments) {
            return (
                <ViewAllContainer data-qa='data-qa-view-less' onClick={() => setShowAllDocuments(false)}>
                    {translate('View less')}
                </ViewAllContainer>
            );
        }
        if (!showAllDocuments) {
            return (
                <ViewAllContainer data-qa='data-qa-view-all' onClick={() => loadAllDocuments()}>
                    {translate('See more')} ({documentCount - defaultDocumentsLimit})
                </ViewAllContainer>
            );
        }
    };

    const handleDuplicateDocument = (documentId: string, documentTitle: string) => {
        if (groupPermission === 'free') {
            window.location.href = Routes.product;
            return;
        }

        duplicateDocument({
            documentId,
            documentTitle: duplicatedDocumentTitleFormatter({ documentTitle }),
            callback: () => loadDocuments(),
        });
    };

    const handleDeleteDocument = (documentId: string) => {
        deleteDocument({
            callback: () => loadDocuments(),
            documentId,
        });
    };

    const loadDocuments = () => {
        documentDispatch(
            fetchDocuments({
                limit: showAllDocuments ? null : defaultDocumentsLimit,
                documentType: documentType,
            }),
        );
    };

    const displayDocuments = () => {
        if (showAllDocuments) return documents;
        return documents.slice(0, defaultDocumentsLimit);
    };

    if (!documents || loading || loadingAction) {
        return (
            <ContainerWrapper>
                <Spinner color='neutral' />
            </ContainerWrapper>
        );
    }

    return (
        <ContainerWrapper>
            <MyDocumentsWrapper data-qa={`qa-${documentType}-container`}>
                <DocumentBox
                    documentType={documentType}
                    documentsList={displayDocuments()}
                    groupPermission={groupPermission}
                    loadingDocuments={loading}
                    createdDocuments={documentCount}
                    languages={languages || []}
                    openOnlineDocument={(document) => openOnlineDocument({ document, callback: () => loadDocuments() })}
                    duplicateDocument={handleDuplicateDocument}
                    deleteDocument={handleDeleteDocument}
                />
            </MyDocumentsWrapper>
            <ButtonWrapper>{renderViewAllDocumentsButton()}</ButtonWrapper>
        </ContainerWrapper>
    );
};
