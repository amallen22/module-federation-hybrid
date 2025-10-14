import classNames from 'classnames';
import React from 'react';

import { DropdownItem } from './DropdownItem';

export const Menu = (props) => {
    const { show, menuItems, currentLocation, dropdownHeader, dropdownFooter } = props;

    if (!Array.isArray(menuItems) || menuItems.length === 0) {
        return null;
    }

    const menuClassName = classNames('menu', {
        'visible': show,
        'hidden': !show,
    });

    const Items = () =>
        menuItems.map((itemProps) => {
            return (
                <DropdownItem
                    {...itemProps}
                    key={Math.random()}
                    currentLocation={currentLocation}
                    closeMenu={itemProps.handleClick}
                />
            );
        });

    function renderDropdownHeader() {
        if (!dropdownHeader) return;

        return dropdownHeader;
    }

    function renderDropdownFooter() {
        if (!dropdownFooter) return;

        return dropdownFooter;
    }

    return (
        <div className={menuClassName} data-qa='menu'>
            {renderDropdownHeader()}
            <ul className='items'>{Items()}</ul>
            {renderDropdownFooter()}
        </div>
    );
};
