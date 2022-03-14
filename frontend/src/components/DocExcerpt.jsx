import { useDeleteDocMutation, useEditDocMutation } from '../features/api/apiSlice'
import { useNavigate } from 'react-router-dom'
import { parseISO } from 'date-fns'
import TimeDiff from '../utils/time'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import LoadingButton from '@mui/lab/LoadingButton'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

export default function DocExcerpt({doc, onEdit}) {
  const navigate = useNavigate()
  const [editDoc, { isLoading }] = useEditDocMutation()
  const [deleteDoc] = useDeleteDocMutation()

  const onDone = async (docId) => {
    try {
      await editDoc({ _id: docId, status: 'done' }).unwrap()
    } catch (err) {
      console.error('Failed to edit the status: ', err)
    }
  }

  let done = (doc.status==='done')

  return (
    <Grid item key={doc._id} xs={12} sm={6} md={4}>
      <Card sx={{ 
        height: '100%',
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: (done && 'grey.400'),
        color: (done && 'info.contrastText'),
      }}>
        <CardActionArea onClick={() => navigate(`/project/${doc._id}`)}>
          <CardContent sx={{ flexGrow: 1 }} >
            <Typography gutterBottom variant="h5" component="h2" noWrap>
              {doc.title}
            </Typography>
            <Typography variant="caption" color={done ? 'text.disabled' : 'text.secondary'}>
              {TimeDiff(doc.dueDate)}
            </Typography>
            <Box sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="caption" color={done ? 'text.disabled' : 'text.secondary'}>
                  {`${doc.pomoDone}/${doc.pomoTotal}`}
                </Typography>
              </Box>
              {
                !done && (
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress 
                      variant="determinate"
                      color={(parseISO(doc.dueDate) < Date.now()) ? 'error' : 'info'}
                      value={(doc.pomoDone/doc.pomoTotal)*100} 
                    />
                  </Box>
                )
              } 
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>  
          <LoadingButton
            sx={{ mr: 'auto' }}
            onClick={() => onDone(doc._id)}
            endIcon={done ? <DoneIcon/> : <DoubleArrowIcon/>}
            loading={isLoading}
            loadingPosition="end"
            disabled={done}
          >
            {done ? 'Done' : 'Finish'}
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