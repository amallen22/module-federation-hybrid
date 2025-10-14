import React from 'react';

import { Language } from '../../../../models/language';
import { Flag, LanguageContainer } from './styles';

interface Props {
    languageCode: string;
    languages: Array<Language>;
}

const DocumentLanguageLabel = ({ languageCode, languages }: Props) => {
    if (!languages) {
        return null;
    }

    const language = languages.find((lang: Language) => lang.code === languageCode);

    if (!language) {
        return null;
    }

    const languageDescription = language.description.replace(/ *\([^)]*\) */g, '');

    return (
        <LanguageContainer>
            {languageDescription}
            <Flag src={language.flagIcon} />
        </LanguageContainer>
    );
};
export { DocumentLanguageLabel };
