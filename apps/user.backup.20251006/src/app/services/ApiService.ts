import { API_EDITOR_URL } from '../config/appConfig';
import createDocumentEndpoint from '../internals/ajax/document/CreateDocument/api.json';
import deleteDocumentEndpoint from '../internals/ajax/document/DeleteDocument/api.json';
import duplicateDocumentEndpoint from '../internals/ajax/document/DuplicateDocument/api.json';
import getDocumentListEndpoint from '../internals/ajax/document/GetDocumentList/api.json';
import publishDocument from '../internals/ajax/document/PublishDocument/api.json';
import putDocumentTitle from '../internals/ajax/document/SetDocumentTitle/api.json';
import getReviewsEndpoint from '../internals/ajax/DocumentReview/GetDocumentReview/api.json';
import postReviewEndpoint from '../internals/ajax/DocumentReview/PostDocumentReview/api.json';
import getDefaultTemplateEndpoint from '../internals/ajax/GetDefaultTemplate/api.json';
import getDocumentSections from '../internals/ajax/GetDocSectionsHandler/api.json';
import { GetSectionsReducer } from '../internals/ajax/GetDocSectionsHandler/reducers';
import getDocumentTemplatesEndpoint from '../internals/ajax/GetDocumentTemplates/api.json';
import getLanguagesEndpoint from '../internals/ajax/GetLanguages/api.json';
import getProductByIdEndpoint from '../internals/ajax/GetProductById/api.json';
import getProductListEndpoint from '../internals/ajax/GetProductList/api.json';
import getProductUserIdTagEndpoint from '../internals/ajax/GetProductUserIdTag/api.json';
import getProfileEndpoint from '../internals/ajax/GetProfile/api.json';
import getRelatedProductsEndpoint from '../internals/ajax/GetRelatedProducts/api.json';
import getSuggestionsEndpoint from '../internals/ajax/GetSuggestions/api.json';
import getUnsubscribeReasons from '../internals/ajax/GetUnsubscribeReasons/api.json';
import getVisitorEndpoint from '../internals/ajax/GetVisitor/api.json';
import getJobsIndeedEndpoint from '../internals/ajax/jobs/GetJobsIndeed/api.json';
import postTechnicalIssue from '../internals/ajax/PostTechnicalIssue/api.json';
import postUnsubscribeFeedback from '../internals/ajax/PostUnsubscribeFeedback/api.json';
import putUserProfileInfo from '../internals/ajax/PutUserInfo/api.json';
import getUnSubscriptionQuestionsEndpoint from '../internals/ajax/questions/GetUnsubscriptionQuestions/api.json';
import deleteSubscriptionEndpoint from '../internals/ajax/subscription/DeleteSubscription/api.json';
import getSubscriptionDebitsEndPoint from '../internals/ajax/subscription/GetDebits/api.json';
import getSubscriptionEndPoint from '../internals/ajax/subscription/GetSubscription/api.json';
import getSubscriptionsEndPoint from '../internals/ajax/subscription/GetSubscriptions/api.json';
import putSubscriptionEndPoint from '../internals/ajax/subscription/PutSubscription/api.json';
import { Debits, GetDebitsParams } from '../models/debits';
import {
    CreateDocumentParams,
    Documents,
    DocumentsParams,
    DocumentTitle,
    DuplicateDocumentParams,
    ShareDocumentParams,
} from '../models/documents';
import { IndeedParams, IndeedSearchResult } from '../models/indeed';
import { Language } from '../models/language';
import { Product, Products, RelatedProductsParams } from '../models/products';
import { Profile, ProfileInfoParams, ProfileSubscription } from '../models/profile';
import { PostReason, PostTechnicalIssue, Reason } from '../models/reason';
import { PostReviewResponse, ReviewRequest, ReviewResponse } from '../models/review';
import { Sections, SectionsRequest } from '../models/sections';
import { getSubscriptionsParams, updatedSubscription, updateSubscriptionParams } from '../models/subscription';
import { FetchSuggestions, Suggestion } from '../models/suggestions';
import { CvAjaxEditorHandler } from './CvAjaxEditorHandler';
import { CvAjaxHandler } from './CvAjaxHandler';

interface BodyResponse<T = any> {
    body: T;
}

export class defaultReducer {
    reduce(data: BodyResponse) {
        return data.body;
    }
}

class ApiService {
    getVisitor(lang: string): Promise<{ cookie: string }> {
        return new CvAjaxHandler<{ cookie: string }>({
            endpointDefinition: getVisitorEndpoint,
            reducer: defaultReducer,
        }).customAction({ accountLanguage: lang });
    }

    getProfile(): Promise<Profile> {
        return new CvAjaxHandler<Profile>({
            endpointDefinition: getProfileEndpoint,
            reducer: defaultReducer,
        }).customAction();
    }

    getReviews(): Promise<ReviewResponse[]> {
        return new CvAjaxEditorHandler<ReviewResponse[]>({
            endpointDefinition: getReviewsEndpoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<ReviewResponse[]>) {
                    return data.body;
                }
            },
        }).customAction();
    }

    postReview(params: ReviewRequest): Promise<PostReviewResponse> {
        return new CvAjaxEditorHandler<PostReviewResponse>({
            endpointDefinition: postReviewEndpoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<PostReviewResponse>) {
                    return data.body;
                }
            },
        }).customAction(params);
    }

    getSuggestions(params: FetchSuggestions): Promise<Suggestion[]> {
        return new CvAjaxHandler<Suggestion[]>({
            endpointDefinition: getSuggestionsEndpoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<any>) {
                    return data.body.content;
                }
            },
        }).customAction(params);
    }

    getLanguages(): Promise<Language[]> {
        return new CvAjaxHandler<Language[]>({
            endpointDefinition: getLanguagesEndpoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<{ languages: Language[] }>) {
                    return data.body.languages;
                }
            },
        }).customAction();
    }

    putUserInfo(params: ProfileInfoParams): Promise<BodyResponse> {
        return new CvAjaxHandler<BodyResponse>({
            endpointDefinition: putUserProfileInfo,
            reducer: class Reducer {
                reduce(data: BodyResponse) {
                    return data;
                }
            },
        }).customAction(params);
    }

    putDocumentTitle(params: DocumentTitle): Promise<BodyResponse> {
        return new CvAjaxEditorHandler<BodyResponse>({
            endpointDefinition: putDocumentTitle,
            reducer: class Reducer {
                reduce(data: BodyResponse) {
                    return data;
                }
            },
        }).customAction(params);
    }

    getProductUserIdTag(scope: string): Promise<{ layoutId: string }> {
        return new CvAjaxHandler<{ layoutId: string }>({
            endpointDefinition: getProductUserIdTagEndpoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<{ layoutId: string }>) {
                    return data.body.layoutId;
                }
            },
        }).customAction({ scope });
    }

    getProductList(params: { currency?: string }): Promise<Product[]> {
        return new CvAjaxHandler<Product[]>({
            endpointDefinition: getProductListEndpoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<Products>) {
                    return data.body.result;
                }
            },
        }).customAction(params);
    }

    getProductById(productId: string): Promise<Product[]> {
        return new CvAjaxHandler<Product[]>({
            endpointDefinition: getProductByIdEndpoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<Product[]>) {
                    return [data.body];
                }
            },
        }).customAction({ productId });
    }

    getRelatedProducts(params: RelatedProductsParams): Promise<Products> {
        return new CvAjaxHandler<Products>({
            endpointDefinition: getRelatedProductsEndpoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<Products>) {
                    return data.body;
                }
            },
        }).customAction(params);
    }

    getDocumentList(params: DocumentsParams): Promise<Documents> {
        return new CvAjaxEditorHandler<Documents>({
            endpointDefinition: getDocumentListEndpoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<Documents>) {
                    return data.body;
                }
            },
        }).customAction(params);
    }

    getJobsIndeed(params: IndeedParams): Promise<IndeedSearchResult> {
        return new CvAjaxHandler<IndeedSearchResult>({
            endpointDefinition: getJobsIndeedEndpoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<IndeedSearchResult>) {
                    return data.body;
                }
            },
        }).customAction(params);
    }

    getDefaultTemplate(type: string): Promise<{ templateId: string }> {
        return new CvAjaxEditorHandler<{ templateId: string }>({
            endpointDefinition: getDefaultTemplateEndpoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<{ templateId: string }>) {
                    return data.body;
                }
            },
        }).customAction({ type });
    }

    getDocumentTemplates(documentType: string) {
        return new CvAjaxEditorHandler({
            endpointDefinition: getDocumentTemplatesEndpoint,
            reducer: defaultReducer,
        }).customAction({ documentType });
    }

    getSubscription(): Promise<ProfileSubscription> {
        return new CvAjaxHandler<ProfileSubscription>({
            endpointDefinition: getSubscriptionEndPoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<ProfileSubscription>) {
                    return data.body;
                }
            },
        }).customAction();
    }

    putSubscription(params: updateSubscriptionParams): Promise<{ subscriptionId: string }> {
        return new CvAjaxHandler<{ subscriptionId: string }>({
            endpointDefinition: putSubscriptionEndPoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<{ subscriptionId: string }>) {
                    return data.body;
                }
            },
        }).customAction(params);
    }

    getSubscriptions(params: getSubscriptionsParams): Promise<updatedSubscription> {
        return new CvAjaxHandler<updatedSubscription>({
            endpointDefinition: getSubscriptionsEndPoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<updatedSubscription>) {
                    return data.body;
                }
            },
        }).customAction(params);
    }

    getUnSubscriptionQuestions() {
        return new CvAjaxHandler({
            endpointDefinition: getUnSubscriptionQuestionsEndpoint,
            reducer: defaultReducer,
        }).customAction();
    }

    publishDocument(params: ShareDocumentParams): Promise<{ token: string }> {
        return new CvAjaxEditorHandler<{ token: string }>({
            endpointDefinition: publishDocument,
            reducer: class Reducer {
                reduce(data: BodyResponse<{ token: string }>) {
                    return data.body;
                }
            },
        }).customAction(params);
    }

    createDocument(params: CreateDocumentParams): Promise<{ documentId: string }> {
        return new CvAjaxEditorHandler<{ documentId: string }>({
            endpointDefinition: createDocumentEndpoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<{ documentId: string }>) {
                    return data.body;
                }
            },
        }).customAction(params);
    }

    duplicateDocument(params: DuplicateDocumentParams) {
        return new CvAjaxEditorHandler({
            endpointDefinition: duplicateDocumentEndpoint,
            reducer: defaultReducer,
        }).customAction(params);
    }

    deleteDocument(documentId: string) {
        return new CvAjaxEditorHandler({
            endpointDefinition: deleteDocumentEndpoint,
            reducer: defaultReducer,
        }).customAction({ documentId });
    }

    deleteSubscription(subscriptionId: string) {
        return new CvAjaxHandler({
            endpointDefinition: deleteSubscriptionEndpoint,
            reducer: defaultReducer,
        }).customAction({ subscriptionId });
    }

    getDebits(params: GetDebitsParams): Promise<Debits> {
        return new CvAjaxHandler<Debits>({
            endpointDefinition: getSubscriptionDebitsEndPoint,
            reducer: class Reducer {
                reduce(data: BodyResponse<Debits>) {
                    return data.body;
                }
            },
        }).customAction(params);
    }

    getUnsubscribeReasons() {
        return new CvAjaxHandler<Reason[]>({
            endpointDefinition: getUnsubscribeReasons,
            reducer: class Reducer {
                reduce(data: BodyResponse<Reason[]>) {
                    return data.body;
                }
            },
        }).customAction();
    }

    postUnsubscribeFeedback(params: PostReason) {
        return new CvAjaxHandler({
            endpointDefinition: postUnsubscribeFeedback,
            reducer: class Reducer {
                reduce(data: BodyResponse) {
                    return data.body;
                }
            },
        }).customAction(params);
    }

    postTechnicalIssue(params: PostTechnicalIssue) {
        return new CvAjaxHandler({
            endpointDefinition: postTechnicalIssue,
            reducer: defaultReducer,
        }).customAction(params);
    }

    getDocumentSections(params: SectionsRequest): Promise<Sections> {
        return new CvAjaxEditorHandler<Sections>({
            endpointDefinition: getDocumentSections,
            app: API_EDITOR_URL,
            reducer: GetSectionsReducer,
        }).customAction(params);
    }
}

export const apiService = new ApiService();
