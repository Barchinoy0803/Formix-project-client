import storage from 'redux-persist/lib/storage'; 
import { PersistConfig } from 'redux-persist';
import { rootReducer } from './rootReducer';
import { mainApi } from '../service/api/api';

export const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [mainApi.reducerPath], 
};
