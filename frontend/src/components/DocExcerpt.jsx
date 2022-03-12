import { useDeleteDocMutation, useEditDocMutation } from '../features/api/apiSlice'
import TimeAgo from '../utils/timeAgo'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'

import LoadingButton from '@mui/lab/LoadingButton'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

export default function DocExcerpt({ doc, onEdit }) {

  const [editDoc, { isLoading }] = useEditDocMutation()
  const [deleteDoc] = useDeleteDocMutation()


  const onDone = async (docId) => {
    try {
      await editDoc({ _id: docId, status: 'done' }).unwrap()
    } catch (err) {
      console.error('Failed to edit the status: ', err)
    }
  }

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
          <LoadingButton
            sx={{ mr: 'auto' }}
            onClick={() => onDone(doc._id)}
            endIcon={doc.status === 'done' ? <DoneIcon/> : <DoubleArrowIcon/>}
            loading={isLoading}
            loadingPosition="end"
            disabled={doc.status === 'done'}
          >
            {doc.status === 'done' ? 'Done' : 'Finish'}
          </LoadingButton>
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