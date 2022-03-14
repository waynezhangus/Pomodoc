import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';

import RedoIcon from '@mui/icons-material/Redo';

function SlideDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function SkipBar({ open, toggle, setPomo, time }) {
  const onClick = () => {
    setPomo(prev => ({
      ...prev,
      timerRun: true,
      session: 'Focus',
      timeRemaining: time,
    }))
    toggle(false)
  }

  const action = (
    <IconButton
      size="small"
      color="inherit"
      onClick={onClick}
    >
      <RedoIcon fontSize="small" />
    </IconButton>
  )

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => toggle(false)}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        TransitionComponent={SlideDown}
        message="Well done! You may skip the break here."
        action={action}
      />
    </div>
  );

}