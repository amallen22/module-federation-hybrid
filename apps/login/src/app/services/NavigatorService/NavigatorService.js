export class NavigatorService {
    constructor (location) {
        this.location = location; // window.location or Location, or another object that implements the interface
    }

    navigateTo () {
        throw new Error('Interface only. Implement this method in a subclass.');
    }

}
