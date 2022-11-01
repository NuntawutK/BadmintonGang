import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles, ThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, Paper, Select } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { MembersInterface, UserDetailsInterface } from "../models/IUser";

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
    },
    text:{
      [`& fieldset`]:{
        borderRadius: "20px",
        borderWidth: "3px",
      }
    
    }

  })
);




const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function AccountInfomation() {

  const classes = useStyles();
  const [userdetail, setuserdetail] = React.useState<Partial<UserDetailsInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
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
    setuserdetail({ ...userdetail, [id]: value });  
  };


  const [btnDisabled, setBtnDisabled] = useState(true)
  const handleClickedit = () => {
    setBtnDisabled(!btnDisabled)
  }
  const [errorMessage, setErrorMassage] = useState("");



  function editAcount() {
    let newAccount = {
      ID: userdetail.ID,
      FirstName: userdetail.FirstName,
      LastName: userdetail.LastName,
      Nickname: userdetail.Nickname,
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
          setErrorMassage("");
          const member: MembersInterface = JSON.parse(localStorage.getItem("user") || "")
          member.UserDetail = res.data as UserDetailsInterface
          localStorage.setItem("user", JSON.stringify(member))
          setBtnDisabled(!btnDisabled)
        } else {
          console.log(res.error);
          setError(true);
          setErrorMassage(res.error);
        }
      });
  }



  const [image, setImage] = useState({ name: "", src: "" });

  const handleChangeimages = (event: any, id?: string) => {
    const input = event.target.files[0];
    const name = event.target.name as keyof typeof userdetail;

    var reader = new FileReader();
    reader.readAsDataURL(input)
    reader.onload = function () {
      const dataURL = reader.result;
      setImage({ name: input.name, src: dataURL?.toString() as string });
      if (event.target.name === "Qrcode") {
        setuserdetail({ ...userdetail, [name]: dataURL?.toString() });
      }
    };
  };



  useEffect(() => {
    setuserdetail(JSON.parse(localStorage.getItem("user") || "")?.UserDetail);
  }, []);

  console.log(userdetail)


  return (
    <Container className={classes.container} maxWidth="sm">
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Edit success
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
            className={classes.text}
            disabled
          />

        </Grid>

        <Grid item xs={4}>
          <p>Lastname</p>
          <TextField
            size="small"
            variant="outlined"
            value={userdetail.LastName}
            className={classes.text}
            disabled
          />

        </Grid>
        <Grid item xs={4}>
          <p>Nickname</p>
          <TextField
            size="small"
            variant="outlined"
            value={userdetail.Nickname}
            className={classes.text}
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
            className={classes.text}
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
            className={classes.text}
            disabled={btnDisabled}
            onChange={handleInputChange}

          />

        </Grid>
        <Grid item xs={6}>
          <p>Upload Qrcode</p>
          <input
            accept="image/*"
            type="file"       
            id="Qrcode"
            name="Qrcode"
            onChange={handleChangeimages}
            style={{ float: "left" }}
            disabled={btnDisabled}
            className={classes.selectimage}
          />
          <label htmlFor="Qrcode">
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

  );
}


