import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEditDocMutation } from '../features/api/apiSlice'
import useInterval from '../hooks/useInterval'
import ViewSDKClient from '../utils/ViewSDKClient'
import ImportDialog from '../components/ImportDialog'
import SkipBar from '../components/SkipBar'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import DocAppBar from '../components/DocAppBar'
import DocDrawer from '../components/DocDrawer'
import DocProgress from '../components/DocProgress'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'

export default function Document({ doc }) {
  const navigate = useNavigate()
  const [editDoc, { isLoading }] = useEditDocMutation()
  
  const [drawer, setDrawer] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [note, setNote] = useState(doc.note)
  const [pomo, setPomo] = useState({
    timerRun: false,
    session: 'Focus',
    timeRemaining: doc.focusDuration * 60,
    pomoLeft: (doc.pomoTotal-doc.pomoDone),
    focusDuration: doc.focusDuration,
    breakDuration: doc.breakDuration,
  })
  const toggleSnackbar = (next) => setSnackbar(next)
  const toggleDrawer = () => setDrawer(prev => !prev)

  const onInput = (e) => setNote(e.target.value)

  const onClose = async () => {
    try {
      await editDoc({
        _id: doc._id,
        note,
        pomoDone: (doc.pomoTotal-pomo.pomoLeft)
      }).unwrap()
      navigate('/projects')
    } catch (err) {
      console.error('Failed to edit the doc: ', err)
    }
  }

  const playPause = () => {
    setPomo(prev => ({
      ...prev,
      timerRun: !prev.timerRun,
    }))
  }
  const stopHandle = () => {
    setPomo(prev => ({
      ...prev,
      timerRun: false,
      session: 'Focus',
      timeRemaining: doc.focusDuration * 60,
    }))
  }

  useInterval(() => {
    if (pomo.timeRemaining === 0) {
      new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play()
      if (pomo.session === 'Focus') {
        toggleSnackbar(true)
        setPomo(prev => ({
          ...prev,
          session: 'Break',
          timeRemaining: pomo.breakDuration * 60,
          pomoLeft: prev.pomoLeft-1,
        }))
      } else {
        setPomo(prev => ({
          ...prev,
          session: 'Focus',
          timeRemaining: pomo.focusDuration * 60,
        }))
      }
    } else {
      setPomo(prev => {
        const timeRemaining = Math.max(0, prev.timeRemaining - 1)
        return { ...prev, timeRemaining }
      })
    }
  },
    pomo.timerRun ? 20 : null
  )

  useEffect(() => {
    const viewSDKClient = new ViewSDKClient()
    viewSDKClient.ready().then(() => {
      viewSDKClient.previewFile(
        "pdf-div",
        {
          defaultViewMode: "FIT_WIDTH",
          showAnnotationTools: true,
          showLeftHandPanel: true,
          showPageControls: true,
          showDownloadPDF: true,
          showPrintPDF: true,
        },
        `https://cors-anywhere.herokuapp.com/${doc.pdfLink}`,
        doc.title,
        doc._id,
      )
    })
  },[])

  return (
    <Box sx={{ display: 'flex' }}>
      <DocAppBar 
        open={drawer} 
        toggleDrawer={toggleDrawer}
        playPause={playPause}
        stopHandle={stopHandle}
        pomo={pomo}
        title={doc.title}  
      />
      <DocDrawer 
        open={drawer} 
        toggleDrawer={toggleDrawer}
        onClose={onClose}
        references={doc.references}
      />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto', 
        }}
      >
        <Toolbar />
        <DocProgress pomo={pomo} />
        <Stack direction="row" spacing={2} sx={{ my: 2, pr: 1 }}>     
          <div id="pdf-div" />
          <TextField
            sx={{width: 800}}
            id="filled-textarea"
            label={doc.title}
            name="note"
            value={note}
            onChange={onInput}
            placeholder="Your note"
            multiline
            minRows={27} 
            maxRows={27} 
            variant="filled"
          />
        </Stack>
      </Box> 
      <ImportDialog initNote={doc.note} findings={doc.findings} setNote={setNote} /> 
      <SkipBar 
        open={snackbar} 
        toggle={toggleSnackbar} 
        setPomo={setPomo} 
        time={doc.focusDuration * 60}
      />  
    </Box>
  );
}