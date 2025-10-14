import translate from 'counterpart';

import { htmlToString } from '../../../helpers/htmlToString';
import { DocumentTypeEnum } from '../../../models/documents';

const hasSomeEditedSection = (section) => {
    if (!section) return false;
    let edited = false;
    for (let i in section) {
        if (section[i].value) edited = true;
    }
    return edited;
};

const formatDocumentTitle = (filename) => {
    let newFilename = filename;

    if (!filename || !filename.trim()) {
        newFilename = translate('Document untitled');
    }

    return newFilename;
};

class HandleTxt {
    constructor({ documentTitle, sections, documentLanguage, docType }) {
        this.documentTitle = formatDocumentTitle(documentTitle);
        this.sections = this.getActiveSections(sections);
        this.docType = docType;
        this.documentLanguage = documentLanguage;
        this.txtContent = '';
        this.currentSection = null;
        this.buildTxt();
        this.downloadTxt();
    }

    getActiveSections = (sections) => {
        return sections._sectionsOrder.reduce(
            (acc, templateTag) => {
                if (sections[templateTag].active) {
                    return {
                        ...acc,
                        [templateTag]: sections[templateTag],
                        _sectionsOrder: [...acc._sectionsOrder, templateTag],
                    };
                }
                return acc;
            },
            { _sectionsOrder: [] },
        );
    };

    renderValue = (field) => {
        if (!field) return '';

        if (!field.value) {
            if (!hasSomeEditedSection(this.currentSection)) return field.placeholder;
            return '';
        }
        if (field.value === 'Present') {
            field.value = translate(field.value, { locale: this.documentLanguage });
        }
        if (field.type !== 'wysiwyg') return field.value;
        return htmlToString(field.value);
    };

    checkInfo = (field) => {
        if (!field || !field.value) {
            return '';
        }
        return `${field.label}: ${field.value} \n`;
    };

    contactInformationSection = () => {
        const { subsections } = this.sections['contact-information'];
        const {
            fields: { firstName, lastName, occupation, email, mailAddress, phone, birthday, nationality, socialMedia },
        } = subsections[0];
        this.currentSection = subsections[0].fields;
        this.txtContent = `---------------------------
${this.renderValue(firstName)} ${this.renderValue(lastName)}
---------------------------
${this.checkInfo(occupation)}${this.checkInfo(nationality)}${this.checkInfo(birthday)}${this.checkInfo(
    mailAddress,
)}${this.checkInfo(phone)}${this.checkInfo(email)}${this.checkInfo(socialMedia)}
        `;
    };

    experienceSection = () => {
        if (!this.sections['work-experience']) {
            return;
        }
        const { subsections, title, customTitle } = this.sections['work-experience'];
        let sectionTitle;
        if (customTitle) {
            sectionTitle = customTitle;
        } else {
            sectionTitle = title;
        }
        this.txtContent += `
//  ${sectionTitle} //
        `;
        subsections.map((subsection) => {
            const {
                fields: { company, description, endDate, startDate, location, title },
            } = subsection;
            this.currentSection = subsection.fields;
            this.txtContent += `
_ ${this.renderValue(title)} _
${this.renderValue(company)}
${this.renderValue(location)}
${this.renderValue(startDate)} - ${this.renderValue(endDate)}
${this.renderValue(description)}
            `;
        });
    };

    educationSection = () => {
        if (!this.sections['education']) {
            return;
        }
        const { subsections, title, customTitle } = this.sections['education'];
        let sectionTitle;
        if (customTitle) {
            sectionTitle = customTitle;
        } else {
            sectionTitle = title;
        }
        this.txtContent += `
//  ${sectionTitle} //
        `;
        subsections.map((subsection) => {
            const {
                fields: { degree, description, startedAt, endedAt, nameSchool, location },
            } = subsection;
            this.currentSection = subsection.fields;
            this.txtContent += `
_ ${this.renderValue(degree)} _
${this.renderValue(nameSchool)}
${this.renderValue(location)}, ${this.renderValue(startedAt)} - ${this.renderValue(endedAt)}
${this.renderValue(description)}
            `;
        });
    };

    languagesSection = () => {
        if (!this.sections['languages']) {
            return;
        }
        const { subsections, title, customTitle } = this.sections['languages'];
        let sectionTitle;
        if (customTitle) {
            sectionTitle = customTitle;
        } else {
            sectionTitle = title;
        }
        this.txtContent += `
//  ${sectionTitle} //
        `;
        subsections.map((subsection) => {
            const { fields } = subsection;
            this.currentSection = fields;
            this.txtContent += `
• ${this.renderValue(fields.language)}, ${this.renderValue(fields.level)} ${
    fields.courseOrCertificate.value ? `(${this.renderValue(fields.courseOrCertificate)})` : ''
}
            `;
        });
    };

    skillsSection = () => {
        if (!this.sections['skills']) {
            return;
        }
        const { subsections, title, customTitle } = this.sections['skills'];
        let sectionTitle;
        if (customTitle) {
            sectionTitle = customTitle;
        } else {
            sectionTitle = title;
        }
        this.txtContent += `
//  ${sectionTitle} //
        `;
        subsections.map((subsection) => {
            const { fields } = subsection;
            this.currentSection = fields;
            this.txtContent += `
• ${this.renderValue(fields.skill)}
            `;
        });
    };

    genericSection = (section) => {
        if (!section) {
            return;
        }
        const { title, subsections, customTitle, templateTag } = section;
        let sectionTitle;
        if (customTitle) {
            sectionTitle = customTitle;
        } else {
            sectionTitle = title;
        }
        this.txtContent += `
//  ${sectionTitle} //
        `;
        subsections.map((subsection) => {
            const { fields } = subsection;
            this.currentSection = fields;
            if (templateTag === 'custom') {
                this.txtContent += `
${fields.title.value}
            `;
            }
            this.txtContent += `
${this.renderValue(fields.description)}
            `;
        });
    };

    coverLetterContactInformation = () => {
        const { subsections } = this.sections['contact-information'];
        const {
            fields: { firstName, lastName, email, address, phone },
        } = subsections[0];
        this.currentSection = subsections[0].fields;
        this.txtContent = `
${this.renderValue(firstName)} ${this.renderValue(lastName)}
${this.renderValue(address)}
${this.renderValue(phone)}
${this.renderValue(email)}
        `;
    };

    coverLetterDate = () => {
        if (!this.sections['date-information']) {
            return;
        }
        const { subsections } = this.sections['date-information'];
        subsections.map((subsection) => {
            const { fields } = subsection;
            this.currentSection = fields;
            this.txtContent += `
${this.renderValue(fields.date)}
            `;
        });
    };

    coverLetterRecipient = () => {
        if (!this.sections['recipient-information']) {
            return;
        }
        const { subsections } = this.sections['recipient-information'];
        const {
            fields: { address, city, company, county, department, firstName, lastName, jobTitle, title, zip },
        } = subsections[0];
        this.currentSection = subsections[0].fields;
        this.txtContent += `
${this.renderValue(title)} ${this.renderValue(firstName)} ${this.renderValue(lastName)}
${this.renderValue(jobTitle)}
${this.renderValue(company)} ${this.renderValue(department)}
${this.renderValue(address)}
${this.renderValue(city)}
${this.renderValue(county)}
${this.renderValue(zip)}
        `;
    };

    coverLetterGreeting = () => {
        if (!this.sections['greeting']) {
            return;
        }
        const { subsections } = this.sections['greeting'];
        const {
            fields: { greeting },
        } = subsections[0];
        this.currentSection = subsections[0].fields;
        this.txtContent += `
${this.renderValue(greeting)}
            `;
    };

    coverLetterBody = () => {
        if (!this.sections['body']) {
            return;
        }
        const { subsections } = this.sections['body'];
        const {
            fields: { body },
        } = subsections[0];
        this.currentSection = subsections[0].fields;
        this.txtContent += `
${this.renderValue(body)}
            `;
    };

    coverLetterSignature = () => {
        if (!this.sections['signature']) {
            return;
        }
        const { subsections } = this.sections['signature'];
        const {
            fields: { signature },
        } = subsections[0];
        this.currentSection = subsections[0].fields;
        this.txtContent += `
${this.renderValue(signature)}

${this.renderValue(this.sections['contact-information'].subsections[0].fields.firstName)} ${this.renderValue(
    this.sections['contact-information'].subsections[0].fields.lastName,
)}
            `;
    };

    buildTxt = () => {
        if (this.docType === DocumentTypeEnum.CoverLetter) {
            this.coverLetterContactInformation();
            this.coverLetterDate();
            this.coverLetterRecipient();
            this.coverLetterGreeting();
            this.coverLetterBody();
            this.coverLetterSignature();
        } else {
            this.contactInformationSection();
            this.genericSection(this.sections['objective']);
            this.experienceSection();
            this.educationSection();
            this.skillsSection();
            this.languagesSection();
            this.genericSection(this.sections['projects']);
            this.genericSection(this.sections['achievements']);
            this.genericSection(this.sections['certifications-n-courses']);
            this.genericSection(this.sections['honors-n-awards']);
            this.genericSection(this.sections['publications']);
            this.genericSection(this.sections['references']);
            this.genericSection(this.sections['custom']);
        }
    };

    downloadTxt = () => {
        const data = new Blob([this.txtContent], { type: 'text/plain' });
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(data, `${this.documentTitle}.txt`);
            return;
        }
        let a = document.createElement('a');
        a.download = `${this.documentTitle}.txt`;
        a.href = URL.createObjectURL(data);
        a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () {
            URL.revokeObjectURL(a.href);
        }, 1500);
    };
}

export { HandleTxt };
