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
import { EventGroupMemberInterface } from "../../models/IEventGroupMember";
//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { EventShuttInterface } from "../../models/IEvent";
import { useParams } from "react-router-dom";
import { GroupInterface } from "../../models/IGroup";
// import { EmployeesInterface } from "../../models/IUser";
import { GroupMemberInterface } from "../../models/IGroupMember";

import { Details } from "@material-ui/icons";
//import { stringify } from "querystring";

import moment from "moment";
import id from "date-fns/locale/id";

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

export default function HistoryEvent() {
   const classes = useStyles();

  //  const [showEvent,setShowEvent] = React.useState<EventGroupMemberInterface[]>([]);
   const [event, setevent] = React.useState<EventGroupMemberInterface>();
   const [showEvent, setShowEvent] = React.useState<EventShuttInterface[]>([]);
   const [groupMember, setGroupMember] = React.useState<GroupMemberInterface[]>([]);

   let { id } = useParams()

   const getEventMember = async () => {
    // const event: Ebe = JSON.parse(localStorage.getItem("user") || "");

    const apiUrl = `http://localhost:8080/listevent/${id}`;

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
          setShowEvent(res.data);
        } else {
          console.log("else");
        }
      });
  };

  
  const getGroupMember = async () => {

    const apiUrl = `http://localhost:8080/groupmember/${id}`;

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
          setGroupMember(res.data);
        } else {
          console.log("else");
        }
      });
  };




  useEffect(() => {
    getEventMember();
    getGroupMember();
  }, []);



 
  return (
    <Container className={classes.container} maxWidth="lg">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Player
            </Typography>
            <Typography variant="subtitle2">

              <h3>GroupName : {groupMember[0]?.Group?.NameGroup}</h3>


            </Typography>
          </Box>
        </Box>
        <Grid container spacing={3} className={classes.root}>
        
          <Grid item xs={12}>
          <Button
            component={RouterLink}
            to="/SelectGroup"
            variant="contained"
            color="primary"
            style={{ float: "right" }}
          >
            Back
          </Button>
            
          </Grid>
        </Grid>
   
        
    <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="left" width="8%">
                  Place
                </TableCell> 

                <TableCell align="center" width="15%">
                  TimeStart
                </TableCell>

                <TableCell align="center" width="15%">
                  TimeStop
                </TableCell>

                <TableCell align="center" width="12%">
                  Member
                </TableCell>


                <TableCell align="center" width="12%">
                  shuttlecock
                </TableCell>
                
              </TableRow>
            </TableHead>
            
            <TableBody>
                  {showEvent.map((item: EventShuttInterface) => (
                    <TableRow key={item.ID}>
                      <TableCell align="left">{item.Place}</TableCell>
                      <TableCell align="left">{moment(item.TimeStart).format("DD/MM/YYYY hh:mm A")}</TableCell>
                      <TableCell align="left">{moment(item.TimeStop).format("DD/MM/YYYY hh:mm A")}</TableCell>
                      <TableCell align="center">
                        <Button
                          component={RouterLink}
                          to={"/memberinevent"}
                          variant="contained"
                          color="primary"
                        >
                          member
                        </Button>

                      </TableCell>
                      <TableCell align="center">
                        <Button
                          // component={RouterLink}
                          // to={"/memberinevent"}
                          variant="contained"
                          color="primary"
                        >
                          Shuttlecock
                        </Button>

                      </TableCell>


                    </TableRow>
                  )
                  )}
                </TableBody>
            





          </Table>
        </TableContainer>
   
    </Container>
    
    
  );
}

