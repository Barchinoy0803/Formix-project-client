// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import users from './features/user.slice';
import templates from './features/template.slice';
import { mainApi } from '../service/api/api';

export const rootReducer = combineReducers({
  users,
  templates,
  [mainApi.reducerPath]: mainApi.reducer, // RTK Query slice
});

export type RootState = ReturnType<typeof rootReducer>;
