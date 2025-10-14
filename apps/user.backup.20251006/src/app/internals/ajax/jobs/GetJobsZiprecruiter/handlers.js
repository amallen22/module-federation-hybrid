import { CvAjaxHandler } from '../../../../services/CvAjaxHandler';
import endpointDefinition from './api.json';
import { GetJobsZipRecruiterAjaxReducer } from './reducers';

export class GetJobsZiprecruiterAjaxHandler extends CvAjaxHandler {
    constructor() {
        super({
            endpointDefinition,
            reducer: GetJobsZipRecruiterAjaxReducer,
        });
    }
}
