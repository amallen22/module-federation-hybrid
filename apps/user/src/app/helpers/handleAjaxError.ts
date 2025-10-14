import { Error } from '../models/error';
import { FrontLogService } from '../services/FrontLogService';

const handleAjaxError = ({ className, funcName, err }: { className: string; funcName: string; err: Error }) => {
    FrontLogService.logAjaxResponse({ className, funcName, err });
};

export default handleAjaxError;
