import HoverEditIcon from '@mui/icons-material/Create';
import { Spinner, useMobile } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { duplicatedDocumentTitleFormatter } from '../../helpers/duplicatedDocumentTitleFormatter';
import { getThumbnail } from '../../helpers/getThumbnail';
import useManageDocument from '../../hooks/useManageDocument';
import { fetchDocuments } from '../../internals/redux/documentSlice';
import { useAppDispatch, useAppSelector } from '../../internals/redux/hooks';
import { Document, DocumentTypeEnum } from '../../models/documents';
import { DocumentTitle } from '../MyDocuments/Document/DocumentTitle/DocumentTitle';
import createIcon from './assets/create.svg';
import deleteIcon from './assets/delete.svg';
import downloadIcon from './assets/download.svg';
import duplicateIcon from './assets/duplicate.svg';
import editIcon from './assets/edit.svg';
import multiIcon from './assets/multi.svg';
import shareIcon from './assets/share.svg';
import singleIcon from './assets/single.svg';
import txtIcon from './assets/txt.svg';
import { PreviewAction, PreviewCreateAction, PreviewDeleteAction } from './components/PreviewAction';
import {
    PreviewMoreIcon,
    PreviewMoreIconContainer,
    PreviewPopoverContent,
    PreviewPopoverWrapper,
} from './components/styles';
import {
    CreateResume,
    EditableTitle,
    ExteriorContainer,
    PreviewBody,
    PreviewContainer,
    PreviewFooter,
    PreviewHeader,
    PreviewHover,
    PreviewHoverEdit,
    PreviewThumbnail,
    SpinnerContainer,
} from './styles';

export const PreviewModule = ({
    documentCount,
    document,
    groupPermission,
}: {
    document: Document[];
    documentCount: number;
    groupPermission: string | null;
}): JSX.Element => {
    const { documentId, documentType, previewThumbnail, title } = document[0];

    const [documentTitle, setDocumentTitle] = useState<string>(title || translate('Document untitled'));
    const [anchorDownloadPopover, setAnchorDownloadPopover] = useState<HTMLButtonElement | null>(null);
    const [anchorMorePopover, setAnchorMorePopover] = useState<HTMLButtonElement | null>(null);
    const openDownloadPopover = Boolean(anchorDownloadPopover);
    const openMorePopover: boolean = Boolean(anchorMorePopover);
    const downloadPopover = openDownloadPopover ? 'download-popover' : undefined;
    const morePopover = openMorePopover ? 'more-popover' : undefined;
    const { isMobile } = useMobile();
    const buttonsRef = useRef<any>(null);
    const boxRef = useRef<any>(null);
    const [hideLast, setHideLast] = useState(false);
    const loading =
        documentType === DocumentTypeEnum.Resume
            ? useAppSelector((state) => state.documents.loadingResumes)
            : useAppSelector((state) => state.documents.loadingLetters);

    const documentDispatch = useAppDispatch();
    const {
        createDocument,
        deleteDocument,
        downloadDocument,
        duplicateDocument,
        editDocument,
        openOnlineDocument,
        loadingAction,
    } = useManageDocument({ groupPermission });

    useLayoutEffect(() => {
        function handleResize() {
            if (boxRef.current && boxRef.current.offsetWidth) {
                const boxWidth = boxRef.current.offsetWidth;
                const contentWidth = buttonsRef.current.offsetWidth;

                if (contentWidth > boxWidth - 40 || window.innerWidth < 1180) {
                    setHideLast(true);
                } else {
                    setHideLast(false);
                }
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [boxRef, buttonsRef]);

    useEffect(() => {
        setDocumentTitle(title || translate('Document untitled'));
    }, [title]);

    const handleMorePopoverClick = (event: any) => {
        setAnchorDownloadPopover(event.currentTarget);
    };

    const handleDownloadPopoverClick = (event: any) => {
        setAnchorMorePopover(event.currentTarget);
    };

    const handleDownloadPopoverClose = () => {
        setAnchorDownloadPopover(null);
    };

    const handlerMorePopoverClose = () => {
        setAnchorMorePopover(null);
    };

    const handleEdit = () => {
        if (documentCount === 0) {
            createDocument({ documentType });
        }

        editDocument({ documentId, documentType });
    };

    const loadDocuments = () => {
        documentDispatch(
            fetchDocuments({
                limit: 3,
                documentType: documentType,
            }),
        );
    };

    return (
        <ExteriorContainer>
            <div className='useRefContainer' ref={boxRef}>
                <PreviewContainer>
                    {loadingAction || loading ? (
                        <SpinnerContainer>
                            <Spinner color='blue' />
                        </SpinnerContainer>
                    ) : (
                        <React.Fragment>
                            <PreviewHeader isMobile={isMobile}>
                                {documentCount !== 0 && (
                                    <EditableTitle>
                                        <DocumentTitle
                                            documentId={documentId}
                                            initialValue={title}
                                            setDocumentTitle={setDocumentTitle}
                                            type={documentType}
                                            value={documentTitle}
                                        />
                                    </EditableTitle>
                                )}
                                {!isMobile && (
                                    <CreateResume>
                                        <PreviewCreateAction
                                            dataQa='preview-module-create-document'
                                            action={() => createDocument({ documentType })}
                                            icon={createIcon}
                                            text={'new resume'}
                                        />
                                    </CreateResume>
                                )}
                            </PreviewHeader>
                            <PreviewBody>
                                {documentCount !== 0 && (
                                    <PreviewHover>
                                        <PreviewHoverEdit onClick={handleEdit} data-qa='preview-module-edit-document'>
                                            <HoverEditIcon />
                                        </PreviewHoverEdit>
                                    </PreviewHover>
                                )}
                                <PreviewThumbnail
                                    isMobile={isMobile}
                                    src={getThumbnail({
                                        documentType,
                                        previewThumbnail: previewThumbnail ? previewThumbnail : null,
                                    })}
                                />
                            </PreviewBody>
                        </React.Fragment>
                    )}
                    <PreviewFooter>
                        <div className='useRefFooter' ref={buttonsRef}>
                            <PreviewAction
                                dataQa='preview-module-edit-document'
                                action={() => editDocument({ documentId, documentType })}
                                disabled={documentCount === 0 || loadingAction || loading}
                                icon={editIcon}
                                text={'Edit'}
                            />
                            <PreviewAction
                                dataQa='preview-module-download-toggle'
                                action={handleMorePopoverClick}
                                disabled={documentCount === 0 || loadingAction || loading || !previewThumbnail}
                                icon={downloadIcon}
                                text={'Download'}
                            />
                            {!hideLast && (
                                <PreviewAction
                                    dataQa='preview-module-online-resume'
                                    action={() => openOnlineDocument({ document: document[0] })}
                                    disabled={documentCount === 0 || loadingAction || loading || !previewThumbnail}
                                    icon={shareIcon}
                                    text={'Online resume'}
                                />
                            )}
                        </div>
                        <PreviewPopoverWrapper
                            id={downloadPopover}
                            open={openDownloadPopover}
                            anchorEl={anchorDownloadPopover}
                            onClose={handleDownloadPopoverClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: isMobile ? 'center' : 0,
                            }}
                        >
                            <PreviewPopoverContent>
                                <PreviewAction
                                    dataQa='preview-module-download-PDF-single-page'
                                    action={() =>
                                        downloadDocument({
                                            document: document[0],
                                            documentTitle: title,
                                            mode: 'single',
                                        })
                                    }
                                    disabled={loadingAction || loading}
                                    icon={singleIcon}
                                    text={'Digital pdf (single-page)'}
                                />
                                <PreviewAction
                                    dataQa='preview-module-download-PDF-multi-page'
                                    action={() =>
                                        downloadDocument({
                                            document: document[0],
                                            documentTitle: title,
                                            mode: 'multi',
                                        })
                                    }
                                    disabled={loadingAction || loading}
                                    icon={multiIcon}
                                    text={'Print ready pdf (multi-page)'}
                                />
                                <PreviewAction
                                    dataQa='preview-module-download-TXT'
                                    action={() =>
                                        downloadDocument({
                                            document: document[0],
                                            documentTitle: title,
                                            mode: 'txt',
                                        })
                                    }
                                    disabled={loadingAction || loading}
                                    icon={txtIcon}
                                    text={'TXT (plain text)'}
                                />
                            </PreviewPopoverContent>
                        </PreviewPopoverWrapper>
                        <PreviewMoreIconContainer
                            data-qa={'preview-module-more-actions'}
                            disabled={documentCount === 0}
                            onClick={handleDownloadPopoverClick}
                        >
                            <PreviewMoreIcon />
                        </PreviewMoreIconContainer>
                        <PreviewPopoverWrapper
                            id={morePopover}
                            open={openMorePopover}
                            anchorEl={anchorMorePopover}
                            onClose={handlerMorePopoverClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <PreviewPopoverContent>
                                {hideLast && (
                                    <PreviewAction
                                        dataQa='preview-module-online-resume'
                                        action={() => openOnlineDocument({ document: document[0] })}
                                        disabled={documentCount === 0 || loadingAction || loading || !previewThumbnail}
                                        icon={shareIcon}
                                        text={'Online resume'}
                                    />
                                )}
                                <PreviewAction
                                    dataQa='preview-module-duplicate-document'
                                    action={() => {
                                        duplicateDocument({
                                            documentId,
                                            documentTitle: duplicatedDocumentTitleFormatter({ documentTitle }),
                                            callback: () => loadDocuments(),
                                        });
                                    }}
                                    disabled={loadingAction || loading || !previewThumbnail}
                                    icon={duplicateIcon}
                                    text={'Duplicate'}
                                />
                                <PreviewDeleteAction
                                    dataQa='preview-module-delete-document'
                                    action={() =>
                                        deleteDocument({
                                            documentId,
                                            callback: () => loadDocuments(),
                                        })
                                    }
                                    disabled={loadingAction || loading}
                                    icon={deleteIcon}
                                    text={'Delete'}
                                />
                            </PreviewPopoverContent>
                        </PreviewPopoverWrapper>
                    </PreviewFooter>
                </PreviewContainer>
            </div>

            {isMobile && (
                <CreateResume isMobile={isMobile}>
                    <PreviewCreateAction
                        dataQa='preview-module-create-document'
                        action={() => createDocument({ documentType })}
                        icon={createIcon}
                        disabled={loadingAction || loading}
                        text={'new resume'}
                    />
                </CreateResume>
            )}
        </ExteriorContainer>
    );
};
