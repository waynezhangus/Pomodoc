import { secondsToDuration } from '../utils/time'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import LinearProgress from '@mui/material/LinearProgress'

export default function DocProgress({pomo}) {

  return (
    <Box sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1, }}>
        <LinearProgress 
          variant="determinate"
          color={(pomo.session === 'Focus') ? 'error' : 'info'}
          value={
            100 - (100 * pomo.timeRemaining / 60) /
            (pomo.session === "Focus" ? pomo.focusDuration : pomo.breakDuration)
          } 
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{pr: 1,}}
        >
          {secondsToDuration(pomo.timeRemaining)}
        </Typography>
      </Box>
    </Box>
  );
}