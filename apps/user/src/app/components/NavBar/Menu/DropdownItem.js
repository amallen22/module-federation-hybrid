import React from 'react';

import { Item } from './Item';

export const DropdownItem = (props) => {
    const { closeMenu } = props;

    return <Item className='item' closeMenu={closeMenu} {...props} />;
};
