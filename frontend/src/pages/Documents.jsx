import { useMemo, useState } from 'react'
import { useGetDocsQuery } from '../features/api/apiSlice'
import { useDeleteDocMutation } from '../features/api/apiSlice'
import CreateDoc from '../components/CreateDoc'
import EditDoc from '../components/EditDoc'
import TimeAgo from '../utils/timeAgo'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Documents() {
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editData, setEditData] = useState('')

  const [deleteDoc] = useDeleteDocMutation()

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

  function DocExcerpt({ doc }) {
    return (
      <Grid item key={doc._id} xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardActionArea>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {doc.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ pl: 0.2 }}>
                {TimeAgo(doc.dueDate)}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>  
            <Button sx={{ mr: 'auto' }}>
              Finish
            </Button>
            <IconButton edge='end' onClick={() => onEdit(doc)}>
              <EditIcon fontSize="small"/>
            </IconButton>
            <IconButton onClick={() => deleteDoc(doc._id)}>
              <DeleteIcon fontSize="small"/>
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    )
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

  let content
  if (isLoading) {
    content = <CircularProgress />
  } else if (isSuccess) {
    content = sortedDocs.map((doc) => (
      <DocExcerpt key={doc._id} doc={doc} />
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
