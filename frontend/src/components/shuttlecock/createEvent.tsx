import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, Paper, Select } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { GroupMemberInterface } from "../../models/IGroupMember";
import { UsersInterface } from "../../models/ISignIn";
import { useParams } from 'react-router-dom';
import { EventShuttInterface } from "../../models/IEvent";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
const useStyles = makeStyles((theme: Theme) =>
  //การกำหนดลักษณะ

  createStyles({
    root: {
      flexGrow: 1,
    },

    container: {
      marginTop: theme.spacing(1),
    },

    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,

    },

    table: { minWidth: 20 },

    position: { marginleft: theme.spacing(5) },

    tableSpace: { marginTop: 20 },
    tableContainer: { maxHeight: 480 },
    tableHead: {
      "& .MuiTableCell-head": {
        color: "white",
        backgroundColor: "#DC143C",
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
    },
    text: {
      [`& fieldset`]: {
        borderRadius: "20px",
        borderWidth: "3px",
      }

    },
    checkbox: {
      [`& .MuiSvgIcon-root`]:
      {
        borderRadius: "20px"
        
      }
    }
  })
);
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};


export default function CreateEvent() {
  const classes = useStyles();
  const [showEvent, setShowEvent] = React.useState<EventShuttInterface[]>([]);
  const [groupMember, setGroupMember] = React.useState<GroupMemberInterface[]>([]);
  const [sentEvent, setSentEvent] = React.useState<Partial<EventShuttInterface>>({
    Place: "",

  });

  const [msg, setMsg] = useState<string>("");
  const [user, setUser] = React.useState<UsersInterface>();
  const [role, setRole] = useState("");
  const [selected, setSelected] = React.useState<number[]>([

  ]);

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
          const user: UsersInterface = JSON.parse(localStorage.getItem("user") || "");
          setSelected([res.data?.find((m: GroupMemberInterface) => m.Member.ID === user?.ID)?.ID])

        } else {
          console.log("else");
        }
      });
  };



  const getEventMember = async () => {

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
      EventGroupMember: payload,
      GroupID: Number(id),
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
          window.location.href = "/manageEvent/"+id
          
        } else {
          console.log(res.error)
          setError(true);
          setErrorMassage(res.error)
        }
      });


  }





  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
      setRole(localStorage.getItem("role") || "");
    }

    getGroupMember();
    getEventMember();
  }, [trigger]);


  console.log(selected);
  console.log(sentEvent);

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="success">
          {msg}
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={5000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
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
              CREATE EVENT
            </Typography>
            <br />
          </Box>
        </Box>
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/SelectGroup"
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
            >
              <ArrowBackIosIcon />
              Back
            </Button>


          </Grid>



          <br />
          <br />
          <Divider />


        </Grid>

        <br />
        <br />
        <Divider />

        <br />
        <Grid item xs={12}>
          <Button
            component={RouterLink}
            to={"/manageEvent/" + id}
            variant="contained"
            color="secondary"
            style={{ float: "right" }}
          >
            manage event
          </Button>

        </Grid>
        <br />

        <Grid container item xs={12} spacing={3} className={classes.root} style={{ marginTop: 5 }}>
          <Grid item xs={12}>
            <Typography className={classes.typoHeader} variant="subtitle2">

              GROUP NAME : {groupMember[0]?.Group?.NameGroup}


            </Typography>
            <Grid container spacing={1} className={classes.root}>
              <Grid item xs={5}>
                <Typography >
                  <p>PLACE</p>
                  <TextField
                    id="Place"
                    type="string"
                    inputProps={{ name: "Place" }}
                    size="small"
                    value={sentEvent?.Place}
                    onChange={handleChange}
                    label=""
                    variant="outlined"
                    className={classes.text}
                    multiline
                    rows={1}
                  />
                </Typography>

              </Grid>
              <Grid item xs={7}>
                <p>TIME START</p>

                <form className={classes.container} noValidate>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      name="WatchedTime"
                      size="small"
                      value={selectedDateTimestart}
                      onChange={handleDateChangeTimestart}
                      label=""
                      minDate={new Date("01-01-2018:00")}
                      format="dd/MM/yyyy hh:mm a"
                    />
                  </MuiPickersUtilsProvider>
                </form>
              </Grid>
              <Grid item xs={5}>
              </Grid>
              <Grid item xs={7}>

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
                    <TableCell width="1%" align="center">SELECT</TableCell>
                    <TableCell width="20%" align="center">Name</TableCell>
                    <TableCell width="6%" align="left">Nickname</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {groupMember?.map((item: GroupMemberInterface) => {
                    let isItemSelected = isSelected(item.ID);
                    return (
                      <TableRow key={item.ID} >
                        <TableCell padding="checkbox" align="center" >
                          <Checkbox

                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, item.ID)}
                            disabled={item.ID === groupMember.find((m: GroupMemberInterface) => m.Member.ID === user?.ID)?.ID}
                          />

                        </TableCell>
                        <TableCell align="center">{item.Member.UserDetail.FirstName}{"  "}{item.Member.UserDetail.LastName}</TableCell>
                        <TableCell align="left">{item.Member.UserDetail.Nickname}</TableCell>
                      </TableRow>
                    )
                  })}




                </TableBody>

              </Table>
            </TableContainer>


          </Grid>

          <Grid item xs={12}>
            <Button
              
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="secondary"
              disabled={(sentEvent.Place === "")}
            >
              Create EVENT
            </Button>
          </Grid>

        </Grid>
      </Paper>
      <br />
      <br />
      <br />

      <br />





    </Container>



  );
}
