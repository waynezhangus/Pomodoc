import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import useRouteMatch from '../hooks/useRouteMatch'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'

import MenuIcon from '@mui/icons-material/Menu'

export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  
  const routeMatch = useRouteMatch(['/projects', '/pomodoro']);
  const currentTab = routeMatch?.pattern?.path;

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const onCloseNavMenu = () => { setAnchorElNav(null) }
  const onCloseUserMenu = () => { setAnchorElUser(null) }
  
  const onLogout = () => {
    onCloseUserMenu()
    dispatch(logout())
    dispatch(reset())
    navigate('/')
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
          onClose={onCloseNavMenu} 
        >
          <MenuItem onClick={onCloseNavMenu} component={Link} to='/projects'>
            <Typography textAlign="center">Projects</Typography>
          </MenuItem>
          <MenuItem onClick={onCloseNavMenu} component={Link} to='/pomodoro'>
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
        <Tabs
            value={currentTab ?? false}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
        >
          <Tab label='Projects' value='/projects' component={Link} to='/projects' />
          <Tab label='Pomodoro' value='/pomodoro' component={Link} to='/pomodoro'/>
        </Tabs>
      </Box>
    </>
  )

  const timeNow = (new Date()).getHours()
  const timeString = (timeNow < 6) ? 'night' 
                        : (timeNow < 12) ? 'morning'
                        : (timeNow < 18) ? 'afternoon'
                        : 'evening'

  const userMenu = (
    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
      <Typography
        sx={{ flexGrow: 1 }}
        variant="subtitle2"       
        component="div"
        noWrap        
      >
        {user ? (`Good ${timeString}, ${user.name}.`) : 'Welcome! Please log in.'}
      </Typography>
      <Tooltip title="Open settings">
        <IconButton 
          sx={{ p: 0, ml: 2 }} 
          onClick={(e) => {setAnchorElUser(e.currentTarget)}}
        >
          <Avatar alt="Avatar" src={`https://api.multiavatar.com/${user?._id ?? ''}.png`} />
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
        onClose={onCloseUserMenu}
      >
        {user
          ? [ 
              <MenuItem onClick={onLogout} key='Logout'>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>,
              <MenuItem onClick={onCloseUserMenu} key='Profile' component={Link} to='/settings'>
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>,
              <MenuItem onClick={onCloseUserMenu} key='Help'>
                <Typography textAlign="center">Help</Typography>
              </MenuItem>,
          ]
          : [
            <MenuItem onClick={onCloseUserMenu} key='Login' component={Link} to='/login'>
                <Typography textAlign="center">Login</Typography>
            </MenuItem>,
            <MenuItem onClick={onCloseUserMenu} key='Help'>
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

