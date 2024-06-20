import * as React from 'react';
import {
  Button,
  Typography,
  Toolbar,
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  IconButton,
  Drawer,
  Divider,
  Box,
  AppBar,
  Avatar,
  MenuItem,
  Menu,
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { logo} from '../../constants/Images';
import { headerColor, primaryColor, textColor, textSecondaryColor } from '../../constants/Colors';
import { fontFamily } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';
import ScrollToHide01 from '../../utils/ScrollToHide';

const drawerWidth = 240;
const navItems = [
  {
    id: 1,
    name: "Home",
    path: "/"
  },
  {
    id: 2,
    name: "Find a Job",
    path: "/findAJob"
  },
  {
    id: 3,
    name: "Contact",
    path: "/contactUs"
  },
  {
    id: 4,
    name: "About",
    path: "/aboutUs"
  },
  {
    id: 5,
    name: "Privacy",
    path: "/privacyPolicy"
  },
];

const authNavItems = [
  {
    id: 1,
    name: "Login",
    path: "/login"
  },
  {
    id: 2,
    name: "Register",
    path: "/register"
  },
];



const settings = [{ id: 1, label: 'Dashboard', path: "/dashboard" }];

export default function Header(props) {
  const navigate = useNavigate();
  const { user, logout } = React.useContext(AppContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const open = Boolean(anchorElUser);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (item) => {
    setAnchorElUser(null);
    navigate(item.path)
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}> 
      <img src={logo} alt="BHS" style={{ width: "40%", marginTop: "10px" }}  />
      <Divider />
      <List>
        {
          user ? (
            navItems.slice(0, 4).map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton onClick={() => navigate(`${item.path}`)} sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))
          )
            : (
              navItems.map((item) => (
                <ListItem key={item} disablePadding>
                  <ListItemButton onClick={() => navigate(`${item.path}`)} sx={{ textAlign: 'center' }}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))
            )
        }
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <ScrollToHide01>
        <AppBar component="nav" sx={{ background: headerColor, boxShadow: `0 4px 2px -2px #e1e1e1` }}>
          <Toolbar sx={{ padding: "20px" }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon style={{ color: textColor }} />
            </IconButton>
            <Box component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            
              <img src={logo} alt="BHS" style={{ width: "8%" }} onClick={()=>navigate("/")}/>
          
              <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                
                <Box sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: "40px" }}>
                  {
                    navItems.map((item) => (
                      <Button onClick={() => navigate(`${item.path}`)} key={item} sx={{
                        color: textColor, fontSize: "14px", fontWeight: "600", padding: "6px 14px", "&:hover": {
                          color: primaryColor,
                        }
                      }}>
                        {item.name}
                      </Button>
                    ))
                  }
                </Box>
              </Box>
              {
                user && (
                  <Box component="div" sx={{}}>
                    <Box component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleOpenUserMenu}
                      >
                        <Avatar sx={{ width: 40, height: 40 }}>

                          {user?.userImage ? (
                            <img src={user?.userImage} alt="user" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
                          ) : (
                            user?.user?.charAt(0).toUpperCase()
                          )
                          }

                        </Avatar>
                      </Button>
                      <Box component="div">
                        <Typography sx={{
                          color: textColor,
                          fontSize: "20px"
                        }}>
                          {user?.name}
                        </Typography>
                        <Typography sx={{
                          color: primaryColor,
                        }}>
                          {user?.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElUser}

                      keepMounted

                      open={open}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem onClick={() => handleCloseUserMenu(setting)}>
                          <Typography sx={{ color: "black" }}>{setting.label}</Typography>
                        </MenuItem>
                      ))}
                      <MenuItem onClick={() => logout()}>
                        <Typography sx={{ color: "black" }}>Log out</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                )
              }
              {
                !user && (
                  <Box component="div" sx={{}}>
                    <Box component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {authNavItems.map((item) => (

                        <Button onClick={() => navigate(`${item.path}`)} key={item} sx={{
                          color: textColor, fontSize: "14px", fontWeight: "600", padding: "6px 14px", "&:hover": {
                            color: primaryColor,
                          }
                        }}>
                          {item.name}
                        </Button>

                      ))}
                    </Box>
                  </Box>
                )


              }
            </Box>


          </Toolbar>
        </AppBar>
      </ScrollToHide01>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
