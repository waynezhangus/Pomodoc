import { useMemo, useState } from 'react'
import { useGetDocsQuery } from '../features/api/apiSlice'
import CreateDoc from '../components/CreateDoc'
import EditDoc from '../components/EditDoc'
import DocExcerpt from '../components/DocExcerpt'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'

import AddIcon from '@mui/icons-material/Add'

export default function Documents() {
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editData, setEditData] = useState('')

  const toggleCreate = () => {
    setCreate(prev => !prev)
  }
  const toggleEdit = () => {
    setEdit(prev => !prev)
  }
  const onEdit = (doc) => {
    setEditData(doc)
    toggleEdit()
  }
  
  const {
    data: docs = [],
    isLoading, isFetching, isSuccess, isError,
    error,
  } = useGetDocsQuery()

  const sortedDocs = useMemo(() => {
    const sortedDocs = docs.slice()
    sortedDocs.sort((a, b) => b.dueDate.localeCompare(a.dueDate))
    return sortedDocs
  }, [docs])

  const createCard = (
    <Grid item xs={12} sm={6} md={4} sx={{alignItems: 'stretch'}}>
      <Card sx={{ height: '100%', display: 'flex' }} >
        <CardActionArea onClick={toggleCreate}>
          <CardContent sx={{display: 'flex', justifyContent: 'center', }}>
            <AddIcon fontSize="large" />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )

  let content
  if (isLoading) {
    content = <CircularProgress />
  } else if (isSuccess) {
    content = sortedDocs.map((doc) => (
      <DocExcerpt key={doc._id} doc={doc} onEdit={onEdit} />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {createCard}
        {content}
      </Grid>
      <CreateDoc open={create} onClose={toggleCreate}/>
      { edit && (<EditDoc open={edit} onClose={toggleEdit} editData={editData}/>) }
    </Container>
  )
}
