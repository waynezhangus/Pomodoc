import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEditDocMutation } from '../features/api/apiSlice'
import useInterval from "../hooks/useInterval"
import ViewSDKClient from "../utils/ViewSDKClient"

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
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
  const [note, setNote] = useState(doc.note)
  const [pomo, setPomo] = useState({
    timerRun: false,
    session: 'Focus',
    timeRemaining: doc.focusDuration * 60,
    pomoLeft: (doc.pomoTotal-doc.pomoDone),
    focusDuration: doc.focusDuration,
    breakDuration: doc.breakDuration,
  })

  function toggleDrawer() {
    setDrawer(prev => !prev);
  }

  function onInput(e) {
    setNote(e.target.value)
  }

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

  function playPause() {
    setPomo(prev => ({
      ...prev,
      timerRun: !prev.timerRun,
    }))
  }

  function stopHandle () {
    setPomo((prev) => ({
      ...prev,
      timerRun: false,
      session: 'Focus',
      timeRemaining: doc.focusDuration * 60,
    }))
  }

  useInterval(() => {
    if (pomo.timeRemaining === 0) {
      new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play()
      return setPomo((prev) => {
        if (prev.session === 'Focus') {
          return {
            ...prev,
            session: 'Break',
            timeRemaining: prev.breakDuration * 60,
            pomoLeft: prev.pomoLeft--,
          }
        } else {
          return {
            ...prev,
            session: 'Focus',
            timeRemaining: prev.focusDuration * 60,
          }
        }
      })
    } else {
      return setPomo((prev) => {
        const timeRemaining = Math.max(0, prev.timeRemaining - 1)
        return {
          ...prev,
          timeRemaining
        }
      })
    }
  },
    pomo.timerRun ? 100 : null
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
    </Box>
  );
}