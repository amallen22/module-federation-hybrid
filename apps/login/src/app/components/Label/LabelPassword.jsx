import React from 'react';
import { TextField } from '@npm_leadtech/cv-lib-app-components';

import { withLoginComponent } from '../../hoc/withLoginComponent';
import { TextFieldWrapper } from './styles';

class LabelPassword extends React.Component {

    constructor (props) {
        super(props);
    }

    componentDidMount(){
        this.props.setRenderedComponent({
            name: this.props.nodeName,
            node: document.getElementById(this.props.idLabel)
        });
    }

    render () {
        return (
            <TextFieldWrapper>
                <TextField
                    data-qa="signin-modal-password-input"
                    name={ this.props.inputName }
                    id={ this.props.idLabel }
                    label={this.props.labelContent}
                    variant='dark'
                    isPassword
                    onChange={this.props.onChange}
                    InputProps={{
                        autoComplete: 'current-password'
                    }}
                />
            </TextFieldWrapper>
        );

    }

}


const EnhancedLabelPassword = withLoginComponent(LabelPassword);

export { EnhancedLabelPassword as LabelPassword };
