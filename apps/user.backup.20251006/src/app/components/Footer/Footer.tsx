import RmaFirstAdress from '@npm_leadtech/cv-lib-app-config/src/assets/rma/images/address/01.svg';
import RmaSecondAdress from '@npm_leadtech/cv-lib-app-config/src/assets/rma/images/address/02.svg';
import RmaThirdAdress from '@npm_leadtech/cv-lib-app-config/src/assets/rma/images/address/03.svg';
import translate from 'counterpart';
import React from 'react';

import { APP_CONFIG } from '../../config/appConfig';
import FirstAdress from './images/address1.svg';
import SecondAdress from './images/address2.svg';
import ThirdAdress from './images/address3.svg';
import { StyledFooterDiv, StyledLinks } from './styles';

const renderAddress = () => {
    const { assets } = APP_CONFIG;

    if (assets === 'rin') {
        return (
            <div data-qa='text-address'>
                {'Lead Career S.L. Avinguda Litoral 12 - 5ª planta; 08005, Barcelona, España'}
            </div>
        );
    }

    // This is crap, we need to move this to settings-based
    if (assets === 'rma' || assets === 'rgt') {
        return (
            <div className='address'>
                <img src={RmaFirstAdress} data-qa='image-address' className='image-address' />
                <img src={RmaSecondAdress} data-qa='image-address' className='image-address' />
                <img src={RmaThirdAdress} data-qa='image-address' className='image-address' />
            </div>
        );
    }

    return (
        <div className='address'>
            <img src={FirstAdress} data-qa='image-address' className='image-address' />
            <img src={SecondAdress} data-qa='image-address' className='image-address' />
            <img src={ThirdAdress} data-qa='image-address' className='image-address' />
        </div>
    );
};

export const Footer = () => {
    const { domain, privacyPolicyUrl, termsOfUseUrl, contactUrl } = APP_CONFIG;

    const linkTerms = `//www.${domain}${termsOfUseUrl}`;
    const linkPrivacy = `//www.${domain}${privacyPolicyUrl}`;
    const linkContactUs = `//www.${domain}${contactUrl}`;

    return (
        <StyledFooterDiv>
            <StyledLinks className='links' style={{ display: 'flex' }}>
                <a href={linkTerms} className='qa-link-terms' target='_blank' data-qa='terms-and-conditions-link'>
                    {translate('Terms & Conditions')}
                </a>
                <a href={linkPrivacy} className='qa-link-terms' target='_blank' data-qa='privacy-policy-link'>
                    {translate('Privacy Policy')}
                </a>
                <a href={linkContactUs} className='qa-link-contact' target='_blank' data-qa='contact-us-link'>
                    {translate('Contact Us')}
                </a>
            </StyledLinks>
            {renderAddress()}
        </StyledFooterDiv>
    );
};
