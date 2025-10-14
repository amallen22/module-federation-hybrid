import React from 'react';

class SignOut extends React.Component {

    constructor () {
        super();
    }

    signOut () {
        this.props.onSuccess();
    }

    componentDidMount () {
        this.signOut();
    }

    render () {
        return null;
    }

}

export default SignOut;
