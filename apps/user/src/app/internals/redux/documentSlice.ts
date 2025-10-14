import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Document, Documents, DocumentsParams, DocumentsState, DocumentTypeEnum } from '../../models/documents';
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
    async (params: DocumentsParams): Promise<Documents> => {
        let currentDocuments: Document[] = [];
        let offset = 0; 
        let documentCount = 0;
        let targetCount = params.limit || 1;

        while (currentDocuments.length < targetCount) {
            params.offset = offset;
            const res = await apiService.getDocumentList(params);

            if (res.documents.length === 0) break;

            currentDocuments.push(...res.documents);
            offset += res.documents.length;
            documentCount = res.documentCount;
            if (!params.limit) targetCount = res.documentCount;
        }

        return {
            documentCount,
            documents: currentDocuments,
            documentType: params.documentType,
        };
    }
);

export default documentSlice.reducer;