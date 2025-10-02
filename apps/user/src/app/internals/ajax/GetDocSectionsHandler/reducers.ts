import { APP_CONFIG } from '../../../config/appConfig';
import { Field, Fields, Section, Sections } from '../../../models/sections';

const isAsian = APP_CONFIG.assets === 'tji' || APP_CONFIG.assets === 'trk';

interface BodyResponse<T = any> {
    body: T;
}

export class GetSectionsReducer {
    constructor() {}

    reduce(data: BodyResponse<{ sections: any }>) {
        const _sections = data.body.sections;
        const formattedSections: any = {};
        formattedSections._sectionsOrder = [];

        _sections.forEach((section: Section) => {
            section.subsections.forEach((subsection) => {
                const fields: Fields = {};

                subsection.fields.forEach((field: Field) => {
                    if (field.type === 'textarea') {
                        field.type = 'wysiwyg';
                    }

                    if (field.templateTag === 'mailAddress' && !isAsian) {
                        field.type = 'address';
                    }

                    fields[field.templateTag] = field;
                });

                subsection.title = section.title;
                subsection.predefinedSectionId = section.predefinedSectionId;
                subsection.fields = fields;
            });

            formattedSections[section.templateTag] = section;

            formattedSections._sectionsOrder.push(section.templateTag);
        });

        const sections: Sections = formattedSections;

        return sections;
    }
}
