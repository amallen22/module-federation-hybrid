import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';

import { BackAnchor } from './styles';

const IconStyles = { width: '24px', height: '24px', cursor: 'pointer' };

interface Props {
    color: string;
    onClick: (_event: any) => void;
}

const BackButton = ({ color, onClick }: Props) => (
    <BackAnchor data-qa='back-button' onClick={onClick}>
        <ArrowBackIcon style={IconStyles} className='image' htmlColor={color} />
    </BackAnchor>
);

export { BackButton };
