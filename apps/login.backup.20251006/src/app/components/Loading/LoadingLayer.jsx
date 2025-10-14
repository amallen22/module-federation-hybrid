import React from 'react';
import styled from '@emotion/styled';
import CircularProgress from '@mui/material/CircularProgress';
import { withStyles } from '@mui/styles';
import { dsmColors } from '@npm_leadtech/cv-lib-app-components';

const StyledLoadingLayer = styled.div`
    z-index: 10000;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 0;
    margin: 0;
    background-color:${dsmColors.colorNeutral100};
`;

const ImgWrapper = styled.div`
    width: 48px;
    height: 48px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`;

const styles = () => ({
    progress: {
        color: '#2298e9',
    },
});


const LoadingLayer = ({ classes }) => (
    <StyledLoadingLayer className='loading-layer'>
        <ImgWrapper>
            <CircularProgress thickness={5} className={classes.progress} />
        </ImgWrapper>
    </StyledLoadingLayer>
);
export default withStyles(styles)(LoadingLayer);
