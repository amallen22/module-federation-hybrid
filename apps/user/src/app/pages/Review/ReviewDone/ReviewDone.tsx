import { InitialLoading } from '@npm_leadtech/cv-lib-app-components';
import StorePackage from '@npm_leadtech/cv-storage-js';
import translate from 'counterpart';
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';

import { dateToUpdatedLocale } from '../../../helpers/dateFormatter';
import { getCookie } from '../../../helpers/getCookie';
import { getThumbnail } from '../../../helpers/getThumbnail';
import useManageDocument from '../../../hooks/useManageDocument';
import useProfile from '../../../hooks/useProfile';
import { fetchDocuments } from '../../../internals/redux/documentSlice';
import { useAppDispatch, useAppSelector } from '../../../internals/redux/hooks';
import { Document, DocumentTypeEnum } from '../../../models/documents';
import { Recommendation, ReviewCookieEnum } from '../../../models/review';
import customDot from '../Assets/customDot.svg';
import {
    BottomTextContainer,
    ContainerBottom,
    ContainerTop,
    CvPreview,
    CvPreviewBottom,
    CvPreviewTop,
    EditResumeButton,
    ExampleList,
    ExampleListItem,
    ReviewExample,
    ReviewList,
    ReviewPoint,
    ReviewPointIcon,
    ReviewSet,
    ReviewText,
    ReviewTitle,
    Subtitle,
    Title,
    TopTextContainer,
    WidgetContent,
    WidgetContentSmall,
    WidgetItem,
    WidgetTitle,
} from './styles';

function getRegionName(userLanguage: string) {
    let regionNames = new Intl.DisplayNames([userLanguage], { type: 'region' });
    const cookieCountry = getCookie().country.toUpperCase();
    const country = regionNames.of(cookieCountry);
    return country;
}

export const ReviewDone = () => {
    const { review, profession, response } = useAppSelector((state) => state.documentReview);

    const documents = useAppSelector((state) => state.documents.resumes);
    const loadingResumes = useAppSelector((state) => state.documents.loadingResumes);
    const documentDispatch = useAppDispatch();
    const { groupPermission, userLanguage } = useProfile();
    const cookiesStorage = StorePackage.StorageManager();
    const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
    const { editDocumentNewTab } = useManageDocument({ groupPermission });

    useEffect(() => {
        if (documents.length < 1) {
            dispatchDocument();
        } else {
            setDocument(documents);
        }
    }, []);

    useEffect(() => {
        cookiesStorage.setCookie(ReviewCookieEnum.REVIEWED_COOKIE, true);
    }, []);

    const dispatchDocument = () => {
        documentDispatch(fetchDocuments({ documentType: DocumentTypeEnum.Resume }))
        .unwrap()
        .then((res) => {
            const document = res.documents.find((doc) => doc.documentId === response?.document_id);
            if (document) setCurrentDocument(document);
        });
    };

    const setDocument = (documents: Document[]) => {
        const document = documents.find((doc) => doc.documentId === response?.document_id);

        if (document) {
            setCurrentDocument(document);
        } else {
            dispatchDocument();
        }
    };

    const clickEdit = () => {
        if (!response) return;
        editDocumentNewTab({ documentId: response.document_id, documentType: DocumentTypeEnum.Resume });
    };

    const subtitleText = () => {
        return translate(
            "Based on the experience and skills highlighted in your resume, we've put together some tailored suggestions to help you excel in your application for a %(position)s position in %(country)s:",
            {
                country: getRegionName(userLanguage),
                position: profession,
            },
        );
    };

    if (!response || loadingResumes || !review || !userLanguage || !documents) {
        return (
            <div data-qa='user-loader'>
                <InitialLoading />;
            </div>
        );
    }

    return (
        <>
            <ContainerTop className='containerTop'>
                <TopTextContainer className='topText'>
                    <Title>{parse(translate('Resume <span> Review </span>'))}</Title>
                    <Subtitle id='subtitle'>{subtitleText()}</Subtitle>
                </TopTextContainer>
            </ContainerTop>
            <ContainerBottom className='containerBottom'>
                <BottomTextContainer className='topText'>
                    <Subtitle id='subtitle'>{subtitleText()}</Subtitle>
                    <ReviewList data-qa='review-done-recommendation-list'>
                        {review ? (
                            review.map((r: Recommendation) => {
                                return (
                                    <ReviewPoint key={r.title}>
                                        <ReviewPointIcon src={customDot} />
                                        <ReviewSet>
                                            <ReviewTitle>{r.title}</ReviewTitle>
                                            <ReviewText> {r.description} </ReviewText>
                                            {   (r.example && r.example.before || r.example && r.example.after) &&
                                                    <>
                                                        <ReviewExample> { translate('example') }: </ReviewExample>
                                                        <ExampleList>
                                                            {r.example.before && <ExampleListItem> <b> { translate('before') }: </b> {r.example.before} </ExampleListItem>}
                                                            {r.example.after && <ExampleListItem> <b> { translate('after') }: </b> {r.example.after} </ExampleListItem>}
                                                        </ExampleList>
                                                    </>
                                            }
                                            
                                        </ReviewSet>
                                    </ReviewPoint>
                                );
                            })
                        ) : (
                            <ReviewPoint>
                                <ReviewPointIcon src={customDot} />
                                <ReviewSet>
                                    <ReviewText>{JSON.stringify(review)}</ReviewText>
                                </ReviewSet>
                            </ReviewPoint>
                        )}
                    </ReviewList>
                </BottomTextContainer>

                <CvPreview>
                    <CvPreviewTop
                        src={getThumbnail({
                            documentType: documents[0].documentType,
                            previewThumbnail:
                                currentDocument && currentDocument.previewThumbnail
                                    ? currentDocument.previewThumbnail
                                    : null,
                        })}
                    />
                    <CvPreviewBottom>
                        <WidgetItem>
                            <WidgetTitle>{translate('Document reviewed')}</WidgetTitle>
                            <WidgetContent>
                                {currentDocument && currentDocument.title
                                    ? currentDocument.title
                                    : translate('Document untitled')}
                            </WidgetContent>
                            <WidgetContentSmall>
                                {dateToUpdatedLocale({ date: currentDocument?.createdAt, userLanguage })}
                            </WidgetContentSmall>
                        </WidgetItem>
                        <WidgetItem>
                            <WidgetTitle>{translate('Job position')}</WidgetTitle>
                            <WidgetContent>{profession}</WidgetContent>
                        </WidgetItem>
                        <EditResumeButton
                            className='desktop'
                            disabled={!currentDocument}
                            onClick={() => clickEdit()}
                            data-qa='review-done-edit-desktop'
                        >
                            {translate('Edit resume')}
                        </EditResumeButton>
                    </CvPreviewBottom>
                </CvPreview>
            </ContainerBottom>

            <EditResumeButton
                className='mobile'
                disabled={!currentDocument}
                onClick={() => clickEdit()}
                data-qa='review-done-edit-mobile'
            >
                {translate('Edit resume')}
            </EditResumeButton>
        </>
    );
};
