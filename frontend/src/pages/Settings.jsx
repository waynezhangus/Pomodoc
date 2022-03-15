import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { update, reset } from '../features/auth/authSlice'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function Settings() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { 
    name, email, token,
    focusDuration, breakDuration, readingSpeed,
    pdfAnno, pdfPanel, pdfPage, isDark 
  } = useSelector((state) => state.auth.user)

  const { status, error } = useSelector((state) => state.auth)

  const [config, setConfig] = useState({
    name, email, token,
    focusDuration, breakDuration, readingSpeed,
    pdfAnno, pdfPanel, pdfPage, isDark
  })

  const [expanded, setExpanded] = useState(false)
  
  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onInput = e => {
    const {name, value} = e.target;
    setConfig(prev => ({...prev, [name]:value}))
  }

  const onSwitch = e => {
    const {name, checked} = e.target;
    setConfig(prev => ({...prev, [name]:checked}))
  }

  const onSave = () => {
    dispatch(update(config))
    navigate('/')
  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography sx={{ width: '33%', flexShrink: 0, pl: 1.3 }}>Account Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3} sx={{ pl: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                size="small"
                sx={{ width: '50%' }}
                name='name'
                value={config.name}
                onChange={onInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                size="small"
                sx={{ width: '50%' }}
                name='email'
                value={config.email}
                onChange={onInput}
              />
            </Grid>
            <Grid item xs={12} sx={{ pb: 1 }}>
              <TextField
                label="Password"
                value="********"
                size="small"
                sx={{ width: '50%' }}
                disabled
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography sx={{ width: '33%', flexShrink: 0, pl: 1.3 }}>Pomodoro Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3} sx={{ pl: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Focus Duration"
                size="small"
                type='number'
                sx={{ width: '50%' }}
                name='focusDuration'
                value={config.focusDuration}
                onChange={onInput}
              />
            </Grid>
            <Grid item xs={12} sx={{ pb: 1 }}>
              <TextField
                label="Break Duration"
                size="small"
                type='number'
                sx={{ width: '50%' }}
                name='breakDuration'
                value={config.breakDuration}
                onChange={onInput}
              />
            </Grid>
            {/* <Grid item xs={12} sx={{ pb: 1 }}>
              <TextField
                label="Reading Speed"
                size="small"
                type='number'
                sx={{ width: '50%' }}
                name='readingSpeed'
                value={config.readingSpeed}
                onChange={onInput}
              />
            </Grid> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography sx={{ width: '33%', flexShrink: 0, pl: 1.3 }}>Document Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup sx={{ pl: 1.2, flexDirection: 'row' }}>
            <FormControlLabel
              control={<Switch name='pdfAnno' checked={config.pdfAnno} onChange={onSwitch} />} 
              label="PDF Annotation" 
            />
            <FormControlLabel
              sx={{ pl: 10 }} 
              control={<Switch name='pdfPanel' checked={config.pdfPanel} onChange={onSwitch} />} 
              label="PDF Left Panel" 
            />
            <FormControlLabel
              sx={{ pl: 10 }} 
              control={<Switch name='pdfPage' checked={config.pdfPage} onChange={onSwitch} />} 
              label="PDF Page Control" 
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onSave} variant="contained">
          Save
        </Button>
      </Box>
    </Container>
  );
}