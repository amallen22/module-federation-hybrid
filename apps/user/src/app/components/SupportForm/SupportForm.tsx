import { Button, Spinner } from '@npm_leadtech/cv-lib-app-components';
import translate from 'counterpart';
import React, { useEffect, useState } from 'react';

import { apiService } from '../../services/ApiService';
import {
    ButtonContainer,
    Container,
    FlexContainer,
    FormColumn,
    Input,
    Success,
    Textarea,
    Title,
    Warning,
} from './styles';

interface Props {
    firstName?: string;
    lastName?: string;
    email: string;
}

const SupportForm = ({ firstName, lastName, email }: Props) => {
    const [userName, setUserName] = useState<string | null>('');
    const [userEmail, setUserEmail] = useState(email);
    const [reason, setReason] = useState('');
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!firstName && !lastName) return;
        let user = firstName ? firstName : '';
        user = lastName ? `${user} ${lastName}` : user;
        setUserName(user);
    }, [firstName, lastName]);

    const handleSubmit = () => {
        setWarning(false);
        if (!userEmail.length || !userName?.length || !reason.length) {
            setWarning(true);
            return;
        }
        setLoading(true);
        apiService
        .postTechnicalIssue({
            fullName: userName,
            email: userEmail,
            message: reason,
        })
        .then(() => {
            setSuccess(true);
            setLoading(false);
        })
        .catch(() => {
            setWarning(true);
            setLoading(false);
        });
    };

    const renderWarning = () => {
        if (!warning) return null;

        return (
            <Warning data-qa='feedback-error-text'>
                {translate('To better help you, please provide as many relevant details as you can.')}
            </Warning>
        );
    };

    const renderSuccessfulMessage = () => {
        if (!success) return null;

        return (
            <Success data-qa='feedback-received-text'>
                {translate(
                    "Feedback received! Please allow for some time before canceling your account. If we're not able to fix your issue, we will help you cancel your account, hassle-free.",
                )}
            </Success>
        );
    };

    const renderForm = () => {
        if (success) return null;

        if (loading) {
            return (
                <div data-qa="support-form-loader">
                    <Spinner color='blue' />
                </div>
            );
        }

        return (
            <>
                <FlexContainer>
                    <FormColumn>
                        <Title>{translate('Contact details')}</Title>
                        <Input
                            type='text'
                            placeholder={translate('Name')}
                            // @ts-ignore
                            defaultValue={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <Input
                            type='email'
                            placeholder={translate('Email')}
                            defaultValue={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </FormColumn>
                    <FormColumn>
                        <Title>{translate('Tell us what went wrong')}</Title>
                        <Textarea
                            placeholder={translate('Describe the issue here')}
                            rows={4}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            data-qa='description'
                        />
                    </FormColumn>
                </FlexContainer>
                <ButtonContainer>
                    {renderWarning()}
                    <Button data-qa='submit-reason' onClick={handleSubmit}>
                        {translate('SUBMIT')}
                    </Button>
                </ButtonContainer>
            </>
        );
    };

    return (
        <Container>
            {renderForm()}
            {renderSuccessfulMessage()}
        </Container>
    );
};

export default SupportForm;
