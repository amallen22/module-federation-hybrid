import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Documents, DocumentsParams, DocumentsState, DocumentTypeEnum } from '../../models/documents';
import { apiService } from '../../services/ApiService';

const initialState: DocumentsState = {
    loadingResumes: false,
    loadingLetters: false,
    resumes: [],
    resumeCount: 0,
    letters: [],
    letterCount: 0,
    error: null,
};

export const documentSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchDocuments.pending, (state, action) => {
            if (action.meta.arg.documentType === DocumentTypeEnum.Resume) {
                state.loadingResumes = true;
            } else {
                state.loadingLetters = true;
            }
        })
        .addCase(fetchDocuments.fulfilled, (state, action) => {
            if (action.payload.documentType === DocumentTypeEnum.Resume) {
                state.loadingResumes = false;
                state.resumes = action.payload.documents;
                state.resumeCount = action.payload.documentCount;
            } else {
                state.loadingLetters = false;
                state.letters = action.payload.documents;
                state.letterCount = action.payload.documentCount;
            }
        })
        .addCase(fetchDocuments.rejected, (state, action) => {
            state.loadingResumes = false;
            state.loadingLetters = false;
            state.error = action.error.message || 'error';
        });
    },
});

export const fetchDocuments = createAsyncThunk(
    'documents/fetchDocuments',
    async (inputParams: DocumentsParams): Promise<Documents> => {
        const params: DocumentsParams = {
            documentType: inputParams.documentType,
        };

        if (inputParams.limit) params.limit = inputParams.limit;

        const res = await apiService.getDocumentList(params);
        res.documentType = inputParams.documentType;
        return res;
    },
);

export default documentSlice.reducer;
