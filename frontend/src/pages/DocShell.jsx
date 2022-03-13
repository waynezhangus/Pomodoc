
import { useParams } from 'react-router-dom'
import { useGetDocQuery } from '../features/api/apiSlice'
import Document from "./Document"

import CircularProgress from '@mui/material/CircularProgress'

export default function DocShell() {
  const { docId } = useParams()

  const {
    data: doc = [],
    isLoading, isFetching, isSuccess, isError,
    error,
  } = useGetDocQuery(docId)

  let content
  if (isLoading) {
    content = <CircularProgress />
  } else if (isSuccess) {
    content = <Document doc={doc} />
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return content
}