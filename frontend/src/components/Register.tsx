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

import { MembersInterface,UserDetailsInterface,UserRolesInterface } from "../models/IUser";
import { UsersInterface } from "../models/ISignIn";

const useStyles = makeStyles((theme: Theme) =>
  //การกำหนดลักษณะ
  

  createStyles({
    root: { flexGrow: 1 },

    container: { marginTop: theme.spacing(2) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

    table: { minWidth: 650 },

    position: { marginleft: theme.spacing(5) },

    tableSpace: { marginTop: 20 },
  })
);
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function AccountInfomation() {
   const classes = useStyles();

  //  const [manageMember, setmanageMember] = React.useState<Partial<MembersInterface[]>>([]);

   const [Detail, setDetail] = React.useState<Partial<UserDetailsInterface>>();



//   const [selectedDate, setSelectedDate] = React.useState<Date | null>(
//     new Date()
//   );

  
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
//   const [errorMessage, setErrorMassage] = useState(""); 



//   const [Promotion, setPromotion] = React.useState<Partial<OwnerShuttlecock>>({
//     NamePromotionID: 0,
//     PromotionPeriodID: 0,
//     PromotionTypeID: 0,
//     MinPrice: 0,
//     Discount: 0,
//   });
//   const [NamePromotion, setNamePromotion] = React.useState<NamePromotionsInterface[]>([]);
//   const [PromotionPeriod, setPromotionPeriod] = React.useState<PromotionPeriodsInterface[]>([]);
//   const [PromotionType, setPromotionType] = React.useState<PromotionTypesInterface[]>([]);
//   const [detail,setdetail] = React.useState<NamePromotionsInterface>()
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
//   };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Detail;
    const { value } = event.target;
    setDetail({ ...Detail, [id]: value === "" ? "" : Number(value) });
  };
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof Detail;
    setDetail({
      ...Detail,
      [name]: event.target.value,
    });
    // //การล็อครายละเอียดโปรโมชั่นตามชื่อ
    // if (event.target. === "NamePromotionID") {
    //   setdetail(NamePromotion.find((r) => r.ID === event.target.value));
    // }
  };
 


//   function submit() {

   


//     let data = {
//       PromotionPeriodID: Promotion?.PromotionPeriodID,
//       NamePromotionID: Promotion?.NamePromotionID,
//       PromotionTypeID: Promotion?.PromotionTypeID,
//       MinPrice: typeof Promotion?.MinPrice === "string" ? (Promotion?.MinPrice === "" ? 0 : Promotion?.MinPrice) : Promotion?.MinPrice,
//       Discount: typeof Promotion?.Discount === "string" ? (Promotion?.Discount === "" ? 0 : Promotion?.Discount) : Promotion?.Discount,
//       PromotionCode: Promotion?.PromotionCode,
//       Createdatetime: selectedDate,
//     }; 
//     console.log(data);
//     const apiUrl = "http://localhost:8080/createpromotion";
//     const requestOptions = {
//       method: "POST",
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     };

//     fetch(apiUrl, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           setSuccess(true);
//           setErrorMassage("")
//         } else {
//           setError(true);
//           setErrorMassage(res.error)
//         }
//       });
   
    
//   }
  const getMember = async () => {
    const apiUrl = `http://localhost:8080/manageMember`;

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
          setDetail(res.data);
        } else {
          console.log("else");
        }
      });
  };
//   const getPromotionPeriod = async () => {
//     const apiUrl = `http://localhost:8080/getpromotionperiod`;

//     const requestOptions = {
//       method: "GET",

//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//     };
//     //การกระทำ
//     fetch(apiUrl, requestOptions)
//       .then((response) => response.json())

//       .then((res) => {
//         console.log(res.data);

//         if (res.data) {
//           setPromotionPeriod(res.data);
//         } else {
//           console.log("else");
//         }
//       });
//   };
//   const getPromotionType = async () => {
//     const apiUrl = `http://localhost:8080/getpromotiontype`;

//     const requestOptions = {
//       method: "GET",

//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//     };
//     //การกระทำ
//     fetch(apiUrl, requestOptions)
//       .then((response) => response.json())

//       .then((res) => {
//         console.log(res.data);

//         if (res.data) {
//           setPromotionType(res.data);
//         } else {
//           console.log("else");
//         }
//       });
//   };

//   console.log(Promotion);

  useEffect(() => {
    getMember();
  }, []);

  
  
 
  return (
    <Container className={classes.container} maxWidth="md">
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
        <p>UserID</p>
        <TextField    
                variant="outlined"
                label="UserID"
                value={Detail?.Code}
                multiline rows={1}
              />
        </Grid>
        <Grid item xs={4}>
        <p>Password</p>
        <TextField
            variant="outlined"
            // margin="normal"
            // required
            name="Password"
            label="Password"
            type="password"
            id="Password"
            autoComplete="current-password"
            
          />
         </Grid>
         <Grid item xs={4}>       
         </Grid>
        <Grid item xs={4}>
        <p>Firstname</p>
            <TextField 
            variant="outlined"
            value={Detail?.FirstName}
            multiline rows={1}
             />

        </Grid>
        <Grid item xs={4}>
        <p>Lastname</p>
        <TextField 
        variant="outlined"
        value={Detail?.LastName}
        multiline rows={1}
         />

        </Grid>
        <Grid item xs={4}>
        <p>Nickname</p>
        <TextField 
            variant="outlined"
            value={Detail?.Nickname}
            multiline rows={1} />

        </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.root}>
        <Grid item xs={4}>
        <p>Tell</p>
        <TextField 
          variant="outlined"
          value={Detail?.PhoneNumber}
          multiline rows={1}
        />


        </Grid>
        <Grid item xs={4}>
        <p>PromtPay</p>
        <TextField 
          variant="outlined"
          value={Detail?.PromtPay}
          multiline rows={1}
        />

        </Grid>
        <Grid item xs={4}>
        <p>Price/Shuttlecock</p>
        
        <TextField 
          variant="outlined"
          value={Detail?.PriceShutt}
          multiline rows={1}
        />

        </Grid>
        </Grid>
        <br />
        <br />

        <Grid item xs={12}>
            <Button
              style={{ float: "right" }}
              //onClick={submit}
              variant="contained"
              color="primary"
            >
              Register
            </Button>
            
    
            
          </Grid>
        



        
        
        

        
         
    </Container>
    
    
  );
}

