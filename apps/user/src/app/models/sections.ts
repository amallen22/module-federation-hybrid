export interface SectionsRequest {
    predefinedSections: string;
    language: string;
    documentId: string;
}

export interface SectionsResponse {
    limit: number;
    offset: number;
    sections: Section[];
    totalResults: number;
}

export interface Sections extends Record<string, Section | string[]> {
    achievements: Section;
    'certifications-n-courses': Section;
    'contact-information': Section;
    custom: Section;
    education: Section;
    'honors-n-awards': Section;
    languages: Section;
    objective: Section;
    publications: Section;
    references: Section;
    skills: Section;
    'work-experience': Section;
    _sectionsOrder: string[];
}

export interface Section {
    active: boolean;
    description: string;
    displayMode: string;
    edited: boolean;
    fileRuleStructure: any;
    manageable: false;
    predefinedSectionId: string;
    shortDescription: string;
    stepProperties: Object;
    subsectionTitle: string;
    subsections: Subsection[];
    templateTag: string;
    title: string;
    type: string;
    userAids: any;
}

export interface Subsection {
    description: string;
    fields: Fields;
    position: number;
    structuredDescription: any;
    title: string;
    predefinedSectionId: string;
}

export interface Field {
    [key: string]: any;
}

export interface Fields extends Record<string, any> {}
