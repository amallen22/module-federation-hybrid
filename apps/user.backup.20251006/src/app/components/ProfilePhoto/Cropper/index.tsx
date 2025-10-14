import { Dialog, Slider } from '@mui/material';
import { Button, Modal } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useCallback, useState } from 'react';
import Crop from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';

import getCroppedImg from './getCroppedImg';
import customDragIcon from './img/customDrag.svg';
import customImgIcon from './img/customImg.svg';
import rotateIcon from './img/rounded.svg';
import {
    ButtonsContainer,
    CircularFakeCropper,
    Container,
    CropperContainer,
    CropperControls,
    HorizontalDivider,
    InfoMessageCropper,
    stylesCustomSlider,
    UploadNewPhoto,
} from './styles';

interface Props {
    onCloseCropper: () => void;
    imageBase64: string | undefined | null;
    uploadNewPhoto: () => void;
    setImageCropped: (_croppedImage: string) => void;
}

export const Cropper = ({ onCloseCropper, imageBase64, uploadNewPhoto, setImageCropped }: Props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | undefined>(undefined);

    const onCropComplete = useCallback((_croppedArea: Area, _croppedAreaPixels: Area) => {
        setCroppedAreaPixels(_croppedAreaPixels);
    }, []);

    const handleRotate = () => {
        setRotation(rotation + 90);
    };

    const handleZoom = (element: any, value: number) => {
        setZoom(value);
    };

    const showCroppedImage = useCallback(async () => {
        const croppedImage = await getCroppedImg(
            // @ts-ignore
            imageBase64,
            // @ts-ignore
            croppedAreaPixels,
            rotation,
        );
        setImageCropped(croppedImage);
        onCloseCropper();
    }, [croppedAreaPixels, rotation, imageBase64]);

    const renderButtons = () => (
        <ButtonsContainer>
            <UploadNewPhoto data-qa='uploadNewPhoto' onClick={uploadNewPhoto}>
                {translate('Upload a new photo')}
            </UploadNewPhoto>
            <Button
                style={{
                    width: '142px',
                }}
                size='small'
                data-qa='useThisPhoto'
                onClick={showCroppedImage}
            >
                {translate('Save')}
            </Button>
        </ButtonsContainer>
    );

    return (
        <Dialog open={true}>
            <Modal
                closeIcon
                closeIconProps={{ 'data-qa': 'cropper-modal-close' }}
                closeHandler={onCloseCropper}
                isOpen={true}
                scrollMaxHeight='100%'
                actions={[renderButtons()]}
            >
                <Container data-qa='CropperContainer'>
                    <div>
                        <CropperContainer>
                            <CircularFakeCropper />
                            <InfoMessageCropper>
                                <img
                                    style={{
                                        marginRight: '5px',
                                    }}
                                    src={customDragIcon}
                                    alt='drag your photo'
                                />
                                {translate('Drag to reposition')}
                            </InfoMessageCropper>
                            <Crop
                                crop={crop}
                                cropSize={{
                                    width: 240,
                                    height: 321,
                                }}
                                // @ts-ignore
                                image={imageBase64}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onRotationChange={setRotation}
                                onZoomChange={setZoom}
                                restrictPosition={false}
                                rotation={rotation}
                                showGrid={false}
                                zoom={zoom}
                            />
                        </CropperContainer>
                        <CropperControls>
                            <img
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={handleRotate}
                                src={rotateIcon}
                                alt='rotate profile image to right 90 degrees'
                                data-qa='rotate-button-image-cropper'
                            />
                            <HorizontalDivider />
                            <img
                                style={{
                                    marginRight: '14px',
                                }}
                                src={customImgIcon}
                                alt='zoom image to small'
                            />
                            <Slider
                                value={zoom}
                                // @ts-ignore
                                onChange={handleZoom}
                                min={0.21}
                                max={3}
                                step={0.1}
                                sx={stylesCustomSlider}
                            />
                            <img
                                style={{
                                    height: '24px',
                                    width: '24px',
                                    marginLeft: '14px',
                                }}
                                src={customImgIcon}
                                alt='zoom image to large'
                            />
                        </CropperControls>
                    </div>
                </Container>
            </Modal>
        </Dialog>
    );
};
