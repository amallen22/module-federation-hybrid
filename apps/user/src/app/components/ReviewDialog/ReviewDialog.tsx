import { Spinner } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useEffect, useRef, useState } from 'react';

import { fetchDocuments } from '../../internals/redux/documentSlice';
import { useAppDispatch, useAppSelector } from '../../internals/redux/hooks';
import { Document, DocumentTypeEnum } from '../../models/documents';
import CrossSVG from '../../pages/Review/Assets/cross.svg';
import { DocumentThumbnail } from './DocumentThumbnail/DocumentThumbnail';
import { Container, Cross, Dialog, DocumentBox, Footer, ShowMoreButton, Title } from './styles';

interface Props {
    open: boolean;
    closeModal: (_resume: Document | undefined) => void;
    userLanguage: string;
}

export const ReviewDialog = ({ open, closeModal, userLanguage }: Props) => {
    const documentDispatch = useAppDispatch();

    const { resumes, resumeCount, loadingResumes } = useAppSelector((state) => state.documents);
    const [show, setShow] = useState(true);

    const loadMoreDocuments = () => {
        documentDispatch(fetchDocuments({ limit: 99, documentType: DocumentTypeEnum.Resume }));
    };

    const anRef = useRef<HTMLDialogElement>(null);

    const handleClose = (resume?: Document) => {
        setShow(false);
        setTimeout(() => {
            closeModal(resume);
        }, 300);
    };

    useEffect(() => {
        if (open) {
            anRef.current?.showModal();
            setShow(true);
        } else {
            anRef.current?.close();
        }
    }, [open]);

    return (
        <Dialog ref={anRef} onCancel={() => handleClose()} className={show ? 'show' : ''} data-qa='review-dialog'>
            <Container method='dialog'>
                <Cross src={CrossSVG} onClick={() => handleClose()} data-qa='review-dialog-exit' />
                <Title>{translate('Choose a resume to review')}</Title>
                <DocumentBox>
                    {resumes.map((resume: Document) => {
                        return (
                            <DocumentThumbnail
                                userLanguage={userLanguage}
                                document={resume}
                                key={resume.documentId}
                                handleClick={() => handleClose(resume)}
                            />
                        );
                    })}
                </DocumentBox>
                <Footer>
                    {loadingResumes ? (
                        <Spinner color='blue' styles={{ height: '20px' }} />
                    ) : (
                        <ShowMoreButton
                            onClick={() => loadMoreDocuments()}
                            show={resumeCount > 3 && resumes.length < resumeCount}
                            data-qa='review-dialog-show-more'
                        >
                            {translate('Load more')}
                        </ShowMoreButton>
                    )}
                </Footer>
            </Container>
        </Dialog>
    );
};
