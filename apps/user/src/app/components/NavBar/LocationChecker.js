export class LocationChecker {
    constructor(params = {}) {
        this.locationRegExp = params.locationRegExp;
    }

    isCurrentLocation(currentLocation) {
        if (!this.locationRegExp || !currentLocation) {
            return false;
        }

        return new RegExp(this.locationRegExp).test(currentLocation);
    }
}
