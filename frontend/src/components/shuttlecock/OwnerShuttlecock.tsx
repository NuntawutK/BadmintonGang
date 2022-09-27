import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, Paper, Select } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
//import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
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

//time
// import { KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from "@material-ui/pickers";

// import { EmployeesInterface } from "../../models/IUser";


import { Details } from "@material-ui/icons";
//import { stringify } from "querystring";

import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  //การกำหนดลักษณะ

  createStyles({
    root: { flexGrow: 1 },

    container: { marginTop: theme.spacing(2) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

    table: { minWidth: 20 },

    position: { marginleft: theme.spacing(5) },

    tableSpace: { marginTop: 20 },
  })
);
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
export default function OwnShuttlecock() {
   const classes = useStyles();
//   const [selectedDate, setSelectedDate] = React.useState<Date | null>(
//     new Date()
//   );

  
//   const [success, setSuccess] = React.useState(false);
//   const [error, setError] = React.useState(false);
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
//   const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSuccess(false);
//     setError(false);
//   };

//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
//   };

//   const handleInputChange = (
//     event: React.ChangeEvent<{ id?: string; value: any }>
//   ) => {
//     const id = event.target.id as keyof typeof Promotion;
//     const { value } = event.target;
//     setPromotion({ ...Promotion, [id]: value === "" ? "" : Number(value) });
//   };
//   const handleChange = (
//     event: React.ChangeEvent<{ name?: string; value: unknown }>
//   ) => {
//     const name = event.target.name as keyof typeof Promotion;
//     setPromotion({
//       ...Promotion,
//       [name]: event.target.value,
//     });
//     //การล็อครายละเอียดโปรโมชั่นตามชื่อ
//     if (event.target.name === "NamePromotionID") {
//       setdetail(NamePromotion.find((r) => r.ID === event.target.value));
//     }
//   };
 


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
//   const getNamePromotion = async () => {
//     const apiUrl = `http://localhost:8080/getnamepromotion`;

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
//           setNamePromotion(res.data);
//         } else {
//           console.log("else");
//         }
//       });
//   };
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

// //   useEffect(() => {
// //     getNamePromotion();
// //     getPromotionPeriod();
// //     getPromotionType();
// //   }, []);
const [selectedDate, setSelectedDate] = React.useState<Date | null>(

  new Date()

);
const handleDateChange = (date: Date | null) => {

  setSelectedDate(date);

};
 
  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar  autoHideDuration={3000} >
        <Alert  severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar  autoHideDuration={3000} >
        <Alert  severity="error">
          บันทึกข้อมูลไม่สำเร็จ 
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <br />
          <br />
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              align="center"
            >
              Select Shuttlecock
            </Typography>
            <br />
          </Box>
        </Box>
        
        <br />
        <br />
        <Divider />
        <br />

        <Grid container spacing={3} className={classes.root}>
        <Grid item xs={3}>
            <p>Group</p>
            <FormControl fullWidth variant="outlined">
            <Select>
              
            <MenuItem value={0} key={0}>
              Select Group
            </MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <p>Owner Shuttlecock</p>
            <FormControl fullWidth variant="outlined">
            <Select>
              
            <MenuItem value={0} key={0}>
              Select Owner Shuttlecock
            </MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Order</p>
              <Select
                //การกำหนดค่า
                //value={Promotion.NamePromotionID}
                //เปลี่ยนค่าที่รับเข้ามาจาก Value
                //onChange={handleChange}
                //กำหนดให้ value
                inputProps={{
                  name: "NamePromotionID",
                }}
                defaultValue={0}
              >
                <MenuItem value={0} key={0}>
                  Select Order
                </MenuItem>
                {/* {NamePromotion.map((item: NamePromotionsInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
                ) */}
              </Select>
            </FormControl>
            
          </Grid>
          {/* <Grid container spacing={3} className={classes.root}>
          <Grid item xs={4}>
            <p>TimeDate</p>
            <FormControl fullWidth variant="outlined"> */}

{/* <MuiPickersUtilsProvider utils={DateFnsUtils}>

  <KeyboardDatePicker

    margin="normal"

    id="BirthDay"

    format="yyyy-MM-dd"

    value={""}

    onChange={handleDateChange}
    KeyboardButtonProps={{

      "aria-label": "change date",

    }}

  />

</MuiPickersUtilsProvider> */}

{/* </FormControl>
          </Grid>
     
          </Grid> */}
                

          

          
         

         

          <Grid item xs={12}>
            <Button
              style={{ float: "right" }}
              //onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>

              <TableCell align="left" width="5%">
                  Group
                </TableCell>
              <TableCell align="left" width="15%">
                Owner Shuttlecock

                </TableCell> 

                <TableCell align="left" width="8%">
                  Order
                </TableCell>
                <TableCell align="left" width="8%">
                  DateTime
                </TableCell>

               

                

                
              </TableRow>
            </TableHead>

           
          </Table>
        </TableContainer>
    </Container>

    

  );
}
