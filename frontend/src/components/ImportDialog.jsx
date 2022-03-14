import { forwardRef, useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImportDialog({ initNote, findings, setNote }) {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(prev => !prev)

  useEffect(() => {
    if (!initNote) {
      toggleOpen()
    }
  }, [])

  const onImport = () => {
    setNote(findings.join('\r\n\n'))
    toggleOpen()
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={toggleOpen}
    >
      <DialogTitle>{'Import our summary for the PDF?'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          It seems like your note is empty. After looking through this file,
          we made a short summary for you to get started.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleOpen}>Disagree</Button>
        <Button onClick={onImport}>Agree</Button>
      </DialogActions>
    </Dialog>
  )
}