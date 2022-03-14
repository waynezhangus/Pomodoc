
import { useParams } from 'react-router-dom'
import { useGetDocQuery } from '../features/api/apiSlice'
import Document from "./Document"

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function DocShell() {
  const { docId } = useParams()

  const {
    data: doc = [],
    isLoading, isFetching, isSuccess, isError,
    error,
  } = useGetDocQuery(docId)

  const loadPattern = (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )

  let content
  if (isLoading) {
    content = loadPattern
  } else if (isSuccess) {
    content = <Document doc={doc} />
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return content
}