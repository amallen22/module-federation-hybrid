import { APP_CONFIG } from '../config/appConfig';
import { DocumentTypeEnum } from '../models/documents';

const getUrlDocType = ({ documentType }: { documentType: string }) => {
    if (documentType === DocumentTypeEnum.CoverLetter) {
        return 'letter';
    }

    if (APP_CONFIG.assets === 'rch' || APP_CONFIG.assets === 'rgt' || APP_CONFIG.assets === 'rma') {
        return 'resume';
    }

    return 'cv';
};

export default getUrlDocType;
