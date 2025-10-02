import { configureStore } from '@reduxjs/toolkit';

import documentReviewReducer from './documentReviewSlice';
import documentReducer from './documentSlice';

const store = configureStore({
    reducer: {
        documents: documentReducer,
        documentReview: documentReviewReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
