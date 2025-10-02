import classNames from 'classnames';
import React from 'react';

import { CustomItem } from './CustomItem';

export const DropdownMenu = (props) => {
    const { show, menuItems, currentLocation, closeMenu } = props;

    if (!Array.isArray(menuItems) || menuItems.length === 0) {
        return null;
    }

    const menuClassName = classNames('menu', { visible: show, hidden: !show });

    const Items = () =>
        menuItems.map((itemProps) => {
            return (
                <li className='item' key={Math.random()}>
                    <CustomItem {...itemProps} currentLocation={currentLocation} closeMenu={closeMenu} />
                </li>
            );
        });

    return (
        <div className={menuClassName} data-qa='menu'>
            <ul className='items'>{Items()}</ul>
        </div>
    );
};
