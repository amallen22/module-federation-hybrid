import React from 'react';

import { CustomItem } from './CustomItem';
import { DropdownButton } from './DropdownButton';

export const Item = (props) => {
    const { content, closeMenu } = props;
    let ItemToRender;

    if (!!content) {
        ItemToRender = <DropdownButton closeMenu={closeMenu} {...props} />;
    } else {
        ItemToRender = <CustomItem closeMenu={closeMenu} {...props} />;
    }

    return <li className='item'>{ItemToRender}</li>;
};
