
export const trackAppInstalls = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('beforeinstallprompt', onBeforeInstall);
        try {
            navigator.serviceWorker.register('/serviceWorker.js').then(
                (_registration) => {
                    // eslint-disable-next-line no-console
                    console.log('Service worker registration succeeded:');
                },
                (error) => {
                    // eslint-disable-next-line no-console
                    console.error(`Service worker registration failed: ${error}`);
                },
            );
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(`Service worker unexpected error: ${error}`);
        }
    }
};


const onBeforeInstall = e => {
    retryUntilGaLoaded('gtm1.send', 'event', 'Sign up', 'Install prompt', 'Show', { nonInteraction: true });

    e.userChoice.then(({ outcome }) => {
        retryUntilGaLoaded('gtm1.send', 'event', 'Sign up', 'Install prompt', outcome);
    });
};

const retryUntilGaLoaded = (...gaParams) => {
    const intervalId = setInterval(() => {
        if ('ga' in window) {
            // eslint-disable-next-line no-undef
            ga(...gaParams);
            clearInterval(intervalId);
        }
    }, 3000);
};
