import { Toast } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

import { apiService } from '../../services/ApiService';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import UserInputs from '../UserInputs/UserInputs';
import {
    Email,
    FieldsPhotoWrapper,
    SaveButton,
    SectionSubtitle,
    StyledConfigurationOptionDiv,
    StyledProfileTitle,
} from './styles';

interface Props {
    email: string;
    firstName?: string;
    lastName?: string;
    profilePhoto?: string;
}

const sanitizeProps = {
    allowedTags: ['b'],
};

const UserInfo = ({ email, firstName, lastName, profilePhoto }: Props) => {
    const [hasChanges, setHasChanges] = useState(false);
    const [userName, setUserName] = useState({ firstName, lastName });
    const [photo, setPhoto] = useState<string | undefined>(profilePhoto);
    const [visibleToast, setVisibleToast] = useState(false);

    useEffect(() => {
        setUserName({ firstName, lastName });
    }, [firstName, lastName]);

    const saveChanges = () => {
        setHasChanges(false);
        apiService
        .putUserInfo({
            firstName: userName.firstName,
            lastName: userName.lastName,
            photo,
        })
        .then(() => {
            window.location.reload();
        });
    };

    const handleWarningToast = () => {
        setVisibleToast(!visibleToast);
    };

    const renderWarning = () => {
        if (!visibleToast) return;

        const warningText = `<b>${translate('The photo you have uploaded is too heavy.')}</b> ${translate(
            'Please try again with one that weighs less than 2MB.',
        )}`;

        return (
            <Toast type='toast-error' onCloseHandler={() => handleWarningToast()}>
                {parse(sanitizeHtml(warningText, sanitizeProps))}
            </Toast>
        );
    };

    return (
        <>
            <StyledProfileTitle>{translate('Personal information')}</StyledProfileTitle>
            <StyledConfigurationOptionDiv>
                <SectionSubtitle>{translate('EMAIL ACCOUNT')}</SectionSubtitle>
                <Email data-qa='profile-email-text'>{email}</Email>
            </StyledConfigurationOptionDiv>
            <FieldsPhotoWrapper>
                <ProfilePhoto
                    userName={userName}
                    profilePhoto={profilePhoto}
                    setHasChanges={setHasChanges}
                    setVisibleToast={setVisibleToast}
                    setPhoto={setPhoto}
                />
                <UserInputs
                    userName={userName}
                    // @ts-ignore
                    setUserName={setUserName}
                    setHasChanges={setHasChanges}
                />
            </FieldsPhotoWrapper>
            <SaveButton data-qa='save-changes-button' disabled={!hasChanges} onClick={saveChanges}>
                {translate('SAVE CHANGES')}
            </SaveButton>
            {renderWarning()}
        </>
    );
};

export default UserInfo;
