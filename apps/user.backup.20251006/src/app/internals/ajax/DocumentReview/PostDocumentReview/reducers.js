import translate from 'counterpart';

export class GetDocumentPdfReducer {
    constructor(fileName) {
        if (!fileName || !fileName.trim()) {
            fileName = translate('Document untitled');
        }
        this.fileName = fileName.replace(/\s/g, '-') + '.pdf';
    }

    reduce(res) {
        if (!res || res.status !== 200) {
            throw new Error('Status is not 200.');
        }

        let type = 'application/pdf';
        let blob = new Blob([res.body], { type: type });

        if (window.navigator.msSaveBlob !== undefined) {
            // IE workaround for 'HTML7007: One or more blob URLs were revoked by closing the blob for which they were
            // created. These URLs will no longer resolve as the data backing the URL has been freed'
            window.navigator.msSaveBlob(blob, this.fileName);
        } else {
            const URL = window.URL || window.webkitURL;
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');

            // Safari doesn't support this yet
            if (a.download === undefined) {
                window.location = downloadUrl;
            } else {
                a.href = downloadUrl;
                a.download = this.fileName;
                document.body.appendChild(a);
                a.click();
            }

            setTimeout(function () {
                URL.revokeObjectURL(downloadUrl);
            }, 100); // cleanup
        }
    }
}
