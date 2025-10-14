import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;
    width: 308px;
    display: flex;
    align-items: center;
    justify-content: center;
    order: 1;

    div:nth-of-type(1) {
        top: 10px;
        left: 80px;
    }

    div:nth-of-type(2) {
        top: 85px;
        left: 220px;
    }
    div:nth-of-type(3) {
        top: 160px;
        left: 170px;
    }
    div:nth-of-type(4) {
        top: 160px;
        right: 170px;
    }
    div:nth-of-type(5) {
        top: 85px;
        right: 220px;
    }

    @media only screen and (max-width: 730px) {
        order: 4;
        div:nth-of-type(1) {
            top: 10px;
            left: 90px;
        }

        div:nth-of-type(2) {
            top: 110px;
            left: 90px;
        }
        div:nth-of-type(3) {
            top: 210px;
            left: 90px;
        }
        div:nth-of-type(4) {
            top: 60px;
            right: 90px;
        }
        div:nth-of-type(5) {
            top: 160px;
            right: 90px;
        }
    }

    @media only screen and (max-width: 470px) {
        order: 4;
        div:nth-of-type(1) {
            top: 10px;
            left: 110px;
        }

        div:nth-of-type(2) {
            top: 110px;
            left: 110px;
        }
        div:nth-of-type(3) {
            top: 210px;
            left: 110px;
        }
        div:nth-of-type(4) {
            top: 60px;
            right: 110px;
        }
        div:nth-of-type(5) {
            top: 160px;
            right: 110px;
        }
    }
`;

export const Background = styled.img`
    width: 308px;
    object-fit: cover;
    object-position: top;
    height: 250px;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));

    @media only screen and (max-width: 430px) {
        width: 302px;
    }
`;
