import React from 'react';

export const Logo = (props) => {
    const { customItem, img, link, height, width, dataQa } = props;

    if (!!customItem) {
        return customItem;
    }

    if (!link) {
        return <img data-qa={dataQa} src={img} height={height} width={width} />;
    }

    return (
        <a className='logo' href={link} data-qa={dataQa}>
            <img src={img} height={height} width={width} />
        </a>
    );
};
