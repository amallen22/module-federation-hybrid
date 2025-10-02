import { CvAjaxHandler } from '../../../../services/CvAjaxHandler';
import endpointDefinition from './api.json';
import { PostUnsubscriptionAnswerReducer } from './reducers';

export class PostUnsubscriptionAnswerHandler extends CvAjaxHandler {
    constructor() {
        super({
            endpointDefinition,
            reducer: PostUnsubscriptionAnswerReducer,
        });
    }
}
