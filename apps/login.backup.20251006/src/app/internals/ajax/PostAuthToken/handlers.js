import { CvAjaxHandler } from '../CvAjaxHandler';
import endpointDefinition from './api.json';
import { PostAuthTokenReducer } from './reducers';

export class PostAuthTokenHandler extends CvAjaxHandler {

    constructor () {
        super({
            endpointDefinition,
            reducer: PostAuthTokenReducer,
        });
    }

}
