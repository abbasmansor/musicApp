import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.append('X-RapidAPI-Key', 'b239ffb873mshc72db1e59694236p105186jsncc546e0ed3e3');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/track' }),
  }),
});
export const {
  useGetTopChartsQuery,
} = shazamCoreApi;
