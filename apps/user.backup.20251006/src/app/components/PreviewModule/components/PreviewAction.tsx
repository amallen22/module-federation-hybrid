import translate from 'counterpart';
import React from 'react';

import {
    PreviewActionContainer,
    PreviewActionIcon,
    PreviewActionText,
    PreviewCreateActionContainer,
    PreviewDeleteActionContainer,
} from './styles';

type PreviewActionProps = {
    action: (_event: any) => void;
    disabled?: boolean;
    icon: string;
    text: string;
    hideInDesktop?: boolean;
    hideInMobile?: boolean;
    dataQa: string;
    warning?: boolean;
};

export const PreviewAction = ({
    action,
    disabled,
    icon,
    text,
    hideInDesktop,
    hideInMobile,
    dataQa,
    warning,
}: PreviewActionProps) => {
    return (
        <PreviewActionContainer
            disabled={disabled}
            onClick={action}
            hideInDesktop={hideInDesktop}
            hideInMobile={hideInMobile}
            data-qa={dataQa}
            warning={warning}
        >
            <PreviewActionIcon src={icon} />
            <PreviewActionText>{translate(text)}</PreviewActionText>
        </PreviewActionContainer>
    );
};

export const PreviewCreateAction = (props: PreviewActionProps) => (
    <PreviewCreateActionContainer>
        <PreviewAction {...props} />
    </PreviewCreateActionContainer>
);

export const PreviewDeleteAction = (props: PreviewActionProps) => (
    <PreviewDeleteActionContainer>
        <PreviewAction {...props} warning={true} />
    </PreviewDeleteActionContainer>
);
