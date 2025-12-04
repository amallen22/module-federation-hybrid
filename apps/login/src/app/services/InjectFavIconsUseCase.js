export class InjectFavIconsUseCase {

    constructor ({ localizationDataStore }) {

        this.assetsDir = localizationDataStore.assets;

    }
    
    invoke () {

        this.injectManifest();
        this.injectFavIcon();
        this.injectMsIcons();
        this.injectAndroidIcons();
        this.injectAppleIcons();

    }

    injectManifest () {

        let link = document.createElement('link');

        link.href = `/${this.assetsDir}/manifest.json`;
        link.rel = 'manifest';
        document.head.appendChild(link);

    }

    injectFavIcon () {

        this.injectIcon({
            rel: 'shortcut icon',
            fileName: 'favicon.ico'
        });

    }

    injectMsIcons () {

        // eslint-disable-next-line no-unused-vars
        for (let res of [70, 144, 150, 310]) {
            this.injectIcon({
                rel: 'icon',
                fileName: `ms-icon-${res}x${res}.png`
            });
        }

    }

    injectAndroidIcons () {

        // eslint-disable-next-line no-unused-vars
        for (let res of [36, 48, 72, 96, 144, 192]) {
            this.injectIcon({
                rel: 'icon',
                fileName: `android-icon-${res}x${res}.png`
            });
        }

    }

    injectAppleIcons () {

        // eslint-disable-next-line no-unused-vars
        for (let res of [57, 60, 72, 76, 114, 120, 144, 152, 180]) {
            let sizes = `${res}x${res}`;

            this.injectIcon({
                rel: 'apple-touch-icon',
                sizes: sizes,
                fileName: `apple-icon-${sizes}.png`
            });
        }
        this.injectIcon({
            rel: 'apple-touch-icon',
            fileName: 'apple-icon.png'
        });
        this.injectIcon({
            rel: 'apple-touch-icon',
            fileName: 'apple-icon-precomposed.png'
        });

    }

    injectIcon ({ rel, fileName, sizes }) {

        let link = document.createElement('link');

        link.rel = rel;
        link.href = `/${this.assetsDir}/images/favicons/${fileName}`;

        if (sizes) {
            link.sizes = sizes;
        }
        document.head.appendChild(link);

    }

}