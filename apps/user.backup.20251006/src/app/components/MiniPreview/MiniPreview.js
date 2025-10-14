import { Spinner } from '@npm_leadtech/cv-lib-app-components';
import React from 'react';

import { Wrapper } from './styles';

const MiniPreview = ({ thumbnail, loading }) => {
    if (loading) {
        return (
            <Wrapper>
                <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                    <Spinner data-qa='mini-preview-loading' color='neutral' />
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div style={{ width: '100%' }}>
                <img
                    style={{ minWidth: '100%', minHeight: '100%', flexShrink: 0 }}
                    src={thumbnail}
                    data-qa={'mini-preview-image'}
                />
            </div>
        </Wrapper>
    );
};

export default { MiniPreview };
