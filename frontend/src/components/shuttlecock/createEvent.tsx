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
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";


//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import Checkbox from '@material-ui/core/Checkbox';


import { GroupInterface } from "../../models/IGroup";
import { GroupMemberInterface } from "../../models/IGroupMember";
import { UserDetailsInterface } from "../../models/IUser";
// import { JoinGroupInterface } from "../../models/IjoinGroup";
import { MembersInterface } from "../../models/IUser";
import { UsersInterface } from "../../models/ISignIn";
import { group } from "console";

import { useParams } from 'react-router-dom';
import { EventShuttInterface } from "../../models/IEvent";
import { EventGroupMemberInterface } from "../../models/IEventGroupMember";


const useStyles = makeStyles((theme: Theme) =>
  //การกำหนดลักษณะ

  createStyles({
    root: { flexGrow: 1 },

    container: { marginTop: theme.spacing(2) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

    table: { minWidth: 20 },

    position: { marginleft: theme.spacing(5) },

    tableSpace: { marginTop: 20 },
    tableContainer: { maxHeight: 480 },
    tableHead: {
      "& .MuiTableCell-head": {
        color: "white",
        backgroundColor: "navy",
      },
    },

    typoHeader: {
      fontWeight: "bold"
    },
    tableCellNormal: {
      color: "green",
    },
    tableCellDisabled: {
      color: "gray",
    }
  })
);
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};


export default function CreateEvent() {
  const classes = useStyles();
  const [showEvent, setShowEvent] = React.useState<EventShuttInterface[]>([]);

  // const [Detail, setDetail] = React.useState<Partial<UserDetailsInterface>>();
  const [groupMember, setGroupMember] = React.useState<GroupMemberInterface[]>([]);
  const [sentEvent, setSentEvent] = React.useState<Partial<EventShuttInterface>>({});
  // const [sentEvent,setsentEvent] = React.useState<Partial<JoinEventInterface>>({});



  const [msg, setMsg] = useState<string>("");

  // const [ShowjoinGroup, setShowjoinGroup] = React.useState<JoinGroupInterface[]>([]);

  const [selected, setSelected] = React.useState<number[]>([]);

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMassage] = useState("");
  const [trigger, setTrigger] = useState(0);


  const [selectedDateTimestart, setSelectedDateTimestart] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChangeTimestart = (date: Date | null) => {

    setSelectedDateTimestart(date);

  };

  const [selectedDateTimestop, setSelectedDateTimestop] = React.useState<Date | null>(
    new Date()
  );
  const handleDateChangeTimestop = (date: Date | null) => {

    setSelectedDateTimestop(date);

  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof sentEvent;
    setSentEvent({
      ...sentEvent,
      [name]: event.target.value,
    });
    //การล็อค หน่วยกิตตามใบลงทะเบียนเรียน
    // if (event.target.name === "RegistrationID") {
    //   setReg(Registration.find((r) => r.ID === event.target.value));
    // }
  };

  const handleClick = (event: React.MouseEvent<unknown>, item: number) => {
    const selectedIndex = selected.indexOf(item);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;



  let { id } = useParams()

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

  function makeid(length: any) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  // .{code: makeid(6)}
  let payload: any[] = [];
  function submit() {
    selected.forEach((id: number) => {
      let selectMember = groupMember.find(a => a.ID === id);
      payload = payload.concat({
        GroupMemberID: selectMember?.ID,

      })
    })
    let data = {
      Place: sentEvent?.Place,
      TimeStart: selectedDateTimestart,
      TimeStop: selectedDateTimestop,
      ShuttleCock: { Code: makeid(6) },
      EventGroupMember: payload,
      // selected.map((item: number) => {
      //   return {
      //     ID: item
      //   }
      // })


    };
    console.log(data);

    const apiUrl = "http://localhost:8080/event";
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        setTrigger(trigger + 1);
        if (res.data) {
          setSuccess(true);
          setMsg("Create Event success")
          setErrorMassage("")
        } else {
          setError(true);
          setErrorMassage(res.error)
        }
      });


  }




  useEffect(() => {
    getGroupMember();
    getEventMember();
  }, [trigger]);


  console.log(selected);
  console.log(sentEvent);

  return (
    <Container className={classes.container} maxWidth="lg">
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="success">
          {msg}
        </Alert>
      </Snackbar>
      <Snackbar autoHideDuration={3000} >
        <Alert onClose={handleClose} severity="error">
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
              Member in Group
            </Typography>
            <br />
          </Box>
        </Box>
        <Grid container spacing={3} className={classes.root}>
          <Box flexGrow={1}>
            <Button
              component={RouterLink}
              to="/SelectGroup"
              variant="contained"
              color="primary"
              style={{ float: "right" }}
            >
              Back
            </Button>
          </Box>
          <br />
          <br />
          <Divider />

        </Grid>

        <br />
        <br />
        <Divider />
        <br />

        <Grid container item xs={12} spacing={3} className={classes.root} style={{ marginTop: 5 }}>
          <Grid item xs={12}>
            <Typography className={classes.typoHeader} variant="subtitle2">

              <h3>GroupName : {groupMember[0]?.Group?.NameGroup}</h3>


            </Typography>
            <Grid container spacing={1} className={classes.root}>
              <Grid item xs={4}>
                <Typography >
                  <p>PLACE</p>
                  <TextField
                    id="Place"
                    type="string"
                    inputProps={{ name: "Place" }}
                    value={sentEvent?.Place}
                    onChange={handleChange}
                    label=""
                    variant="outlined"
                    //className ={classes.fullbox}
                    multiline
                    rows={1}
                  />
                  <br />
                  <br />
                  <br />



                </Typography>

              </Grid>
              <Grid item xs={4}>
                <p>TIME START</p>

                <form className={classes.container} noValidate>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      name="WatchedTime"
                      value={selectedDateTimestart}
                      onChange={handleDateChangeTimestart}
                      label=""
                      minDate={new Date("01-01-2018:00")}
                      format="dd/MM/yyyy hh:mm a"
                    />
                  </MuiPickersUtilsProvider>
                </form>
              </Grid>

              <Grid item xs={4}>

                <p>TIME END</p>

                <form className={classes.container} noValidate>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      name="WatchedTime"
                      value={selectedDateTimestop}
                      onChange={handleDateChangeTimestop}
                      label=""
                      minDate={new Date("01-01-2018T00:00")}
                      format="dd/MM/yyyy hh:mm a"
                    />
                  </MuiPickersUtilsProvider>
                </form>
              </Grid>
            </Grid>

            <br />
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table stickyHeader>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell width="5%" align="center">SELECT</TableCell>
                    <TableCell width="5%" align="center">Firstname</TableCell>
                    <TableCell width="5%" align="center">Lastname</TableCell>
                    <TableCell width="5%" align="center">Nickname</TableCell>
                    <TableCell width="10%" align="center">Tell</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {groupMember?.map((item: GroupMemberInterface) => {
                    const isItemSelected = isSelected(item.ID);
                    return (
                      <TableRow key={item.ID} >
                        <TableCell padding="checkbox" align="center">
                          <Checkbox
                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, item.ID)}
                          // inputProps={{ 'aria-label': 'primary checkbox' }}
                          />

                        </TableCell>
                        <TableCell align="center">{item.Member.UserDetail.FirstName}</TableCell>
                        <TableCell align="center">{item.Member.UserDetail.LastName}</TableCell>
                        <TableCell align="center">{item.Member.UserDetail.Nickname}</TableCell>
                        <TableCell align="center">{item.Member.UserDetail.PhoneNumber}</TableCell>
                      </TableRow>
                    )
                  })}




                </TableBody>

              </Table>
            </TableContainer>


          </Grid>
          <Grid item xs={7}>

            {/* <TableContainer component={Paper} className={classes.tableSpace}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>


                    <TableCell align="left" width="5%">
                      Place
                    </TableCell>

                    <TableCell align="center" width="10%">
                      TimeStart
                    </TableCell>

                    <TableCell align="center" width="10%">
                      TimeStop
                    </TableCell>

                    <TableCell align="center" width="8%">
                      Member
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
                          Add
                        </Button>

                      </TableCell>


                    </TableRow>
                  )
                  )}
                </TableBody>
              </Table>
            </TableContainer> */}



          </Grid>

        </Grid>
      </Paper>
      <br />
      <br />
      <br />

      <br />
      <Button
        component={RouterLink}
        to={"/HistoryEvent/"+id}
        variant="contained"
        color="primary"
        style={{ float: "right" }}
      >
        history event
      </Button>

      <Button
        style={{ float: "right" }}
        onClick={submit}
        variant="contained"
        color="primary"
      >
        Create EVENT
      </Button>


    </Container>



  );
}
