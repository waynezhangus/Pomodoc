import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Doc'],
  endpoints: (builder) => ({
    getDocs: builder.query({
      query: () => '/docs',
      providesTags: (result = [], error, arg) => [
        'Doc',
        ...result.map(res => ({ type: 'Doc', id: res._id }))
      ]
    }),
    addDoc: builder.mutation({
      query: (initDoc) => ({
        url: '/docs',
        method: 'POST',
        body: initDoc,
      }),
      invalidatesTags: ['Doc']
    }),
    getDoc: builder.query({
      query: (docId) => `/docs/${docId}`,
      providesTags: (result, error, arg) => [{ type: 'Doc', id: arg }]
    }),
    editDoc: builder.mutation({
      query: (doc) => ({
        url: `docs/${doc._id}`,
        method: 'PATCH',
        body: doc,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Doc', id: arg._id }]
    }),
    deleteDoc: builder.mutation({
      query: (docId) => ({
        url: `docs/${docId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Doc', id: arg }]
    }),
  }),
})

export const {
  useGetDocsQuery,
  useGetDocQuery,
  useAddDocMutation,
  useEditDocMutation,
  useDeleteDocMutation,
} = apiSlice
