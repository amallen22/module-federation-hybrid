import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import translate from 'counterpart';
import React, { useState } from 'react';

import IconLocation from './img/icon-location.svg';
import IconTarget from './img/icon-target.svg';
import { FormButton, FormContainer, Input, InputContainer, InputLabel } from './styles';

interface Props {
    onSearchHandler: (_data: { location: string; job: string }) => void;
}

const JobsForm = ({ onSearchHandler }: Props) => {
    const [job, setJob] = useState('');
    const [location, setLocation] = useState('');

    const renderInput = ({
        id,
        label,
        placeholder,
        onChange,
    }: {
        id: string;
        label: string;
        placeholder: string;
        onChange: (_e: string) => void;
    }) => {
        return (
            <InputContainer>
                <img src={id === 'location' ? IconLocation : IconTarget} />
                <InputLabel>{label}</InputLabel>
                <Input
                    type='text'
                    placeholder={placeholder}
                    id={id}
                    name={id}
                    onKeyPress={onKeyPressHandler}
                    onChange={(e) => onChange(e.currentTarget.value)}
                />
            </InputContainer>
        );
    };

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            onClickSubmitHandler();
        }
    };

    const onClickSubmitHandler = () => {
        onSearchHandler({
            job: job,
            location: location,
        });
    };

    return (
        <FormContainer>
            {renderInput({
                id: 'job',
                label: translate('What?'),
                placeholder: translate('Job, industry or business…'),
                onChange: setJob,
            })}
            {renderInput({
                id: 'location',
                label: translate('Where?'),
                placeholder: translate('Town, city, state or country…'),
                onChange: setLocation,
            })}
            <FormButton onClick={onClickSubmitHandler} data-qa='job-search-button'>
                <SearchRoundedIcon />
            </FormButton>
        </FormContainer>
    );
};

export { JobsForm };
