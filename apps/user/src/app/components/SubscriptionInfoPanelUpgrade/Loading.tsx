import React from 'react';
import ContentLoader from 'react-content-loader';

const Loading = (props: any) => (
    <ContentLoader
        speed={2}
        width={583}
        height={445}
        viewBox='0 0 583 445'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
        {...props}
    >
        <rect x='6' y='10' rx='0' ry='0' width='138' height='20' />
        <rect x='6' y='47' rx='0' ry='0' width='153' height='48' />
        <rect x='413' y='10' rx='22' ry='22' width='166' height='34' />
        <rect x='427' y='56' rx='0' ry='0' width='144' height='20' />
        <rect x='6' y='164' rx='0' ry='0' width='292' height='24' />
        <rect x='6' y='216' rx='0' ry='0' width='292' height='24' />
        <rect x='6' y='264' rx='0' ry='0' width='292' height='24' />
        <rect x='6' y='312' rx='0' ry='0' width='292' height='24' />
    </ContentLoader>
);

export { Loading };
