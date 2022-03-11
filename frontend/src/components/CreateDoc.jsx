import { useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DatePicker from '@mui/lab/DatePicker';

export default function CreateDoc({open, onClose}) {
  const initDoc = { title: '', pdfLink: '', dueDate: '' }
  const [doc, setDoc] = useState(initDoc)
  const onInput = e => {
    const {name, value} = e.target;
    setDoc(prev => ({...prev, [name]:value}))
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Document</DialogTitle>
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
          <Button variant="contained" onClick={onClose}>Import</Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}