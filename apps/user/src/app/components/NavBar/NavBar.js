import './navbar.scss';

import classNames from 'classnames';
import React from 'react';

import { Visibility } from '../Visibility/Visibility';
import { Logo } from './Logo';
import { Menu } from './Menu';

export class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
        };
    }

    handleClick = () => {
        const showMenu = !this.state.showMenu;
        this.setState({ showMenu });
    };

    getMenuItems = (menuKey) => {
        const { config } = this.props;
        if (config['menuKey'] === menuKey) return config.menuItems;
        else {
            return [];
        }
    };

    getSubmenuItems = (subMenuKey) => {
        const { config } = this.props;
        const menuItems = config.menuItems.find((item) => {
            return item.key === subMenuKey;
        });
        return menuItems.subMenuItems;
    };

    render() {
        const { currentLocation, config, isSubMenu, subMenuKey, menuKey } = this.props;
        const backdropClassName = classNames(
            'backdrop',
            { 'visible': this.state.showMenu },
            { 'hidden': !this.state.showMenu },
        );

        const menuItems = isSubMenu ? this.getSubmenuItems(subMenuKey) : this.getMenuItems(menuKey);

        menuItems.forEach((item) => {
            if (item.submenu) item.handleClick = item.handleSubMenu;
            else if (item.onClick) {
                item.handleClick = () => item.onClick(item.key);
            } else {
                item.handleClick = this.handleClick;
            }
        });

        return (
            <div className='navbar' data-qa='navbar'>
                <div className='container'>
                    <Visibility show={!!config.menuItems}>
                        <button className='burguer' data-qa='burguer' onClick={this.handleClick}>
                            {config.menuButtonImage}
                        </button>
                    </Visibility>

                    <Logo {...config.logo} />
                </div>

                <Menu.Menu show={this.state.showMenu} menuItems={menuItems} currentLocation={currentLocation} />

                <Visibility show={!!config.menuItems}>
                    <div className={backdropClassName} onClick={this.handleClick} />
                </Visibility>
            </div>
        );
    }
}
