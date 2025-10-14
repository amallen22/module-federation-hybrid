export const documentTypeHelper = (docType: string) => {
    const documentType = docType === 'cv' || docType === 'resume' ? 'resume' : 'letter';
    const documentTypeFullName = documentType === 'resume' ? 'resume' : 'cover letter';
    const documentTypeFullNamePlural = `${documentTypeFullName}s`;

    return { documentType, documentTypeFullName, documentTypeFullNamePlural };
};
