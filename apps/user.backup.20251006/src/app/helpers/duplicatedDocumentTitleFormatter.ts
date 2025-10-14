export const duplicatedDocumentTitleFormatter = ({ documentTitle }: { documentTitle: string }) => {
    let docTitle = documentTitle;
    const regExp = /\(([^)]+)\)/g;
    const matches = regExp.exec(docTitle);

    if (matches) {
        docTitle = docTitle.replace(` ${matches[0]}`, '');
        docTitle = `${docTitle} (${+matches[1] + 1})`;
    } else {
        docTitle = `${docTitle} (1)`;
    }

    return docTitle;
};
