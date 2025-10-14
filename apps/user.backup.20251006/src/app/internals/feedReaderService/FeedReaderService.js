import translate from 'counterpart';

import { APP_CONFIG } from '../../config/appConfig.js';
import feedCover from './feed-cover.json';
import feedCv from './feed-cv.json';

class FeedReaderService {
    constructor({ feedType }) {
        this.feedType = feedType;
    }

    read() {
        if (APP_CONFIG.assets === 'cvw') {
            return;
        }

        if (this.feedType === FeedReaderService.FEED_COVER) {
            return this.readCoverFeed();
        }
        return this.readCvFeed();
    }

    readCvFeed() {
        let locale = APP_CONFIG.locale;
        const localizedLink = feedCv[locale];

        if (!localizedLink) {
            return;
        }

        return {
            entries: [
                {
                    title: translate('How to Write a Resume'),
                    description: translate(
                        'Get the complete guide to resume writing with tips and ideas for what to include and what not to put in your winning resume as well as practical examples.',
                    ),
                    link: `//www.${APP_CONFIG.domain}${localizedLink['How to Write a Resume']}`,
                },
                {
                    title: translate('The Professional Resume'),
                    description: translate(
                        'Create an expert resume for your job search with our guide to writing a professional resume that gives you specialist advice for executive positions and helps to get your career heading in the right direction.',
                    ),
                    link: `//www.${APP_CONFIG.domain}${localizedLink['The Professional Resume']}`,
                },
                {
                    title: translate('Entry-Level Resume Writing'),
                    description: translate(
                        "If you're just getting your foot in the door of the professional world, check out our guide to writing a first resume with recommendations from HR experts for first-time jobseekers.",
                    ),
                    link: `//www.${APP_CONFIG.domain}${localizedLink['Entry-Level Resume Writing']}`,
                },
                {
                    title: translate('Resume Format and Layout Guide'),
                    description: translate(
                        "Don't forget about the importance of a good resume format to give structure to all the crucial information you need to include to complete your efficient job application.",
                    ),
                    link: `//www.${APP_CONFIG.domain}${localizedLink['Resume Format and Layout Guide']}`,
                },
            ],
        };
    }

    readCoverFeed() {
        const locale = translate.getLocale();
        const localizedLink = feedCover[locale];

        if (!localizedLink) {
            return;
        }

        return {
            entries: [
                {
                    title: translate('How to write an effective cover letter'),
                    description: translate(
                        'Discover how to write an effective cover letter with our comprehensive guide including professional tricks of the trade.',
                    ),
                    link: `//www.${APP_CONFIG.domain}${localizedLink['How to write an effective cover letter']}`,
                },
                {
                    title: translate('HR-approved cover letter examples'),
                    description: translate(
                        'Get the best HR-approved cover letter examples so you know what to include and what not to use in your winning cover letter.',
                    ),
                    link: `//www.${APP_CONFIG.domain}${localizedLink['HR-approved cover letter examples']}`,
                },
                {
                    title: translate('How to format a cover letter'),
                    description: translate(
                        'Learn how to format a cover letter so that the relevant information is presented in the right way to convince hiring managers.',
                    ),
                    link: `//www.${APP_CONFIG.domain}${localizedLink['How to format a cover letter']}`,
                },
            ],
        };
    }
}

FeedReaderService.FEED_COVER = Symbol('cover');
FeedReaderService.FEED_CV = Symbol('cv');

export { FeedReaderService };
