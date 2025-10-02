import translate from 'counterpart';
import React, { useEffect, useRef, useState } from 'react';

import { Cropper } from './Cropper';
import {
    MobileRemovePhoto,
    NameInitials,
    PhotoCircle,
    PhotoCircleHover,
    PhotoWrapper,
    StyledImage,
    StyledInputFile,
    UploadButton,
} from './styles';

function readFile(file: any): any {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
}

interface UserName {
    firstName?: string;
    lastName?: string;
}

interface Props {
    userName: UserName;
    profilePhoto?: string;
    setHasChanges: (_state: boolean) => void;
    setVisibleToast: (_state: boolean) => void;
    setPhoto: (_photo?: string) => void;
}

const ProfilePhoto = ({ profilePhoto, userName, setHasChanges, setVisibleToast, setPhoto }: Props) => {
    const [isCropperOpen, setIsCropperOpen] = useState(false);
    const [imageBase64, setImageBase64] = useState<string | undefined>(profilePhoto);
    const [imageCropped, setImageCropped] = useState(profilePhoto);
    const inputFileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setImageBase64(profilePhoto);
        setImageCropped(profilePhoto);
    }, [profilePhoto]);

    useEffect(() => {
        setPhoto(imageCropped);
    }, [imageCropped]);

    const resetInputValue = () => {
        // @ts-ignore
        inputFileRef.current.value = null;
    };

    const removePhoto = () => {
        setImageCropped('');
        setPhoto('');
        setHasChanges(true);
    };

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const { size } = file;
            // Max 2MB File
            if (size > 2097152) {
                setIsCropperOpen(false);
                setVisibleToast(true);
            } else {
                const imageBase64: string = await readFile(file);
                setIsCropperOpen(true);
                setImageBase64(imageBase64);
                setVisibleToast(false);
            }
            setHasChanges(true);
        }
    };

    const handleClickInput = () => {
        // @ts-ignore
        inputFileRef.current.click();
    };

    const onCloseCropper = () => {
        setIsCropperOpen(false);
    };

    const renderCropper = () => {
        if (!isCropperOpen) return null;

        return (
            <Cropper
                onCloseCropper={onCloseCropper}
                imageBase64={imageBase64}
                uploadNewPhoto={handleClickInput}
                setImageCropped={setImageCropped}
            />
        );
    };

    const renderCircleContent = () => {
        if (!imageCropped) {
            const initialFirstName = userName?.firstName?.charAt(0);
            const initialLastName = userName?.lastName?.charAt(0);
            return (
                <NameInitials>
                    {initialFirstName}
                    {initialLastName}
                </NameInitials>
            );
        }
        return <StyledImage data-qa='add-photo-image' src={imageCropped} alt='profile photo' />;
    };

    return (
        <div>
            <PhotoWrapper>
                <PhotoCircle onClick={handleClickInput} hasImage={!!imageCropped} data-qa='add-photo-btn'>
                    {renderCircleContent()}
                </PhotoCircle>
                {imageCropped && (
                    <PhotoCircleHover>
                        <span onClick={removePhoto} data-qa='remove-profile-photo-button'>
                            {translate('Remove')}
                        </span>
                    </PhotoCircleHover>
                )}
                <UploadButton onClick={handleClickInput} data-qa='add-photo-btn-icon' />
                <StyledInputFile
                    accept='image/jpeg, jpg, image/bmp, image/gif, image/png'
                    type='file'
                    onClick={resetInputValue}
                    onChange={onFileChange}
                    ref={inputFileRef}
                    data-qa='add-photo-input'
                />
            </PhotoWrapper>
            {imageCropped && <MobileRemovePhoto onClick={removePhoto}>{translate('Remove Photo')}</MobileRemovePhoto>}
            {renderCropper()}
        </div>
    );
};

export default ProfilePhoto;
