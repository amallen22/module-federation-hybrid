import React from 'react';

import { APP_CONFIG } from '../config/appConfig.js';

const docType = APP_CONFIG.assets === 'ocv' ? 'cv' : 'resume';

export const WithDocType = function(ComponentToRender){
    return class extends React.Component {
        render() {
            if (!ComponentToRender) //If the component has no docType param
            {
                return null;
            }

            return (
                <ComponentToRender
                    docType={ docType }
                    { ...this.props }
                />
            );
        }
    };
};