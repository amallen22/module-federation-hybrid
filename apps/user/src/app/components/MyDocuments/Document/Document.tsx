import CreateIcon from '@mui/icons-material/Create';
import { Popover } from '@mui/material';
import { Spinner } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { Fragment, useState } from 'react';

import { dateToUpdatedLocale } from '../../../helpers/dateFormatter';
import { getThumbnail } from '../../../helpers/getThumbnail';
import { setCategoryAttr } from '../../../helpers/setCategoryAttr';
import useManageDocument from '../../../hooks/useManageDocument';
import { Document, DocumentTypeEnum } from '../../../models/documents';
import { Language } from '../../../models/language';
import { DocumentDownloadButton } from './DocumentDownloadButton/DocumentDownloadButton';
import { DocumentLanguageLabel } from './DocumentLanguageLabel/DocumentLanguageLabel';
import { DocumentTitle } from './DocumentTitle/DocumentTitle';
import DeleteIcon from './icons/delete-icon.svg';
import DuplicateIcon from './icons/duplicate-icon.svg';
import { LinkIcon } from './icons/LinkIcon';
import {
    DocumentContainer,
    DocumentHover,
    DocumentHoverEdit,
    DocumentInfo,
    DocumentUpdated,
    FlexContainer,
    ItemAction,
    LinkIconContainer,
    PopOverContent,
    StyledMoreVertIcon,
    stylesPopOver,
    ThumbnailImg,
} from './styles';

interface Props {
    document: Document;
    languages: Array<Language>;
    duplicateDocument: (_documentId: string, _documentTitle: string) => void;
    deleteDocument: (_documentId: string) => void;
    openOnlineDocument: () => void;
    groupPermission: string | null;
    listOrder: number;
    userLanguage: string;
    loadingProfile: boolean;
}

const DocumentWrapper = ({
    document,
    languages,
    duplicateDocument,
    openOnlineDocument,
    deleteDocument,
    groupPermission,
    listOrder,
    userLanguage,
    loadingProfile
}: Props) => {
    const { documentId, documentType, language, modifiedAt, previewThumbnail, title, accessLevel } = document;
    const { editDocument, downloadDocument, loadingAction } = useManageDocument({
        groupPermission,
    });

    const [docTitle, setDocumentTitle] = useState(title || translate('Document untitled'));
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const classes = stylesPopOver();
    const isShared = accessLevel === 'public';

    const DocumentUpdatedWrapper = () => {
        return <DocumentUpdated>{dateToUpdatedLocale({ date: modifiedAt, userLanguage })}</DocumentUpdated>;
    };

    const handlePopOverClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopOverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleDuplicateDocument = () => {
        duplicateDocument(documentId, docTitle);
    };

    const handleDeleteDocument = () => {
        deleteDocument(documentId);
    };

    const downloadHandler = (value: 'single' | 'multi' | 'txt'): void => {
        downloadDocument({
            document,
            documentTitle: title,
            mode: value,
        });
    };

    if (loadingAction) {
        return (
            <div data-qa="document-loader">
                <Spinner color='neutral' />
            </div>
        );
    }

    return (
        <Fragment>
            <DocumentContainer data-qa={`${documentType}-card-${listOrder}`}>
                <ThumbnailImg
                    src={getThumbnail({ documentType, previewThumbnail: previewThumbnail ? previewThumbnail : null })}
                />
                <DocumentHover
                    onClick={() => {
                        editDocument({ documentId, documentType });
                    }}
                >
                    <DocumentHoverEdit>
                        <CreateIcon />
                        {translate('Edit')}
                    </DocumentHoverEdit>
                </DocumentHover>
                <DocumentLanguageLabel languageCode={language} languages={languages} />
                <DocumentInfo>
                    <FlexContainer>
                        <DocumentTitle
                            type={documentType}
                            initialValue={title}
                            value={docTitle}
                            documentId={documentId}
                            setDocumentTitle={setDocumentTitle}
                        />
                        <StyledMoreVertIcon onClick={handlePopOverClick} data-qa={`document-${listOrder}-options`} />
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handlePopOverClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            classes={{ paper: classes.PopOverPaper }}
                        >
                            <PopOverContent>
                                <ItemAction
                                    data-qa={`open-share-modal-${listOrder}`}
                                    onClick={openOnlineDocument}
                                    data-tm-event-category={setCategoryAttr()}
                                    data-tm-event-action='Share'
                                    data-tm-event-label={document.documentType}
                                >
                                    <LinkIcon />
                                    <span>
                                        {documentType === DocumentTypeEnum.CoverLetter ? translate('online cover letter') : translate('Online resume')} 
                                    </span>
                                </ItemAction>
                                <ItemAction
                                    onClick={() => handleDuplicateDocument()}
                                    data-qa={`qa-button-duplicate-${listOrder}`}
                                    data-tm-event-category={setCategoryAttr()}
                                    data-tm-event-action='Duplicate'
                                    data-tm-event-label={documentType}
                                >
                                    <img src={DuplicateIcon} />
                                    {translate('Duplicate')}
                                </ItemAction>
                                <ItemAction
                                    onClick={() => handleDeleteDocument()}
                                    data-qa={`qa-button-delete-${listOrder}`}
                                    data-tm-event-category={setCategoryAttr()}
                                    data-tm-event-action='Delete'
                                    data-tm-event-label={documentType}
                                >
                                    <img src={DeleteIcon} />
                                    {translate('Delete')}
                                </ItemAction>
                            </PopOverContent>
                        </Popover>
                    </FlexContainer>
                    {!loadingProfile && <DocumentUpdatedWrapper />}
                    <FlexContainer>
                        <DocumentDownloadButton
                            startDownload={downloadHandler}
                            document={document}
                            listOrder={listOrder}
                            title={docTitle}
                        />
                        <LinkIconContainer isShared={isShared}>
                            <LinkIcon isShared={isShared} />
                        </LinkIconContainer>
                    </FlexContainer>
                </DocumentInfo>
            </DocumentContainer>
        </Fragment>
    );
};

export { DocumentWrapper };
