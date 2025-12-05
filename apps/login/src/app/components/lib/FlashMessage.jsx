import React from 'react';
import translate from 'counterpart';
import parse from 'html-react-parser';

import { FrontLogService } from '../../services/FrontLogService';

class FlashMessage extends React.PureComponent {

    static fallback (message) {

        FrontLogService.logAjaxResponse({ className: 'FlashMessage', funcName: 'fallback', message });

        return translate('An error has occurred. Please introduce a valid email address and password to continue.');

    }

    renderMessage = () => {
        if(!this.props.flashMessage) {
            return null;
        }
        return parse(translate(this.props.flashMessage, { fallback: FlashMessage.fallback }));
    };

    render () {
        if(!this.props.flashMessage){
            return null;
        }
        return (
            <div className='col s12'>
                <div
                    id='FlashMessage'
                    className={ `FlashMessage ${this.props.flashType}` }
                >
                    {this.renderMessage()}
                </div>
            </div>
        );
    }
}


export default FlashMessage;
