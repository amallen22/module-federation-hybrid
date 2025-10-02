import React from 'react';
import ContentLoader from 'react-content-loader';

const Loading = (props: any) => (
    <ContentLoader speed={2} viewBox='0 0 583 445' backgroundColor='#f3f3f3' foregroundColor='#ecebeb' {...props}>
        <rect x='6' y='10' rx='0' ry='0' width='564' height='143' />
        <rect x='6' y='266' rx='0' ry='0' width='511' height='18' />
        <rect x='6' y='227' rx='0' ry='0' width='149' height='18' />
        <rect x='6' y='305' rx='0' ry='0' width='560' height='104' />
    </ContentLoader>
);

export { Loading };
