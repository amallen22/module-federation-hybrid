export enum DocumentTypeEnum {
    // eslint-disable-next-line no-unused-vars
    Resume = 'Resume',
    // eslint-disable-next-line no-unused-vars
    CoverLetter = 'CoverLetter',
}

export type DocumentType = DocumentTypeEnum.Resume | DocumentTypeEnum.CoverLetter;

export interface Document {
    createdAt: string;
    documentId: string;
    documentType: string;
    language: string;
    modifiedAt: string;
    previewThumbnail?: string | null;
    templateId: string;
    title: string;
    token?: string | null;
    accessLevel?: string;
}

export interface Documents {
    documents: Array<Document>;
    documentCount: number;
    documentType: string;
}

export interface DocumentsParams {
    documentType: string;
    'limit'?: number | null;
}

export interface DocumentTitle {
    documentId: string;
    title: string;
}

export interface ShareDocumentParams {
    documentId: string;
    accessLevel: string;
}

export interface CreateDocumentParams {
    documentType: string;
    templateId: string;
    previewOrderId: string;
}

export interface DuplicateDocumentParams {
    documentId: string;
    previewOrderId: string;
    clonedDocumentTitle: string;
}

export interface ManageDocuments {
    groupPermission?: string | null;
}

export interface DocumentsState {
    loadingResumes: boolean;
    loadingLetters: boolean;
    resumes: Document[];
    resumeCount: number;
    letters: Document[];
    letterCount: number;
    error: string | null;
}
