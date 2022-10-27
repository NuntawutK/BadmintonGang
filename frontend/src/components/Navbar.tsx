import React, { useState } from "react";

// import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import GroupIcon from '@material-ui/icons/Group';
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
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StorageIcon from '@material-ui/icons/Storage';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
        </Toolbar>

      </AppBar>
    </div>
 );

}

export default Navbar;