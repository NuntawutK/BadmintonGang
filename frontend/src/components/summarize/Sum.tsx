import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles, withStyles } from "@material-ui/core/styles";
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
import PropTypes from 'prop-types';


//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useParams } from "react-router-dom";

import { GroupInterface } from "../../models/IGroup";
// import { EmployeesInterface } from "../../models/IUser";
import { UsersInterface } from "../../models/ISignIn";

import { Details } from "@material-ui/icons";
//import { stringify } from "querystring";

import moment from "moment";
import { GroupMemberInterface } from "../../models/IGroupMember";
import { MembersInterface } from "../../models/IUser";
import { group } from "console";
import { EventShuttInterface } from "../../models/IEvent";
import { EventGroupMemberInterface } from "../../models/IEventGroupMember";
import { ShuttleCockInterface } from "../../models/IShuttleCock";
import { EventGroupmemberShuttlecockInterface } from "../../models/IEventGroupMemberShuttlecock";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme: Theme) =>
  //การกำหนดลักษณะ


  createStyles({
    root: { flexGrow: 1, display: 'flex' },

    container: { marginTop: theme.spacing(2) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

    table: { minWidth: 400 },

    position: { marginleft: theme.spacing(5) },

    tableSpace: { marginTop: 20 },
  })
);


const StyledTableHead = withStyles((theme) => ({
  head: {
    backgroundColor: '#334756',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function Row(props: any) {
  const { event } = props;
  const [openRow, setOpenRow] = React.useState(false);

  const [shutt, setshutt] = React.useState<ShuttleCockInterface[]>([]);
  function getDetailEvent() {
    const apiUrl = "http://localhost:8080/sum/eventshutt/"+ event.EventShuttID;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setshutt(res.data)
        }
      });
  }

  React.useEffect(() => {
    getDetailEvent()
  }, [])

  return (
    <React.Fragment>
      <TableRow key={event.EventShutt?.ID}>
        <TableCell>
          <IconButton aria-label="expand row" size="medium" onClick={() => setOpenRow(!openRow)}>
            {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{event.EventShutt?.ID}</TableCell>
        <TableCell align="center">{event.EventShutt?.Place}</TableCell>
        <TableCell align="center">{moment(event.EventShutt?.TimeStart).format("DD/MM/YYYY hh:mm A")}{" TO "}{moment(event.EventShutt?.TimeStop).format("DD/MM/YYYY hh:mm A")}</TableCell>
        </TableRow>
        <TableRow>

          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
            <Collapse in={openRow} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                รายละเอียด
              </Typography>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" >No.</TableCell>
                    <TableCell align="center" >Owner shut</TableCell>
                    <TableCell align="center" >quantity</TableCell>
                    {/* <TableCell align="center" > Total price</TableCell> */}
                    <TableCell align="center"> PromtPay</TableCell>
                    {/* <TableCell align="center">slip</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shutt.map((shutt: ShuttleCockInterface,index:number) => (
                    <TableRow key={shutt.ID} hover >
                      <TableCell component="th" scope="row" align="center">{index+1}</TableCell>
                      <TableCell align="center">{shutt.Member.UserDetail.Nickname}</TableCell>
                      <TableCell align="center">{shutt.Member.UserDetail.Nickname.length}</TableCell>
                      <TableCell align="center">{shutt.Member.UserDetail.PhoneNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
   
    </React.Fragment>
  )
}

Row.propTypes = {
  event: PropTypes.object
}


export default function DataPlayer() {
  const classes = useStyles();


  // List group by member id
  const [groupMember, setGroupMember] = React.useState<GroupMemberInterface[]>([]);
  // select group for getGroupmemberID
  const [selectgroupMember, setselectGroupMember] = React.useState<GroupMemberInterface>();
  // use eventID find event
  const [eventgroupMember, seteventGroupMember] = React.useState<EventGroupMemberInterface[]>([]);



  

  const getGroupMember = async () => {
    const user: UsersInterface = JSON.parse(localStorage.getItem("user") || "");
    const apiUrl = `http://localhost:8080/memberingroup/${user?.ID}`;

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

  const geteventGroupMemberlist = async () => {
    const apiUrl = `http://localhost:8080/sum/groupmember/${selectgroupMember?.ID}`;

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
          seteventGroupMember(res.data);
        } else {
          console.log("else");
        }
      });
  };



  const handleChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setselectGroupMember(groupMember.find(g => g.ID === event.target.value as number))
  };




  useEffect(() => {
    // getGroup();
    getGroupMember();

  }, []);

  useEffect(() => {
    geteventGroupMemberlist();
  }, [selectgroupMember?.ID]);


  return (
    <Container className={classes.container} maxWidth="md">
      <Paper className={classes.paper}>

        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Summary
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={3}>
            <p>Select Group</p>
            <FormControl fullWidth variant="outlined">
              <Select
                // value={selectedGroup?.ID || 0}
                //เปลี่ยนค่าที่รับเข้ามาจาก Value
                onChange={handleChange}
                //กำหนดให้ value
                inputProps={{
                  name: "ID",
                }}
                defaultValue={0}
              >
                <MenuItem value={0} key={0}>
                  Select Group
                </MenuItem>
                {groupMember.map((item: GroupMemberInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Group.NameGroup}
                  </MenuItem>)
                )}

              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container className={classes.root}>
          <Grid container item xs={12} spacing={3} className={classes.root} style={{ marginTop: 5 }} >

            <TableContainer component={Paper} className={classes.tableSpace} style={{ marginLeft: '1.1rem' }}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableHead width="1%" />
                    <StyledTableHead align="center" width="20%">
                      No.
                    </StyledTableHead>
                    <StyledTableHead align="center" width="20%">
                      place
                    </StyledTableHead>
                    <StyledTableHead align="center" width="20%">
                      Time
                    </StyledTableHead>

                  </TableRow>
                </TableHead>

                <TableBody>
                  {eventgroupMember.map((event: EventGroupMemberInterface) => (
                    <Row event={event} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Container>


  );
}

