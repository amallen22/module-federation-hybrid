import React from 'react';

export const useOutsideClickHandler = () => {
    const [callback, setCallback] = React.useState<Function | undefined>(undefined);

    const startListenOutsideClicks = (params: { callback: Function }) => {
        if (!params) {
            return;
        }
        setCallback(params.callback);
        document.addEventListener('click', handleOutsideClick, false);
    };

    const stopListenOutsideClicks = () => {
        document.removeEventListener('click', handleOutsideClick, false);
    };

    const handleOutsideClick = () => {
        if (!callback) {
            return;
        }
        callback();
    };

    return {
        startListenOutsideClicks,
        stopListenOutsideClicks,
    };
};
