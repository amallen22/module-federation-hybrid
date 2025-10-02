import { createBrowserRouter } from 'react-router-dom';

import Feedback from '../../components/Feedback/Feedback';
import Support from '../../components/Support/Support';
import AccountManagement from '../../pages/AccountManagement/AccountManagement';
import Cancellation from '../../pages/Cancelled/Cancelled';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Documents from '../../pages/Documents/Documents';
import { JobSearch } from '../../pages/JobSearch/JobSearch';
import { Review } from '../../pages/Review/Review';
import UnsubscribePage from '../../pages/Unsubscribe/Unsubscribe';
import { Routes } from './Routes';

const routingDef = {
    DASHBOARD: {
        path: Routes.dashboard,
        Component: Dashboard,
    },
    DOCUMENTS: {
        path: Routes.documents,
        Component: Documents,
    },
    REVIEW: {
        path: Routes.review,
        Component: Review,
    },
    PROFILE: {
        path: Routes.profile,
        Component: AccountManagement,
    },
    SUBSCRIPTION: {
        path: Routes.subscription,
        Component: AccountManagement,
    },
    UNSUBSCRIBE: {
        path: Routes.unsubscribe,
        Component: UnsubscribePage,
    },
    SUPPORT: {
        path: Routes.support,
        Component: Support,
    },
    CANCELLED: {
        path: Routes.cancelled,
        Component: Cancellation,
    },
    JOBS: {
        path: Routes.jobs,
        Component: JobSearch,
    },
    FEEDBACK: {
        path: Routes.feedback,
        Component: Feedback,
    },
};

export const RouterBrowser = createBrowserRouter([
    {
        path: Routes.dashboard,
        Component: Dashboard,
    },
    {
        path: Routes.documents,
        Component: Documents,
    },
    {
        path: Routes.review,
        Component: Review,
    },
]);

export const COMMON_ROUTES = [
    routingDef.DASHBOARD,
    routingDef.DOCUMENTS,
    routingDef.REVIEW,
    routingDef.JOBS,
    routingDef.PROFILE,
    routingDef.SUBSCRIPTION,
    routingDef.UNSUBSCRIBE,
    routingDef.SUPPORT,
    routingDef.CANCELLED,
    routingDef.FEEDBACK,
];
