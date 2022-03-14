import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Documents from './pages/Documents'
import Pomodoro from './pages/Pomodoro'
import DocShell from './pages/DocShell'
import Settings from './pages/Settings'
import PrivateRoute from './components/PrivateRoute'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  components: {
    MuiDivider: {
      variants: [
        {
          props: { variant: 'resize' },
          style: { cursor: 'col-resize' },
        },
      ]
    }
  },
  // palette: {
  //   mode: 'dark',
  // },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/projects' element={<Documents />} />
            <Route path='/pomodoro' element={<Pomodoro />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/project/:docId' element={<PrivateRoute />}>
            <Route path='/project/:docId' element={<DocShell />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

