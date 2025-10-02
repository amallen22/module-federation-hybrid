import { Tabs } from '@mui/material';
import { AnalyticsLocationChange } from '@npm_leadtech/cv-lib-app-analytics';
import { InitialLoading } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import { Footer } from '../../components/Footer/Footer';
import { MyDocuments } from '../../components/MyDocuments/MyDocuments';
import useLanguages from '../../hooks/useLanguages';
import useProfile from '../../hooks/useProfile';
import { DocumentTypeEnum } from '../../models/documents';
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

    const handleDocumentChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedDocumentType(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setSelectedDocumentType(index);
    };

    if (loadingProfile || !languagesLoaded) {
        return (
            <div className='cv-initial-loading'>
                <InitialLoading />
            </div>
        );
    }

    return (
        <PageWrapper>
            <AnalyticsLocationChange analyticsViewEvent='view_documents' />
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
