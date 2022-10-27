import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles, ThemeProvider, createTheme } from "@material-ui/core/styles";
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
import CropFreeIcon from '@material-ui/icons/CropFree';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
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
    colorbuttom: {
      background: 'linear-gradient(45deg, #DC143C 30%, #DC143C 70%)',
    },
    selectimage: {
      display: 'none',
    },
    image: {
      borderRadius: "20px",
    }
  })
);




const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function AccountInfomation() {

  const classes = useStyles();
  // const theme = createTheme();


  const [userdetail, setuserdetail] = React.useState<Partial<UserDetailsInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);



  const [trigger, setTrigger] = useState(0);


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


  const [btnDisabled, setBtnDisabled] = useState(true)
  const handleClickedit = () => {
    setBtnDisabled(!btnDisabled)
  }



  function editAcount() {
    let newAccount = {
      ID: userdetail.ID,
      PriceShutt: userdetail.PriceShutt,
      PhoneNumber: userdetail.PhoneNumber,
      PromtPay: userdetail.PromtPay,
      Qrcode: image.src,
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



  const [image, setImage] = useState({ name: "", src: "" });
  const handleChangeimages = (event: any, id?: string) => {
    const input = event.target.files[0];
    const idimage = event.target.id as keyof typeof userdetail;

    var reader = new FileReader();
    reader.readAsDataURL(input)
    reader.onload = function () {
      const dataURL = reader.result;
      setImage({ name: input.name, src: dataURL?.toString() as string });
    };
    if (id === "Qrcode") {
      setuserdetail({ ...userdetail, [idimage]: input });
    }




  };



  useEffect(() => {
    setuserdetail(JSON.parse(localStorage.getItem("user") || "")?.UserDetail);
  }, [handleChangeimages]);

  console.log(userdetail)


  return (

    // <ThemeProvider theme = {theme}>
    <Container className={classes.container} maxWidth="sm">
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
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
            size="small"
            variant="outlined"
            value={userdetail.FirstName}
            disabled
          />

        </Grid>

        <Grid item xs={4}>
          <p>Lastname</p>
          <TextField
            size="small"
            variant="outlined"
            value={userdetail.LastName}
            multiline rows={1}
            disabled
          />

        </Grid>
        <Grid item xs={4}>
          <p>Nickname</p>
          <TextField
            size="small"
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
            size="small"
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
            size="small"
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
            size="small"
            onChange={handleInputChange}
            disabled={btnDisabled}
            InputProps={{
              startAdornment: <InputAdornment position="start">฿</InputAdornment>,
            }}


          />

        </Grid>
        <Grid item xs={6}>
          <p>Upload Qrcode</p>
          <input
            accept="image/*"
            type="file"
            // name="file"
            // id="Qrcode"
            id="contained-button-file"
            // placeholder="Upload an image"
            onChange={handleChangeimages}
            style={{ float: "left" }}
            disabled={btnDisabled}
            className={classes.selectimage}
            multiple
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" disabled={btnDisabled}>
              Upload&nbsp;&nbsp;
              <CropFreeIcon />
            </Button>
          </label>
        </Grid>
        <Grid item xs={6} >
          <img src={userdetail?.Qrcode} width="150px" style={{ float: "right" }} className={classes.image}></img>
        </Grid>
      </Grid>
      {/* <img src= {image.src}  width="50px" ></img> */}
      <br />
      <br />

      <Grid item xs={12}>
        <Button
          style={{ float: "right" }}
          variant="contained"
          color="primary"
          className={classes.colorbuttom}
          onClick={editAcount}
          disabled={btnDisabled}
        >
          <SaveIcon />&nbsp;
          save
        </Button>

        <Button
          style={{ float: "right", marginRight: "15px" }}
          variant="contained"
          color="primary"
          className={classes.colorbuttom}
          onClick={handleClickedit}
        >
          <EditIcon />&nbsp;
          edit
        </Button>

      </Grid>










    </Container>
    // </ThemeProvider>

  );
}


