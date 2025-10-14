
export class AnalyticsLayer {

    constructor () {
        this.ensureDataLayer();
    }

    // Public methods
    set xpLevel (id) {
        this.setField('xpLevel', id);
    }

    // Private, you shouldn't call these

    setField (key, value) {
        window.CV.analyticsLayer[key] = value;
        this.persist(key, value);

    }

    persist (key, value) {
        if (!this.hasStorage) {
            return;
        }
        sessionStorage.setItem(key, value);
    }

    ensureDataLayer () {
        if (!window.CV) {
            window.CV = {};
        }

        if (!window.CV.analyticsLayer) {
            window.CV.analyticsLayer = {};
            if (this.hasStorage) {
                this.mapPersistedToDataLayer('xpLevel');
            }
        }
    }

    mapPersistedToDataLayer (key) {
        const persisted = sessionStorage.getItem(key);
        if (!persisted) {
            return;
        }
        CV.analyticsLayer[key] = persisted;
    }

    get hasStorage () {
        if (typeof this._hasStorage !== 'boolean') {
            try {
                sessionStorage.setItem('__hasStorageCheck__', '__hasStorageCheck__');
                sessionStorage.removeItem('__hasStorageCheck__');
                this._hasStorage = true;
            }
            catch (e) {
                this._hasStorage = false;
            }
        }

        return this._hasStorage;
    }

}
