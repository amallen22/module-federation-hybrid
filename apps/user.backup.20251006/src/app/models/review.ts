/* eslint-disable no-unused-vars */
export enum ReviewStatusEnum {
    NOT_REVIEWED = 'NOT_REVIEWED',
    PENDING_REVIEW = 'PENDING_REVIEW',
    REVIEWED = 'REVIEWED',
}

export enum InternalReviewStatusEnum {
    IN_PROGRESS = 'in_progress',
    PENDING = 'pending',
    CANCELLED = 'cancelled',
    ERROR = 'error',
    SUCCESS = 'success',
}

export type InternalReviewStatus =
    | InternalReviewStatusEnum.IN_PROGRESS
    | InternalReviewStatusEnum.PENDING
    | InternalReviewStatusEnum.CANCELLED
    | InternalReviewStatusEnum.ERROR
    | InternalReviewStatusEnum.SUCCESS;

export type ReviewStatus = ReviewStatusEnum.NOT_REVIEWED | ReviewStatusEnum.PENDING_REVIEW | ReviewStatusEnum.REVIEWED;

export const reviewerId = 'b651f04d-bf78-4076-aedf-1082194237bd';

export interface DocumentReviewState {
    loadingRequest: boolean;
    error: boolean;
    loadingResponse: boolean;
    response: ReviewResponse | null;
    profession: string;
    review: Recommendations | null;
    reviewStatus: ReviewStatus;
}

export interface Recommendations {
    recommendations: Recommendation[];
}

export interface Recommendation {
    title: string;
    body: string;
}

export interface ReviewRequest {
    language: string;
    reviewer_id: string;
    review_customization: ReviewCustomization;
    documentId: string;
}

export interface ReviewCustomization {
    [field: string]: string;
}

export interface ReviewResponse {
    review_id: string;
    document_id: string;
    review_customization: ReviewCustomization;
    timeline: Timeline;
    status: InternalReviewStatus;
    response?: Response;
}

export interface PostReviewResponse {
    review_id: string;
}

export interface Timeline {
    past_due_event: string;
    request_event: string;
}

export interface Response {
    success?: Success;
    error?: Error;
}

export interface Success {
    content: string;
}

export interface Error {
    code: string;
    message: string;
}

export enum ReviewCookieEnum {
    IN_REVIEW_COOKIE = 'InReviewCookieClosed',
    REVIEWED_COOKIE = 'ReviewedCookieClosed',
}

export type ReviewCookie = null | ReviewCookieEnum.IN_REVIEW_COOKIE | ReviewCookieEnum.REVIEWED_COOKIE;
