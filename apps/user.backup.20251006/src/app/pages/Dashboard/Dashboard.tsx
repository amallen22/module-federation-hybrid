import { AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics';
import { InitialLoading, useMobile } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useEffect } from 'react';

import { Footer } from '../../components/Footer/Footer';
import previewPlaceholder from '../../components/PreviewModule/mock/preview_placeholder.json';
import { PreviewModule } from '../../components/PreviewModule/PreviewModule';
import { PromotionalList } from '../../components/PromotionalList/PromotionalList';
import { CoverLetterPM } from '../../components/PromotionalModule/CoverLetterPM/CoverLetterPM';
import { PMColorsEnum } from '../../components/PromotionalModule/Definitions';
import { OnlineCVPM } from '../../components/PromotionalModule/OnlineCVPM/OnlineCVPM';
import { ReviewPM } from '../../components/PromotionalModule/ReviewPM/ReviewPM';
import useLanguages from '../../hooks/useLanguages';
import useManageDocument from '../../hooks/useManageDocument';
import useProfile from '../../hooks/useProfile';
import { fetchDocuments } from '../../internals/redux/documentSlice';
import { useAppDispatch, useAppSelector } from '../../internals/redux/hooks';
import { DocumentTypeEnum } from '../../models/documents';
import { ReviewStatusEnum } from '../../models/review';
import { ColumnLeft, ColumnRight, ContainerTitle, Grid, Item, PageContainer, PageWrapper, Row } from './styles';

const DashBoard = () => {
    const { groupPermission, loadingProfile, firstName, userLanguage } = useProfile();
    const { languagesLoaded } = useLanguages();
    const documentDispatch = useAppDispatch();
    const documents = useAppSelector((state) => state.documents.resumes);
    const loadingResumes = useAppSelector((state) => state.documents.loadingResumes);
    const loadingLetters = useAppSelector((state) => state.documents.loadingLetters);
    const documentCount = useAppSelector((state) => state.documents.resumeCount);
    const firstDocument = documents.slice(0, 1);
    const { isMobile } = useMobile();
    const { loadingAction } = useManageDocument({ groupPermission });
    const { reviewStatus } = useAppSelector((state) => state.documentReview);

    useEffect(() => {
        // We load both resumes and letters to load the document Count for the navbar
        documentDispatch(fetchDocuments({ limit: 3, documentType: DocumentTypeEnum.Resume }));
        documentDispatch(fetchDocuments({ limit: 3, documentType: DocumentTypeEnum.CoverLetter }));
    }, []);

    if (loadingProfile || !userLanguage || !languagesLoaded || loadingResumes || loadingLetters || loadingAction) {
        return (
            <div className='cv-initial-loading'>
                <InitialLoading />
            </div>
        );
    }

    const renderDashboard = () => {
        if (reviewStatus !== ReviewStatusEnum.REVIEWED) {
            return (
                <>
                    <Row>
                        <ReviewPM language={userLanguage} />
                    </Row>
                    <Row>
                        <CoverLetterPM color={PMColorsEnum.PINK} />
                        <OnlineCVPM document={firstDocument[0]} />
                    </Row>
                </>
            );
        } else {
            return (
                <>
                    <Row>
                        <CoverLetterPM color={PMColorsEnum.BLUE} />
                    </Row>
                    <Row>
                        <OnlineCVPM document={firstDocument[0]} />
                    </Row>
                </>
            );
        }
    };

    return (
        <PageWrapper>
            <AnalyticsLocationChange analyticsViewEvent='view_user' />
            <PageContainer isMobile={isMobile}>
                <ContainerTitle data-qa='dashboard-title'>
                    {firstName
                        ? `${translate('Hi!')} ${firstName} ${translate(
                            'Get ready to land your dream job',
                        ).toLowerCase()}`
                        : `${translate('Hi!')} ${translate('Get ready to land your dream job')}`}
                </ContainerTitle>
                <Grid>
                    <ColumnLeft>{renderDashboard()}</ColumnLeft>
                    <ColumnRight>
                        <Item>
                            <PreviewModule
                                document={documentCount === 0 ? previewPlaceholder : firstDocument}
                                documentCount={documentCount}
                                groupPermission={groupPermission}
                            />
                        </Item>
                        <Item>
                            <PromotionalList />
                        </Item>
                    </ColumnRight>
                </Grid>
            </PageContainer>
            <Footer />
        </PageWrapper>
    );
};

export default DashBoard;
