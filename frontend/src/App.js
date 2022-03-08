import { forwardRef } from 'react'
import { 
  BrowserRouter as Router, 
  Link as RouterLink,
  Routes, 
  Route 
} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Projects from './pages/Projects'
import Pomodoro from './pages/Pomodoro'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Map href (MUI) -> to (react-router)
const LinkBehavior = forwardRef((props, ref) => {
  const { href, ...other } = props
  return <RouterLink ref={ref} to={href} {...other} />
})

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/projects' element={<Projects />} />
            <Route path='/pomodoro' element={<Pomodoro />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

