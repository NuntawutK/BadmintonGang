import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import { SigninInterface } from "../models/ISignIn";
import { url } from "inspector";
import shuttlecock from "../image/shuttlecock.png"
import { Opacity } from "@material-ui/icons";


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ForDevLoginShow() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <Button onClick={() => {setOpen(open => !open)}}>
        {open ? (<div>[ hide ]</div>) : (<div>[ show ]</div>)}
      </Button> */}
      {open && (
        <div style={{textAlign: "left"}}>

          
        </div>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({

  image:{
    // backgroundImage:`url("https://cdn.dribbble.com/users/427368/screenshots/10977733/media/08c4814eaa402b580cfbc6b3c39011da.png?compress=1&resize=400x300")`,
    // opacity: "0.3",
    display: "absolute",
    marginTop:theme.spacing(-50),
    marginLeft:theme.spacing(-5),
    zIndex: -1,
    // width: "500px"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage: `url(${shuttlecock})`,
    height: "500px",
    width: "450px",    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    background: 'linear-gradient(45deg, #EE6262 30%, #EE6262 70%)',
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(45deg, #EE6262 30%, #EE6262 70%)',
  },
  root: { flexGrow: 1 },
  colorbuttom:{
    background: 'linear-gradient(45deg, #981919 30%, #EE6262 70%, #981919 100%)',

  },
  text:{
    [`& fieldset`]:{
      borderRadius: "20px",
    }
  
  }
  
  
  
}));




function SignIn() {
  const classes = useStyles();
  const [signin, setSignin] = useState<Partial<SigninInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const login = () => {
    const apiUrl = "http://127.0.0.1:8080/login";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        if (res.data) {
          setError(false);
          setSuccess(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("role", res.data.role);
          window.location.reload();
        } else {
          setError(true);
        }
      });
  };

  const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

  const keyPressEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.stopPropagation();
      login();
    }
    
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  // console.log(signin);

  return (
   
    <Container component="main" maxWidth="xs" >
      
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
        login successfully
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          User or Password incorrect
        </Alert>
      </Snackbar>
      <CssBaseline />

      <div className={classes.paper}>
      
        <Avatar className={classes.avatar}>
          <SportsTennisIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align="center">
          Sign in
        </Typography>

        <ForDevLoginShow />
        
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Username"
            name="Username"
            autoComplete="user_name"
            autoFocus
            value={signin.Username || ""}
            onChange={handleInputChange}
            onKeyDown={keyPressEnter}
            className={classes.text}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            type="password"
            id="Password"
            autoComplete="current-password"
            value={signin.Password || ""}
            onChange={handleInputChange}
            onKeyDown={keyPressEnter}
            className={classes.text}
          />
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={login}
          >
            SIGN IN
          </Button>
         
          
          
        </form>
          
        <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
        <Button
            component={RouterLink}
            to="/Register"
            variant="contained"
            color="secondary"
            style={{ float: "right" }}
            className={classes.submit}
          >
            Register
          </Button>
    
        </Grid>
        </Grid>
         
      </div>
      {/* <img src = {shuttlecock}    style={{ float: "inline-start" }}  className={classes.image}> 
      </img> */}
      
    </Container>
   
   
  );
  
}

export default SignIn;
