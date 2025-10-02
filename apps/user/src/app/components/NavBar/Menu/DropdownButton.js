import classNames from 'classnames';
import React from 'react';

import { withOutsideClickHandler } from '../../../hoc/withOutsideClickhandler';
import { Dropdown } from './Dropdown';

class DropdownButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false,
        };
    }

    handleDropdownVisibility = () => {
        this.props.startListenOutsideClicks({
            callback: this.handleOutsideClicks,
        });

        const showDropdown = !this.state.showDropdown;
        this.setState({ showDropdown });
    };

    handleOutsideClicks = () => {
        this.setState({ showDropdown: false });
        this.props.stopListenOutsideClicks();
    };

    render() {
        const { text, content, customItem, currentLocation, closeMenu, dropdownProps } = this.props;
        const buttonContent = text || customItem;
        const dropdownButtonClassName = classNames(
            'dropdownbutton',
            { 'opened': this.state.showDropdown },
            { 'closed': !this.state.showDropdown },
        );

        return (
            <div className='wrapper container'>
                <button className={dropdownButtonClassName} {...dropdownProps} onClick={this.handleDropdownVisibility}>
                    {buttonContent}
                </button>
                <Dropdown
                    show={this.state.showDropdown}
                    content={content}
                    currentLocation={currentLocation}
                    closeMenu={closeMenu}
                />
            </div>
        );
    }
}

const DropdownButtonWithOutsideClickHandler = withOutsideClickHandler(DropdownButton);

export { DropdownButtonWithOutsideClickHandler as DropdownButton };
