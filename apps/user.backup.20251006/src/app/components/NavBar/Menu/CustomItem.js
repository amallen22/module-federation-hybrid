import classNames from 'classnames';
import React from 'react';

import { LocationChecker } from '../LocationChecker';

export const CustomItem = (props) => {
    const { closeMenu, locationRegExp, customItem, currentLocation } = props;
    const locationChecker = new LocationChecker({ locationRegExp });
    const wrapperClassName = classNames('wrapper', {
        'current': locationChecker.isCurrentLocation(currentLocation),
    });

    return (
        <div className={wrapperClassName} onClick={closeMenu}>
            {customItem}
        </div>
    );
};
