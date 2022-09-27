import React, { useState } from "react";

// import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";

import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import PersonPinIcon from "@material-ui/icons/PersonPin";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { UsersInterface } from "../models/ISignIn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { WatchDirectoryFlags } from "typescript";



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
    drawer : { width: 250 },
    colorbar:{
      background: 'linear-gradient(45deg, #8458B3 30%, #8458B3 70%, #d0bdf4 100%)',
    },
    colorbuttom:{
      background: 'linear-gradient(45deg, #8458B3 30%, #8458B3 70%, #d0bdf4 100%)',

    }
  }),
);


function Navbar() {

 const classes = useStyles();
 const [openDrawer, setOpenDrawer] = useState(false);
 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 const openMenu = Boolean(anchorEl);
 const [user, setUser] = useState<UsersInterface>();
 const [role, setRole] = useState("");


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
    {name: "AccountInfomation", icon: <PersonPinIcon  />, path: "/AccountInfomation"},
    {name: "Player", icon: <PersonPinIcon  />, path: "/player"},
    {name: "shuttlecock", icon: <PersonPinIcon  />, path: "/SelectGroup"},
    {name: "Summarize", icon: <PersonPinIcon  />, path: "/summarize"},
    {name: "status", icon: <PersonPinIcon  />, path: "/status"},
 ]
 const SignOut = () => {
  localStorage.clear();
  window.location.href = "/";
}
 return (

    <div className={classes.root} >
      <AppBar position="static" className={classes.colorbar} >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
         
            onClick={toggleDrawer(true)} 
           
          
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
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
            <Button
              component={RouterLink}
              to="/" 
              style={{ 
                textTransform: "none", 
                backgroundColor: "transparent", 
                borderRadius: 0
              }}
          >
          <Typography variant="h6" className={classes.title}>
                
          </Typography>
          </Button>
          </Box>

        
          <MenuItem onClick={SignOut}><ExitToAppIcon style={{ marginRight: ".5rem" }}/>Log out</MenuItem>

          {/* <div style={{marginRight: ".5rem"}}>
            <Typography align="right" variant="subtitle2">
              
            </Typography>
          </div>
          <div>
            
                <Button onClick={SignOut}  color="inherit" style={{ marginRight: 12 }}>
                  ออกจากระบบ
                </Button>
                
            
              
          </div> */}
        </Toolbar>

      </AppBar>
    </div>
 );

}

export default Navbar;