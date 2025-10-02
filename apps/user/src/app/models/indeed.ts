export interface IndeedParams {
    l: string;
    co: string;
    q: string;
    start: number | undefined;
    limit: number;
}

export interface Job {
    city: string;
    company: string;
    jobtitle: string;
    snippet: string;
    url: string;
    date: string;
    formattedRelativeTime: string;
    refNum: string;
    formattedLocationFull: string;
    indeedApply: boolean;
}

export interface IndeedSearchResult {
    end: number;
    provider: string;
    results: Array<Job> | undefined;
    totalResults: number;
}

export interface JobSearchParams {
    job: string;
    location: string;
}
