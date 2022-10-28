import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, Paper, Select } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import { Details } from "@material-ui/icons";
//import { stringify } from "querystring";

import moment from "moment";

import { MembersInterface, UserDetailsInterface, UserRolesInterface } from "../models/IUser";
import { UsersInterface, SigninInterface } from "../models/ISignIn";

const useStyles = makeStyles((theme: Theme) =>
  //การกำหนดลักษณะ


  createStyles({
    root: { flexGrow: 1 },

    container: { marginTop: theme.spacing(2) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

    table: { minWidth: 650 },

    position: { marginleft: theme.spacing(5) },

    tableSpace: { marginTop: 20 },

    image:{
      // backgroundImage:`url("https://cdn.dribbble.com/users/427368/screenshots/10977733/media/08c4814eaa402b580cfbc6b3c39011da.png?compress=1&resize=400x300")`,
      opacity: "0.3",
    },
    text:{
      [`& fieldset`]:{
        borderRadius: "20px",
      }
    
    }
  })
);
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function AccountInfomation() {
  const classes = useStyles();
  // const [Detail, setDetail] = React.useState<Partial<UserDetailsInterface>>();
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [register, setregister] = React.useState<Partial<MembersInterface>>({});
  const [registerlogin, setregisterlogin] = React.useState<Partial<SigninInterface>>({
    Username: "",
    Password: "",
  });
  const [registerdetail, setregisterdetail] = React.useState<Partial<UserDetailsInterface>>({
    FirstName: "",
    LastName: "",
    Nickname: "",
    PhoneNumber: "",
    PromtPay: "",
    PriceShutt: 0,
  });
  const [errorMessage, setErrorMassage] = useState("");


  const [role, setrole] = React.useState<UserRolesInterface[]>([]);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const [btnDisabled, setBtnDisabled] = useState(true)
  const handleInputChangelogin = (event: React.ChangeEvent<{ id?: string; value: any; name?: string }>) => {
    const id = event.target.id as keyof typeof registerlogin;
    const { value } = event.target;
    const { dis } = event.target.value;
    setregisterlogin({ ...registerlogin, [id]: value });

    // setBtnDisabled(!value)

  };

  const handleInputChangedetail = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
    const id = event.target.id as keyof typeof registerdetail;
    const { value } = event.target;
    const { dis } = event.target.value;
    setregisterdetail({ ...registerdetail, [id]: value });
    // setBtnDisabled(!value)
  };


  function submitRegister() {
    let data = {
      UserLogin: {
        Username: registerlogin.Username,
        Password: registerlogin.Password,
      },
      UserDetail: {
        FirstName: registerdetail.FirstName,
        LastName: registerdetail.LastName,
        Nickname: registerdetail.Nickname,
        PhoneNumber: registerdetail.PhoneNumber,
        PromtPay: registerdetail.PromtPay,
        PriceShutt: Number(registerdetail.PriceShutt),
      },



    };
    console.log(data);
    const apiUrl = "http://localhost:8080/register";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          setErrorMassage("")

        } else {
          setError(true);
          setErrorMassage(res.error)
          if (res.error == "UNIQUE constraint failed: members.user_login_id") {
            setErrorMassage("user duplicate")
          } else {
            setErrorMassage(res.error)
          }

        }
      });


  }
  useEffect(() => {

  }, []);

  console.log(registerdetail)
  console.log(registerlogin)



  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Register successfully
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
          >
            <br />
            Register
          </Typography>
        </Box>
      </Box>

      <br />
      <br />
      <Divider />
      <br />
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={4}>
          <p>Username</p>
          <TextField
            className={classes.text}
            variant="outlined"
            // label="UserID"
            value={registerlogin.Username}
            onChange={handleInputChangelogin}
            id="Username"
            size = "small"
          />
        </Grid>
        <Grid item xs={4}>
          <p>Password</p>
          <TextField
            className={classes.text}
            variant="outlined"
            // margin="normal"
            // required
            name="Password"
            // label="Password"
            type="password"
            id="Password"
            autoComplete="current-password"
            size = "small"
            value={registerlogin.Password}
            onChange={handleInputChangelogin}


          />
        </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
          <p>Firstname</p>
          <TextField
            className={classes.text}
            size = "small"  
            variant="outlined"
            value={registerdetail.FirstName}
            onChange={handleInputChangedetail}
            id="FirstName"

          />

        </Grid>
        <Grid item xs={4}>
          <p>Lastname</p>
          <TextField
            className={classes.text}
            size = "small"
            variant="outlined"
            value={registerdetail.LastName}
            onChange={handleInputChangedetail}
            id="LastName"
          />

        </Grid>
        <Grid item xs={4}>
          <p>Nickname</p>
          <TextField
            className={classes.text}
            size = "small"
            variant="outlined"
            value={registerdetail.Nickname}
            onChange={handleInputChangedetail}
            id="Nickname"
          />

        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={4}>
          <p>Tell</p>
          <TextField  
            className={classes.text}
            size = "small"
            variant="outlined"
            value={registerdetail.PhoneNumber}
            onChange={handleInputChangedetail}
            id="PhoneNumber"

          />


        </Grid>
        <Grid item xs={4}>
          <p>PromtPay</p>
          <TextField
            className={classes.text}
            size = "small"
            variant="outlined"
            value={registerdetail.PromtPay}
            onChange={handleInputChangedetail}
            id="PromtPay"

          />

        </Grid>
        <Grid item xs={4}>
          <p>Price/Shuttlecock</p>

          <TextField
            className={classes.text}
            size = "small"
            variant="outlined"
            value={registerdetail.PriceShutt}
            onChange={handleInputChangedetail}
            id="PriceShutt"
          />

        </Grid>
      </Grid>
      <br />
      <br />

      <Grid item xs={12}>
        <Button
          component={RouterLink}
          to="../"
          variant="contained"
          color="secondary"
        >
          Back
        </Button>
        <Button
          style={{ float: "right" }}
          variant="contained"
          color="primary"
          disabled={registerlogin.Password === "" ||
            registerlogin.Username === "" ||
            registerdetail.FirstName === "" ||
            registerdetail.LastName === "" ||
            registerdetail.Nickname === "" ||
            registerdetail.PhoneNumber === "" ||
            registerdetail.PromtPay === "" ||
            registerdetail.PriceShutt === 0}
          onClick={submitRegister}
        >
          Register
        </Button>
        <br/>
        <br/>
        <br/>
        <img src="https://cdn-icons-png.flaticon.com/512/2633/2633874.png" alt="Cinque Terre"   width="300" style={{ float: "right" }} className={classes.image}> 
      </img>
      



      </Grid>










    </Container>


  );
}

