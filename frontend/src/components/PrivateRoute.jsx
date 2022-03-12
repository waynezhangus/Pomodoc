import { Outlet } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus'
import CircularProgress from '@mui/material/CircularProgress'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <CircularProgress />
  }

  return loggedIn && <Outlet />
}

export default PrivateRoute
