import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TemplateForm } from '../../types/form';
import { CreateDeleteModal } from '../../types';


export interface TemplateState {
    searchtext: string;
    searchResults: TemplateForm[];
    createDeleteModal: CreateDeleteModal
}

const initialState: TemplateState = {
    searchtext: localStorage.getItem("searchText") || "",
    searchResults: JSON.parse(localStorage.getItem("searchResults") || '[]'),
    createDeleteModal: JSON.parse(localStorage.getItem("modal") || "{}")
}

export const TemplatesState = createSlice({
    name: 'template',
    initialState,
    reducers: {
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchtext = action.payload
            localStorage.setItem("searchText", state.searchtext)
        },
        setSearchResults: (state, action: PayloadAction<TemplateForm[]>) => {
            state.searchResults = action.payload
            localStorage.setItem("searchResults", JSON.stringify(state.searchResults))
        },
        setModal: (state, action: PayloadAction<CreateDeleteModal>) => {
            state.createDeleteModal = action.payload
            localStorage.setItem("modal", JSON.stringify(state.createDeleteModal))
        },
    },
})

export const { setSearchText, setSearchResults, setModal } = TemplatesState.actions
export default TemplatesState.reducer
