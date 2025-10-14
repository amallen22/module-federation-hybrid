import letter from '../components/MyDocuments/Document/img/cover-thumbnail.svg';
import resume from '../components/MyDocuments/Document/img/resume-thumbnail.svg';
import { DocumentTypeEnum } from '../models/documents';

export const getThumbnail = ({
    documentType,
    previewThumbnail,
}: {
    documentType: string;
    previewThumbnail: string | null;
}): string => {
    if (previewThumbnail) {
        return previewThumbnail;
    }
    switch (documentType) {
        case DocumentTypeEnum.Resume:
            return resume;
        case DocumentTypeEnum.CoverLetter:
            return letter;
        default:
            return resume;
    }
};
