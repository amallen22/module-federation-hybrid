export const Visibility = ({ children, show }) => {
    if (typeof show === 'function') {
        show = show();
    }

    return show ? children : null;
};
