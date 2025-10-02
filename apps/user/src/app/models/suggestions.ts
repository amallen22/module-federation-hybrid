export interface FetchSuggestions {
    occupation: string;
    language: string;
    sectionTemplateTag?: string;
}

export interface Suggestion {
    id: string;
    value: string;
}
