import classNames from 'classnames';
import React from 'react';

import { DropdownMenu } from './DropdownMenu';

export const Dropdown = (props) => {
    const { show, content, currentLocation, closeMenu } = props;

    const dropdownClassName = classNames('dropdown', { visible: show }, { hidden: !show });

    return (
        <div className={dropdownClassName} data-qa='dropdown'>
            <DropdownMenu show={true} menuItems={content} currentLocation={currentLocation} closeMenu={closeMenu} />
        </div>
    );
};
