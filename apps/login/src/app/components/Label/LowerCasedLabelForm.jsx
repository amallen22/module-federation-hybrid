import React from 'react';
import { TextField } from '@npm_leadtech/cv-lib-app-components';

import { withLoginComponent } from '../../hoc/withLoginComponent';
import { TextFieldWrapper } from './styles';

class LowerCasedLabelForm extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            value: this.props.prefilledEmail || '',
            condition: true
        };
    }

    componentDidMount(){
        this.props.setRenderedComponent({
            name: this.props.nodeName,
            node: document.getElementById(this.props.idLabel)
        });
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value.toLowerCase() });
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };

    render () {
        return (
            <TextFieldWrapper>
                <TextField
                    data-qa="signin-modal-email-input"
                    name={ this.props.inputName }
                    id={ this.props.idLabel }
                    label={this.props.labelContent}
                    value={ this.state.value }
                    variant='dark'
                    onChange={this.handleChange}
                    InputProps={{
                        autoComplete: 'current-email'
                    }}
                />
            </TextFieldWrapper>
        );
    }
}

const EnhancedLowerCasedLabelForm = withLoginComponent(LowerCasedLabelForm);

export { EnhancedLowerCasedLabelForm as LowerCasedLabelForm };