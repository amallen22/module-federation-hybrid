import translate from 'counterpart';
import React from 'react';

import { APP_CONFIG } from '../../../config/appConfig';
import { Feed, FeedDescription, FeedPanel, FeedTitle } from './styles';

interface Entry {
    description: string;
    link: string;
    title: string;
}

interface Entries {
    entries: Array<Entry>;
}

interface Props {
    feed: Entries | undefined;
}

const RecommendedReadings = ({ feed }: Props) => {
    const { assets } = APP_CONFIG;

    if (assets === 'rma') {
        return null;
    }

    if (!feed) {
        return null;
    }

    const renderFeed = () => {
        return feed.entries.map((entry: Entry) => (
            <Feed key={entry.title} href={entry.link} target='_blank'>
                <FeedTitle>{entry.title}</FeedTitle>
                <FeedDescription>
                    {entry.description} <span>{translate('Read more')}</span>
                </FeedDescription>
            </Feed>
        ));
    };

    return <FeedPanel>{renderFeed()}</FeedPanel>;
};

export { RecommendedReadings };
