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
import EditIcon from '@material-ui/icons/Edit';
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveIcon from '@material-ui/icons/Save';
import { Details } from "@material-ui/icons";
//import { stringify } from "querystring";

import moment from "moment";

import { MembersInterface, UserDetailsInterface, UserRolesInterface } from "../models/IUser";
import { UsersInterface } from "../models/ISignIn";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const useStyles = makeStyles((theme: Theme) =>
  //การกำหนดลักษณะ


  createStyles({
    root: { flexGrow: 1 },

    container: { marginTop: theme.spacing(2) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

    table: { minWidth: 650 },

    position: { marginleft: theme.spacing(5) },

    tableSpace: { marginTop: 20 },
    colorbuttom:{
      background: 'linear-gradient(45deg, #DC143C 30%, #DC143C 70%)',
  
    }
  })
);
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function AccountInfomation() {
  const classes = useStyles();

  const [Member, setMember] = React.useState<Partial<UsersInterface>>();
  const [user, setUser] = React.useState<Partial<UsersInterface>>({});
  const [userdetail, setuserdetail] = React.useState<Partial<UserDetailsInterface>>({});

  const [account, setaccount] = React.useState<Partial<UsersInterface>>({});
  const [role, setRole] = useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [memberchang, setmemberchang] = React.useState<number | string>("")
  const [errorMessage, setErrorMessage] = React.useState("");

  function cancelUpdateMS() {
    localStorage.removeItem("update_status");
    localStorage.removeItem("update_msID");
    localStorage.removeItem("update_mwtID");
    localStorage.removeItem("check_mwtID");
  }


  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof userdetail;
    const { value } = event.target;
    if (id === "PriceShutt") {
      setuserdetail({ ...userdetail, [id]: value === "" ? 0 : Number(value) });
    }
    else {
      setuserdetail({ ...userdetail, [id]: value });
    }
  };


  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof user;
    setUser({
      ...user,
      [name]: event.target.value,
    });
    // //การล็อครายละเอียดโปรโมชั่นตามชื่อ
    // if (event.target. === "NamePromotionID") {
    //   setdetail(NamePromotion.find((r) => r.ID === event.target.value));
    // }
  };

  const [btnDisabled, setBtnDisabled] = useState(true)
  const handleClickedit = () =>{
    setBtnDisabled(!btnDisabled)
  }



  const getmember = async () => {
    const apiUrl = `http://localhost:8080/userdetail`;

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res.data);

        if (res.data) {
          setMember(res.data);
        } else {
          console.log("else");
        }
      });
  };


  function editAcount() {
    let newAccount = {
      ID: userdetail.ID,
      PriceShutt: userdetail.PriceShutt,
      PhoneNumber: userdetail.PhoneNumber,
      PromtPay: userdetail.PromtPay,
    }

    console.log(newAccount)
    const apiUrlUpdate = "http://localhost:8080/updateaccount";
    const requestUpdateOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    }

    fetch(apiUrlUpdate, requestUpdateOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          const member: MembersInterface = JSON.parse(localStorage.getItem("user") || "")
          member.UserDetail = res.data as UserDetailsInterface
          localStorage.setItem("user", JSON.stringify(member))
          setBtnDisabled(!btnDisabled)
        } else {
          console.log(res.error);
          setError(true);
          // setErrorMsg(res.error);
        }
      });
  }

  useEffect(() => {
    // getmember();
    setuserdetail(JSON.parse(localStorage.getItem("user") || "")?.UserDetail)
    // setUser(JSON.parse(localStorage.getItem("user") || ""));
    // const getToken = localStorage.getItem("token");
    // if (getToken) {
    //   setUser(JSON.parse(localStorage.getItem("user") || ""));
    //   setRole(localStorage.getItem("role") || "");
    // } 
  }, []);

  console.log(userdetail)


  return (
    <Container className={classes.container} maxWidth="sm">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
        Edit success
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
        Edit Unsuccess
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
            Account Infomation
          </Typography>
        </Box>
      </Box>

      <br />
      <br />
      <Divider />
      <br />
      <Grid container spacing={1} className={classes.root}>


        <Grid item xs={4}>
          <p>Firstname</p>
          <TextField
            size = "small"
            variant="outlined"
            value={userdetail.FirstName}
            disabled
          />

        </Grid>

        <Grid item xs={4}>
          <p>Lastname</p>
          <TextField
            size = "small"
            variant="outlined"
            value={userdetail.LastName}
            multiline rows={1}
            disabled
          />

        </Grid>
        <Grid item xs={4}>
          <p>Nickname</p>
          <TextField
          size = "small"
            variant="outlined"
            value={userdetail.Nickname}
            multiline rows={1}
            disabled
          />

        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={4}>
          <p>PhoneNumber</p>
          <TextField
            size = "small"
            id="PhoneNumber"
            variant="outlined"
            value={userdetail.PhoneNumber}
            disabled={btnDisabled}
            onChange={handleInputChange}


          />


        </Grid>
        <Grid item xs={4}>
          <p>PromtPay</p>
          <TextField
            size = "small"
            id="PromtPay"
            variant="outlined"
            value={userdetail.PromtPay}
            disabled={btnDisabled}
            onChange={handleInputChange}

          />

        </Grid>
        <Grid item xs={4}>
          <p>Price/Shuttlecock</p>

          <TextField
            id="PriceShutt"
            variant="outlined"
            value={userdetail.PriceShutt}
            // inputProps={{ name: "PriceShutt" }}
            size = "small"
            onChange={handleInputChange}
            disabled={btnDisabled}
            InputProps={{
              startAdornment: <InputAdornment position="start">฿</InputAdornment>,
            }}


          />

        </Grid>
      </Grid>
      <br />
      <br />

      <Grid item xs={12}>
        <Button
          style={{ float: "right" }}
          variant="contained"
          color="primary"
          className={classes.colorbuttom}
          onClick={editAcount}
          disabled = {btnDisabled}
        >
          <SaveIcon/>&nbsp;
          save
        </Button>

        <Button
          style={{ float: "right", marginRight: "15px" }}        
          variant="contained"
          color="primary"
          className={classes.colorbuttom}
          onClick={handleClickedit}
        >
          <EditIcon/>&nbsp;
          edit
        </Button>

      </Grid>










    </Container>


  );
}

