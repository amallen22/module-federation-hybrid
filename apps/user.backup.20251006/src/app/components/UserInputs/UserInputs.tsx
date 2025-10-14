import translate from 'counterpart';
import React from 'react';

import { InputsWrapper, StyledTextField } from './styles';

interface UserName {
    firstName?: string;
    lastName?: string;
}

interface Props {
    userName: UserName;
    setUserName: (_userName: UserName) => void;
    setHasChanges: (_state: boolean) => void;
}

const UserInputs = ({ userName, setUserName, setHasChanges }: Props) => {
    const onChangeFirstName = (e: any) => {
        const value = e.target.value;
        setUserName({ firstName: value, lastName: userName.lastName });
        setHasChanges(true);
    };

    const onChangeLastName = (e: any) => {
        const value = e.target.value;
        setUserName({ firstName: userName.firstName, lastName: value });
        setHasChanges(true);
    };

    return (
        <InputsWrapper>
            <StyledTextField
                defaultValue={userName.firstName}
                value={userName.firstName}
                data-qa='firstName-input'
                label={translate('First name')}
                name='firstName'
                placeholder={translate('First name')}
                onChange={onChangeFirstName}
            />
            <StyledTextField
                defaultValue={userName.lastName}
                value={userName.lastName}
                data-qa='lastName-input'
                label={translate('Last name')}
                name='lastName'
                placeholder={translate('Last name')}
                onChange={onChangeLastName}
            />
        </InputsWrapper>
    );
};

export default UserInputs;
