import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TemplateForm } from '../../types/form'
import { CreateDeleteModal } from '../../types'

export interface TemplateState {
  searchtext: string
  searchResults: TemplateForm[]
  createDeleteModal: CreateDeleteModal
}

const initialState: TemplateState = {
  searchtext: '',
  searchResults: [],
  createDeleteModal: { open: false, id: null, type: 'create' } as unknown as CreateDeleteModal,
}

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchtext = action.payload
    },
    setSearchResults(state, action: PayloadAction<TemplateForm[]>) {
      state.searchResults = action.payload
    },
    setModal(state, action: PayloadAction<CreateDeleteModal>) {
      state.createDeleteModal = action.payload
    },
  },
})

export const { setSearchText, setSearchResults, setModal } = templateSlice.actions
export default templateSlice.reducer
