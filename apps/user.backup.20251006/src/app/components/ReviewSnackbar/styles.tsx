import styled from '@emotion/styled';

export const Background = styled.img`
    width: 308px;
    object-fit: cover;
    object-position: top;
    height: 250px;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
`;

export const ToastContainer = styled.div`
    .cv-toast {
        border: 1px solid #00b786;
        border-left: 4px solid #00b786;
        border-radius: 0;
        box-shadow: none;
        margin-bottom: 0;
    }
`;

export const Text = styled.span`
    font-size: 14px;
    font-weight: 700;
    color: #3d4042;
`;

export const Link = styled.span`
    font-size: 14px;
    margin-left: 4px;
    text-decoration: underline;
    color: #3d4042;
    &:hover {
        cursor: pointer;
        font-weight: 700;
    }
`;
