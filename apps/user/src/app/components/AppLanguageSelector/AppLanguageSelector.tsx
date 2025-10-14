import { analyticsClient, AnalyticsClientEnum, AnalyticsEvent } from '@npm_leadtech/cv-lib-app-analytics';
import { InitialLoading, useMobile } from '@npm_leadtech/cv-lib-app-components';
import StorePackage from '@npm_leadtech/cv-storage-js';
import { LanguageSelector, OptionItem } from '@npm_leadtech/cv-ui-kit';
import React, { useEffect, useRef, useState } from 'react';

import { setCategoryAttr } from '../../helpers/setCategoryAttr';
import { Language } from '../../models/language';
import { apiService } from '../../services/ApiService';
import { FrontLogService } from '../../services/FrontLogService';
import { SetLanguage } from '../../services/SetupTranslations';
import { LanguageList, LanguageListContainer, LanguageSelectorContainer } from './styles';

interface Props {
    languages?: Language[];
    languagesLoaded: boolean;
}

export const AppLanguageSelector = ({ languages, languagesLoaded }: Props) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { isMobile } = useMobile();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const cookiesStorage = StorePackage.StorageManager();

    const handleClickOutside = (event: MouseEvent) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const getCurrentLanguage = () => {
        try {
            const cookieValue = cookiesStorage.getCookie('cv_session_store');

            if (!cookieValue) return 'en-US';

            return JSON.parse(cookieValue).language || 'en-US';
        } catch (err: any) {
            FrontLogService.logAjaxResponse({
                className: 'cookiesStorage.getCookie',
                funcName: 'getCurrentLanguage',
                err,
            });

            return 'en-US';
        }
    };

    useEffect(() => {
        if (getCurrentLanguage() === 'ca-ES') {
            handleChange('en-US');
        }
    }, []);

    const handleChange = async (userLanguage?: string) => {
        if (!userLanguage) return;

        try {
            setIsLoading(true);

            await Promise.all([SetLanguage(userLanguage), apiService.putUserInfo({ userLanguage })]);

            const { cookie } = await apiService.getVisitor(userLanguage);
            const cookieValue = cookie.replace('cv_session_store=', '');
            const plainCookieValue = atob(cookieValue);
            const hostname = window.location.hostname;

            cookiesStorage.setCookie(
                'cv_session_store',
                plainCookieValue,
                undefined,
                hostname.slice(hostname.indexOf('.')),
            );

            analyticsClient.sendAnalyticsEvent(
                AnalyticsEvent.InterfaceLanguage,
                { interface_language: userLanguage },
                [AnalyticsClientEnum.Amplitude, AnalyticsClientEnum.GA4]
            );

        } catch (err: any) {
            FrontLogService.logAjaxResponse({
                className: 'GetLanguageHandler',
                funcName: 'handleChange',
                err,
            });
        } finally {
            window.location.reload();
        }
    };

    const toggleOpen = () => {
        setIsOpen((prevState) => !prevState);
    };

    if (!languages) {
        return null;
    }

    const getSelectedLanguage = () => {
        try {
            const cookieValue = cookiesStorage.getCookie('cv_session_store');

            if (!cookieValue) return 'en-US';

            const languageCode = JSON.parse(cookieValue).language;

            return languages.find((lang) => lang.code === languageCode)?.code || 'en-US';
        } catch (err: any) {
            FrontLogService.logAjaxResponse({
                className: 'cookiesStorage.getCookie',
                funcName: 'getSelectedLanguage',
                err,
            });

            return 'en-US';
        }
    };

    if (isLoading || !languagesLoaded) {
        return (
            <div className="cv-initial-loading">
                <InitialLoading />
            </div>
        );
    }

    return (
        <LanguageSelectorContainer data-qa="dropdown-languages" ref={buttonRef}>
            <LanguageSelector
                isActive={isOpen}
                onClick={toggleOpen}
                label={getSelectedLanguage()}
            />
            {isOpen && (
                <LanguageListContainer isMobile={isMobile} ref={containerRef}>
                    <LanguageList isMobile={isMobile}>
                        {languages.map((language) => language.isProfileLanguage && (
                            <OptionItem
                                key={language.code}
                                onClick={() => handleChange(language.code)}
                                data-qa={`user-lang-selection-${language.code}`}
                                data-tm-event-action={`user-lang-selection-${language.code}`}
                                data-tm-event-category={setCategoryAttr()}
                                id={language.code}
                                isActive={language.code === getSelectedLanguage()}
                            >
                                {language.description}
                            </OptionItem>
                        ))}
                    </LanguageList>
                </LanguageListContainer>
            )}
        </LanguageSelectorContainer>
    );
};
