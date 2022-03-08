import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'

import MenuIcon from '@mui/icons-material/Menu'

export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleCloseNavMenu = () => { setAnchorElNav(null) }
  const handleCloseUserMenu = () => { setAnchorElUser(null) }

  const onProjects = () => {
    handleCloseNavMenu()
    navigate('/projects')
  }

  const onPomodoro = () => {
    handleCloseNavMenu()
    navigate('/pomodoro')
  }

  const onLogout = () => {
    handleCloseUserMenu()
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  };
  const onLogin = () => {
    handleCloseUserMenu()
    navigate('/login')
  };

  const xsNavMenu = (
    <>
      <Typography
        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        variant="h6"     
        component="div"
        noWrap 
      >
        POMODOC
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          color="inherit"
          onClick={(e) => {setAnchorElNav(e.currentTarget)}}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          sx={{ display: { xs: 'block', md: 'none' } }}
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          keepMounted
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu} 
        >
          <MenuItem onClick={onProjects}>
            <Typography textAlign="center">Projects</Typography>
          </MenuItem>
          <MenuItem onClick={onPomodoro}>
            <Typography textAlign="center">Pomodoro</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  )

  const mdNavMenu = (
    <>
      <Typography
        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
        variant="h6"       
        component="div"
        noWrap        
      >
        POMODOC
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Button
          sx={{ my: 2, color: 'white', display: 'block' }}
          onClick={onProjects}
        >
          Projects
        </Button>
        <Button
          sx={{ my: 2, color: 'white', display: 'block' }}
          onClick={onPomodoro}
        >
          Pomodoro
        </Button>
      </Box>
    </>
  )

  const userMenu = (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton 
          sx={{ p: 0 }} 
          onClick={(e) => {setAnchorElUser(e.currentTarget)}}
        >
          <Avatar alt="Avatar" src="../../public/avatar.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"          
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {user
          ? [
              <MenuItem onClick={handleCloseUserMenu} key='Profile'>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>,
              <MenuItem onClick={onLogout} key='Logout'>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>,
              <MenuItem onClick={handleCloseUserMenu} key='Help'>
                <Typography textAlign="center">Help</Typography>
              </MenuItem>
          ]
          : [
            <MenuItem onClick={onLogin} key='Login'>
                <Typography textAlign="center">Login</Typography>
            </MenuItem>,
            <MenuItem onClick={handleCloseUserMenu} key='Help'>
              <Typography textAlign="center">Help</Typography>
            </MenuItem>
          ]
        }
      </Menu>
    </Box>
  )

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <>
            {xsNavMenu}
            {mdNavMenu}
            {userMenu}
          </>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

