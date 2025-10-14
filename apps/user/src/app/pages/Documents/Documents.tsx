import { Tabs } from '@mui/material';
import { AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics';
import { InitialLoading } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import { Footer } from '../../components/Footer/Footer';
import { MyDocuments } from '../../components/MyDocuments/MyDocuments';
import { PreviewSnackbar } from '../../components/PreviewSnackbar/PreviewSnackbar';
import useLanguages from '../../hooks/useLanguages';
import useProfile from '../../hooks/useProfile';
import { useAppSelector } from '../../internals/redux/hooks';
import { Document, DocumentTypeEnum } from '../../models/documents';
import { PageContainer, PageWrapper, StyledTab, stylesTabs } from './styles';

const Documents = () => {
    const { groupPermission, loadingProfile } = useProfile();
    const { languages, languagesLoaded } = useLanguages();
    const classes = stylesTabs();

    const [searchParams] = useSearchParams();
    const tabSelected = searchParams.get('tabSelected');

    const getSelectedDocumentType = (tabSelected: string | null) => {
        if (tabSelected === 'letters') {
            return 1;
        }
        return 0;
    };

    const [selectedDocumentType, setSelectedDocumentType] = useState(getSelectedDocumentType(tabSelected));

    const handleDocumentChange = (_event: ChangeEvent<{}>, newValue: number) => {
        setSelectedDocumentType(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setSelectedDocumentType(index);
    };

    const resumes = useAppSelector((state) => state.documents.resumes);
    const letters = useAppSelector((state) => state.documents.letters);

    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

    const isOlderThanOneYear = (document: Document) =>
        new Date().getTime() - new Date(document.modifiedAt).getTime() > ONE_YEAR_MS;
    const hasEmptyPreviewResumes = resumes.some(
        (document) => !!!document.previewThumbnail && isOlderThanOneYear(document),
    );
    const hasEmptyPreviewLetters = letters.some(
        (document) => !!!document.previewThumbnail && isOlderThanOneYear(document),
    );
    const hasEmptyPreviews = selectedDocumentType === 0 ? hasEmptyPreviewResumes : hasEmptyPreviewLetters;

    if (loadingProfile || !languagesLoaded) {
        return (
            <div className='cv-initial-loading' data-qa='user-loader'>
                <InitialLoading />
            </div>
        );
    }

    return (
        <PageWrapper>
            <AnalyticsLocationChange analyticsViewEvent='view_documents' />
            {hasEmptyPreviews && <PreviewSnackbar />}
            <PageContainer>
                <Tabs
                    value={selectedDocumentType}
                    onChange={handleDocumentChange}
                    classes={{
                        root: classes.tabsRoot,
                        indicator: classes.tabsIndicator,
                    }}
                >
                    <StyledTab data-qa='resumes-tab' label={translate('Resumes')} value={0} wrapped={true} />
                    <StyledTab
                        data-qa='cover-letters-tab'
                        label={translate('Cover letters')}
                        value={1}
                        wrapped={true}
                    />
                </Tabs>
                <SwipeableViews axis={'x'} index={selectedDocumentType} onChangeIndex={handleChangeIndex}>
                    <MyDocuments
                        documentType={DocumentTypeEnum.Resume}
                        groupPermission={groupPermission}
                        languages={languages}
                    />
                    <MyDocuments
                        documentType={DocumentTypeEnum.CoverLetter}
                        groupPermission={groupPermission}
                        languages={languages}
                    />
                </SwipeableViews>
            </PageContainer>
            <Footer />
        </PageWrapper>
    );
};

export default Documents;
