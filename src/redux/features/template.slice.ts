import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TemplateForm } from '../../types/form';


export interface TemplateState {
    searchtext: string;
    searchResults: TemplateForm[]
}

const initialState: TemplateState = {
    searchtext: localStorage.getItem("searchText") || "",
    searchResults: JSON.parse(localStorage.getItem("searchResults") || '[]')
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
    },
})

export const { setSearchText, setSearchResults } = TemplatesState.actions
export default TemplatesState.reducer
