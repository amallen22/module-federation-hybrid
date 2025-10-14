import { analyticsClient, AnalyticsClientEnum, AnalyticsEvent } from '@npm_leadtech/cv-lib-app-analytics';
import { useState } from 'react';

import { APP_CONFIG, PREDEFINED_SECTIONS_CL, PREDEFINED_SECTIONS_CV, TEMPLATES_CONFIG } from '../config/appConfig';
import getUrlDocType from '../helpers/getUrlDocType';
import handleAjaxError from '../helpers/handleAjaxError';
import { GetDocumentPdfHandler } from '../internals/ajax/GetDocumentPdf/handlers';
import { HandleTxt } from '../internals/ajax/handleTxt/handleTxt';
import { useAppSelector } from '../internals/redux/hooks';
import { Routes } from '../internals/router/Routes';
import { Document, DocumentTypeEnum, ManageDocuments } from '../models/documents';
import { Error } from '../models/error';
import { Sections } from '../models/sections';
import { apiService } from '../services/ApiService';
import CookiesStorage from '../services/CookiesStorage';

const useManageDocument = ({ groupPermission }: ManageDocuments = {}) => {
    const [loadingAction, setLoadingAction] = useState(false);
    const resumeCount = useAppSelector((state) => state.documents.resumeCount);
    const letterCount = useAppSelector((state) => state.documents.letterCount);

    const editDocument = ({ documentType, documentId }: { documentType: string; documentId: string }) => {
        setLoadingAction(true);
        window.location.href = `${Routes.editor}${getUrlDocType({ documentType })}/${documentId}`;
    };

    const editDocumentNewTab = ({ documentType, documentId }: { documentType: string; documentId: string }) => {
        setLoadingAction(true);
        window.open(`${Routes.editor}${getUrlDocType({ documentType })}/${documentId}`, '_blank');
    };

    const duplicateDocument = ({
        callback,
        documentId,
        documentTitle,
    }: {
        callback?: () => void;
        documentId: string;
        documentTitle: string;
    }) => {
        setLoadingAction(true);
        const previewOrderId = new Date().getTime().toString();
        CookiesStorage.setCookiesPreview('previewOrderId', previewOrderId);

        if (groupPermission === 'free') {
            window.location.href = Routes.product;
        }

        apiService
        .duplicateDocument({
            documentId: documentId,
            previewOrderId,
            clonedDocumentTitle: documentTitle,
        })
        .then(() => {
            if (callback) callback();
            setLoadingAction(false);
        })
        .catch((err: Error) => {
            setLoadingAction(false);
            handleAjaxError({
                className: 'useManageDocument',
                funcName: 'duplicateDocument',
                err,
            });
        });
    };

    const createDocument = ({ documentType }: { documentType: string }) => {
        setLoadingAction(true);
        const timestamp = new Date().getTime().toString();
        CookiesStorage.setCookiesPreview('previewOrderId', timestamp);

        if (!groupPermission || groupPermission === 'free') {
            if (documentType === DocumentTypeEnum.CoverLetter && letterCount >= 1) {
                window.location.href = Routes.product;
            }
            if (documentType === DocumentTypeEnum.Resume && resumeCount >= 1) {
                window.location.href = Routes.product;
            }
        }

        apiService
        .getDefaultTemplate(documentType)
        .then(({ templateId }) => {
            apiService
            .createDocument({
                documentType: documentType,
                templateId,
                previewOrderId: timestamp,
            })
            .then(({ documentId }) => {
                setLoadingAction(false);
                window.location.href = `${Routes.editor}${getUrlDocType({ documentType })}/${documentId}`;
            });
        })
        .catch((err: Error) => {
            setLoadingAction(false);
            handleAjaxError({
                className: 'useManageDocuments',
                funcName: 'createDocument',
                err,
            });
        });
    };

    const downloadDocument = ({
        documentTitle,
        document,
        mode,
    }: {
        documentTitle: string;
        document: Document;
        mode: 'single' | 'multi' | 'txt';
    }) => {
        setLoadingAction(true);
        switch (mode) {
            case 'single':
            case 'multi':
                new GetDocumentPdfHandler(documentTitle)
                .customAction({ documentId: document.documentId, multiPage: mode === 'multi' })
                .then(() => {
                    sendAnalyticsDownloadEvent('pdf', document, mode);
                    setLoadingAction(false);
                })
                .catch((err: Error) => {
                    setLoadingAction(false);
                    if (typeof err.status === 'undefined' || err.status === 403) {
                        window.location.href = Routes.product;
                    }
                    handleAjaxError({
                        className: 'useManageDocuments',
                        funcName: 'downloadDocumentPDF',
                        err,
                    });
                });
                break;
            case 'txt':
                apiService
                .getDocumentSections({
                    documentId: document.documentId,
                    language: document.language,
                    predefinedSections:
                            document.documentType === DocumentTypeEnum.CoverLetter
                                ? PREDEFINED_SECTIONS_CL
                                : PREDEFINED_SECTIONS_CV,
                })
                .then((sections: Sections) => {
                    new HandleTxt({
                        documentTitle,
                        sections,
                        documentLanguage: document.language,
                        docType: document.documentType,
                    });
                    setLoadingAction(false);
                    sendAnalyticsDownloadEvent('txt', document, mode);
                })
                .catch((err: Error) => {
                    setLoadingAction(false);
                    if (typeof err.status === 'undefined' || err.status === 403) {
                        window.location.href = Routes.product;
                    }
                    handleAjaxError({
                        className: 'useManageDocuments',
                        funcName: 'donwloadDocumentTXT',
                        err,
                    });
                });
                break;
        }
    };

    const deleteDocument = ({ callback, documentId }: { callback?: () => void; documentId: string }) => {
        setLoadingAction(true);
        apiService
        .deleteDocument(documentId)
        .then(() => {
            setLoadingAction(false);
            if (callback) callback();
        })
        .catch((err: Error) => {
            setLoadingAction(true);
            handleAjaxError({
                className: 'useManageDocuments',
                funcName: 'deleteDocument',
                err,
            });
        });
    };

    const openOnlineDocument = ({ document, callback }: { document: Document; callback?: () => void }) => {
        const { documentType, accessLevel, documentId, token } = document;

        if (groupPermission === 'free') {
            if (documentType === DocumentTypeEnum.Resume) {
                window.open(`${Routes.share}/${APP_CONFIG.freeShareResumeURL}`);
                return;
            } else {
                window.open(`${Routes.share}/${APP_CONFIG.freeShareCoverLetterURL}`);
                return;
            }
        }

        if (token && accessLevel === 'public') {
            window.open(`${Routes.share}/${token}`);
            return;
        }

        setLoadingAction(true);
        apiService
        .publishDocument({
            documentId: documentId,
            accessLevel: 'PUBLIC',
        })
        .then(({ token }) => {
            setLoadingAction(false);
            window.open(`${Routes.share}/${token}`);
            if (callback) callback();
        })
        .catch((err) => {
            setLoadingAction(false);
            handleAjaxError({
                className: 'useManageDocuments',
                funcName: 'openOnlineDocument',
                err,
            });
        });
    };

    return {
        createDocument,
        deleteDocument,
        downloadDocument,
        duplicateDocument,
        editDocument,
        editDocumentNewTab,
        openOnlineDocument,
        loadingAction,
    };
};

const sendAnalyticsDownloadEvent = (documentFormat: string, document: Document, mode: 'single' | 'multi' | 'txt') => {
    const amplitudeProps = {
        'template_id': document.templateId,
        'download_location': window.location.pathname.includes('documents') ? 'documents' : 'user',
        'document_format': documentFormat,
        'document_language': document.language,
        'download_type': mode,
        'template_category': '',
    };
    if (TEMPLATES_CONFIG._data[document.templateId]) {
        amplitudeProps['template_category'] = TEMPLATES_CONFIG._data[document.templateId].types[0];
    }
    analyticsClient.sendAnalyticsEvent(AnalyticsEvent.ClickDownload, amplitudeProps, [
        AnalyticsClientEnum.Amplitude,
        AnalyticsClientEnum.GA4,
    ]);
};

export default useManageDocument;
