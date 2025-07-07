import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { getToken, removeToken, validateToken } from '../../helpers';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken() || '';
    if (validateToken(token)) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const skipContentType = headers.get('X-skip-Content-Type') === 'true';
    headers.delete('X-skip-Content-Type');

    if (!skipContentType) {
      headers.set('Content-Type', 'application/json');
    }
    headers.set('Accept', 'application/json');

    return headers;
  },
});

const baseQueryWithStatusHandling: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    removeToken()
    window.location.href = '/auth/login';
  }

  return result;
};

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: baseQueryWithStatusHandling,
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
  tagTypes: ['USER', 'TEMPLATE', 'QUESTION', 'FORM', 'ANALYZE', 'TAG', 'LIKE', 'COMMENT']
});
