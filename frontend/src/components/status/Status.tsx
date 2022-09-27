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

    table: { minWidth: 650 },

    position: { marginleft: theme.spacing(5) },

    tableSpace: { marginTop: 20 },
  })
);
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function Status() {
   const classes = useStyles();
   const [managepromotion, setmanagepromotion] = React.useState();

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
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  
 
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
              Status
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={3} className={classes.root}>
        <Grid item xs={4}>
            <p>Select Group</p>
            <FormControl fullWidth variant="outlined">
            <Select>
              
            <MenuItem value={0} key={0}>
              Select Group
            </MenuItem>
            </Select>
            </FormControl>
          </Grid>
        </Grid>
        
    <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="left" width="8%">
                  No.
                </TableCell> 

                <TableCell align="left" width="8%">
                  Name
                </TableCell>

                <TableCell align="center" width="12%">
                payment amount
                </TableCell>

                <TableCell align="center" width="12%">
                Payment Method
                </TableCell>

                <TableCell align="center" width="10%">
                  Status
                </TableCell>          
              </TableRow>
            </TableHead>

            {/* <TableBody>
              {map((managepromotion: OwnerShuttlecock) => (
                <TableRow key={managepromotion.ID}>
                  <TableCell align="left">{managepromotion.PromotionCode}</TableCell>

                  <TableCell align="left">{}</TableCell>

                 
                              
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
   
        {/* // <Container className={classes.container} maxWidth="md">
        
        // <Paper className={classes.paper}>
        //     <Box display="flex">
        //     <br />
        //     <br />
        //     <Box flexGrow={1}>
        //         <Typography
        //         component="h2"
        //         variant="h6"
        //         color="primary"
        //         gutterBottom
        //         align="center"
        //         >
        //         ข้อมูลผู้เล่น
        //         </Typography>
        //         <br />
        //     </Box>
        //     </Box>   
        //     <br />
        //     <br />
        //     <Divider />
        //     <br />
        // </Paper>
        // </Container> */}
    </Container>
    
    
  );
}

