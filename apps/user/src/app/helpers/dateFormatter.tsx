import translate from 'counterpart';

interface SplittedDateTypes {
    day: string;
    hours: string;
    minutes: string;
    monthShort: string;
}

const defaultOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
};

interface DateStringComposerTypes {
    date: Date;
    options?: Intl.DateTimeFormatOptions;
    userLanguage: string;
}
interface dateStringSplitterTypes {
    date?: string;
    userLanguage: string;
}

export const dateStringSplitter = ({ date, userLanguage }: dateStringSplitterTypes): SplittedDateTypes => {
    if (!date) return { day: '0', monthShort: '0', hours: '0', minutes: '0' };

    const newdate = new Date(date);
    const nonASCIIregex = /[^\x00-\x7F]/g;
    const day = dateStringComposer({
        date: newdate,
        options: { day: '2-digit' },
        userLanguage,
    });
    const monthShort = dateStringComposer({
        date: newdate,
        options: { month: 'short' },
        userLanguage,
    });
    const minutes = dateStringComposer({
        date: newdate,
        options: { minute: '2-digit' },
        userLanguage,
    });
    const hours = dateStringComposer({
        date: newdate,
        options: { hour: '2-digit', hour12: false },
        userLanguage,
    }).replace(nonASCIIregex, '');
    const splittedDate: SplittedDateTypes = { day, monthShort, hours, minutes };

    return splittedDate;
};

export const dateStringComposer = ({
    date,
    options = defaultOptions,
    userLanguage,
}: DateStringComposerTypes): string => {
    let composedString = date.toLocaleString(userLanguage, options);
    if (composedString.length < 2) {
        composedString = `0${composedString}`;
    }

    return composedString;
};

export const dateToUpdatedLocale = ({ date, userLanguage }: dateStringSplitterTypes): string => {
    if (!date || !userLanguage) return '';

    const { day, hours, minutes, monthShort } = dateStringSplitter({
        date: date,
        userLanguage,
    });

    return translate('Updated %(monthShort)s %(day)s, %(hours)s:%(minutes)s', {
        day,
        monthShort,
        hours,
        minutes,
    });
};
