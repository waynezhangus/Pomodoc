import { useState } from 'react'
import { useEditDocMutation } from '../features/api/apiSlice'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DatePicker from '@mui/lab/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';

import SaveIcon from '@mui/icons-material/Save';

export default function EditDoc({open, onClose, editData}) {
  const [doc, setDoc] = useState(editData)

  const [editDoc, { isLoading }] = useEditDocMutation()

  const onInput = e => {
    const {name, value} = e.target;
    setDoc(prev => ({...prev, [name]:value}))
  }

  const canSave = doc.title && !isLoading

  const onSave = async () => {
    if (canSave) {
      try {
        await editDoc(doc).unwrap()
        onClose()
      } catch (err) {
        console.error('Failed to edit the doc: ', err)
      }
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Document</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          Some description.
        </DialogContentText> */}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              required
              id="title"
              name="title"
              value={doc.title}
              onChange={onInput}
              label="Title"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="pdfLink"
              name="pdfLink"
              value={doc.pdfLink}
              onChange={onInput}
              label="PDF Location"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="pomoTotal"
              name="pomoTotal"
              value={doc.pomoTotal ?? 0}
              onChange={onInput}
              label="Pomodoro Amount"
              fullWidth
              variant="standard"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <DatePicker 
              label="Due Date"
              value={doc.dueDate}
              onChange={newDate => setDoc(prev => ({...prev, dueDate: newDate}))}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box sx={{ mb: 1, mr: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            onClick={onSave}
            endIcon={<SaveIcon />}
            loading={isLoading}
            loadingPosition="end"
            variant="contained"
          >
            Save
          </LoadingButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
}