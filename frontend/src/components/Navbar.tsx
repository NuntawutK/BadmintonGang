import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import GroupIcon from '@material-ui/icons/Group';
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,

    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
    menuBox: { 
        padding: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    drawer : { 
      width: 250,
      marginTop: theme.spacing(5),

      // background: 'linear-gradient(45deg, #EE6262 30%, #EE6262 70%, #EE6262 100%)',

     },
    colorbar:{
      background: 'linear-gradient(45deg, #981919 30%, #EE6262 70%, #981919 100%)',
    },
    colorbuttom:{
      background: 'linear-gradient(45deg, #981919 30%, #EE6262 70%, #981919 100%)',

    },  
  }),

);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}


function Navbar() {

 const classes = useStyles();
 const [openDrawer, setOpenDrawer] = useState(false);
 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 const openMenu = Boolean(anchorEl);


const handleClose = () => {
  setAnchorEl(null);
}

 const toggleDrawer = (state: boolean) => (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpenDrawer(state);
  }
  
 const menu = [
    {name: "AccountInfomation", icon: <AccountCircleIcon color="secondary" />, path: "/AccountInfomation"},
    {name: "ManageGroup", icon: <SportsTennisIcon color="secondary" />, path: "/SelectGroup"},
    {name: "Player", icon: <GroupIcon color="secondary" />, path: "/player"},
    {name: "Summarize", icon: <AttachMoneyIcon color="secondary" />, path: "/summarize"},
    // {name: "status", icon: <StorageIcon color="secondary" />, path: "/status"},
 ]
 const SignOut = () => {
  localStorage.clear();
  window.location.href = "/";
}
 return (

    <div className={classes.root} >
      <AppBar position="static" className={classes.colorbar} >
        <Toolbar  >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
         
            onClick={toggleDrawer(true)} 
           
          
          >
            <MenuIcon />
          </IconButton>
          
          <Drawer open={openDrawer} onClose={toggleDrawer(false) }>
            <List 
              className={classes.drawer} 
              onClick={toggleDrawer(false)} 
              onKeyDown={toggleDrawer(false)}
            >
              
              {menu.map((item, index) => (
                <ListItem key={index} button component={RouterLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.name}</ListItemText>
                </ListItem>
              ))}
              
            </List>
          </Drawer>
          <Box className={classes.title}>
         
          <Typography variant="h6" className={classes.title}>
                Menu
          </Typography>
       
          </Box>

        
          <MenuItem onClick={SignOut}><ExitToAppIcon style={{ marginRight: ".5rem" }}/>Log out</MenuItem>
        </Toolbar>

      </AppBar>
    </div>
 );

}

export default Navbar;