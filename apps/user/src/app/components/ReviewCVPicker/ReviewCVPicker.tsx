/* eslint-disable camelcase */
import { Spinner } from '@npm_leadtech/cv-lib-app-components';
// import { TextfieldWithSuggestions } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import parse from 'html-react-parser';
import React, { useEffect, useRef, useState } from 'react';

import { dateToUpdatedLocale } from '../../helpers/dateFormatter';
import { getThumbnail } from '../../helpers/getThumbnail';
import useManageDocument from '../../hooks/useManageDocument';
import useProfile from '../../hooks/useProfile';
import { getReviews, requestReview } from '../../internals/redux/documentReviewSlice';
import { fetchDocuments } from '../../internals/redux/documentSlice';
import { useAppDispatch, useAppSelector } from '../../internals/redux/hooks';
import { Routes } from '../../internals/router';
import { Document, DocumentTypeEnum } from '../../models/documents';
import { reviewerId, ReviewRequest } from '../../models/review';
import { Suggestion } from '../../models/suggestions';
import { apiService } from '../../services/ApiService';
import { ReviewDialog } from '../ReviewDialog/ReviewDialog';
import {
    BottomText,
    ChangeButton,
    Container,
    DesiredJob,
    DocumentDate,
    DocumentTitle,
    LoaderContainer,
    PreviewActions,
    PreviewBody,
    PreviewHeader,
    PreviewThumbnail,
    StyledGradientButton,
} from './styles';

const defaultDocumentsLimit = 3;

export const ReviewCVPicker = () => {
    const { resumes: documents, resumeCount, loadingResumes } = useAppSelector((state) => state.documents);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const { userLanguage, groupPermission } = useProfile();
    const [jobPosition, setJobPosition] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const { createDocument } = useManageDocument({ groupPermission });

    const documentDispatch = useAppDispatch();
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLButtonElement>();

    useEffect(() => {
        if (documents.length < 1) {
            documentDispatch(fetchDocuments({ limit: defaultDocumentsLimit, documentType: DocumentTypeEnum.Resume }));
        } else {
            setSelectedDocument(documents[0]);
        }
    }, []);

    useEffect(() => {
        if (userLanguage) getSuggestions();
    }, [userLanguage]);

    useEffect(() => {
        if (!selectedDocument) {
            setSelectedDocument(documents[0]);
        }
    }, [documents]);

    const closeModal = (document?: Document) => {
        if (document) setSelectedDocument(document);
        setIsOpen(false);
    };

    const getSuggestions = async () => {
        const fetchReviews = {
            occupation: '',
            language: userLanguage.slice(0, 2),
        };
        apiService.getSuggestions(fetchReviews).then((res) => {
            setSuggestions([...res]);
        });
    };

    const requestDocumentReview = () => {
        if (!selectedDocument?.documentId || !jobPosition) return;

        if (!groupPermission || groupPermission === 'free') {
            window.location.href = Routes.product;
        }

        const params: ReviewRequest = {
            language: userLanguage,
            reviewer_id: reviewerId,
            documentId: selectedDocument.documentId,
            review_customization: {
                profession: jobPosition,
            },
        };

        dispatch(requestReview(params))
        .unwrap()
        .then(() => {
            // This timeout allows time for the database to update so that getReviews gets new results
            setTimeout(function () {
                dispatch(getReviews());
            }, 5000);
        });
    };

    const renderCvPreview = () => {
        if (!userLanguage || loadingResumes)
            return (
                <LoaderContainer>
                    <Spinner style={{ alignSelf: 'center', justifySelf: 'center' }} color='gray' />
                </LoaderContainer>
            );
        if (!selectedDocument || resumeCount === 0)
            return (
                <>
                    <PreviewHeader></PreviewHeader>
                    <PreviewThumbnail
                        data-qa='resume-thumbnail'
                        src={getThumbnail({
                            documentType: DocumentTypeEnum.Resume,
                            previewThumbnail: null,
                        })}
                    />
                </>
            );
        return (
            <>
                <PreviewHeader>
                    <DocumentTitle data-qa='preview-document-title'>
                        {selectedDocument.title ? selectedDocument.title : translate('Document untitled')}
                    </DocumentTitle>
                    {resumeCount > 1 && (
                        <ChangeButton onClick={() => setIsOpen(true)} data-qa='review-picker-change-button'>
                            {translate('Change')}
                        </ChangeButton>
                    )}
                    <DocumentDate data-qa='resume-date'>
                        {dateToUpdatedLocale({ date: selectedDocument.createdAt, userLanguage })}
                    </DocumentDate>
                </PreviewHeader>
                <PreviewThumbnail
                    data-qa='resume-thumbnail'
                    src={getThumbnail({
                        documentType: selectedDocument.documentType,
                        previewThumbnail: selectedDocument.previewThumbnail ? selectedDocument.previewThumbnail : null,
                    })}
                />
            </>
        );
    };

    const renderActions = () => {
        if (loadingResumes) return;
        if (resumeCount === 0)
            return (
                <PreviewActions>
                    <DesiredJob data-qa='no-resumes-yet-text'>{translate('No resumes yet')}</DesiredJob>
                    <StyledGradientButton
                        onClick={() => createDocument({ documentType: DocumentTypeEnum.Resume })}
                        ref={ref}
                        data-qa='review-picker-button'
                    >
                        {!groupPermission || groupPermission === 'free' ? (
                            <span>{translate('Unlock now')}</span>
                        ) : (
                            <span>{translate('Review resume')}</span>
                        )}
                    </StyledGradientButton>
                </PreviewActions>
            );

        return (
            <PreviewActions>
                <DesiredJob>{translate('What is your desired job position?')}</DesiredJob>
                {/* TODO: Replace with TextfieldWithSuggestions when import is fixed */}
                <input
                    type="text"
                    value={jobPosition || ''}
                    onChange={(e) => setJobPosition(e.target.value)}
                    placeholder={translate('Job position')}
                    style={{ padding: '8px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <StyledGradientButton
                    onClick={() => requestDocumentReview()}
                    disabled={!selectedDocument || !jobPosition}
                    ref={ref}
                    data-qa='review-picker-button'
                >
                    {!groupPermission || groupPermission === 'free' ? (
                        <span>{translate('Unlock now')}</span>
                    ) : (
                        <span>{translate('Review resume')}</span>
                    )}
                </StyledGradientButton>
                <BottomText>
                    {parse(translate("<span>Ready in 48h.</span> Ensure it's correct, one chance only."))}
                </BottomText>
            </PreviewActions>
        );
    };

    return (
        <Container>
            <PreviewBody>{renderCvPreview()}</PreviewBody>
            {renderActions()}
            <ReviewDialog
                open={isOpen}
                closeModal={(document?: Document) => closeModal(document)}
                userLanguage={userLanguage}
            />
        </Container>
    );
};
