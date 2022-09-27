import React, { MouseEvent, useEffect, useState } from "react";
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
import Menu from "@material-ui/core/Menu";

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


// import { EmployeesInterface } from "../../models/IUser";
import { GroupInterface } from "../../models/IGroup";
import { UsersInterface } from "../../models/ISignIn";
import { MembersInterface } from "../../models/IUser";
import { Details } from "@material-ui/icons";
import { GroupMemberInterface } from "../../models/IGroupMember";
//import { stringify } from "querystring";

import moment from "moment";
import { group } from "console";
import { EventShuttInterface } from "../../models/IEvent";
import userEvent from "@testing-library/user-event";

const useStyles = makeStyles((theme: Theme) =>
  //การกำหนดลักษณะ


  createStyles({
    root: { flexGrow: 1 },

    container: { marginTop: theme.spacing(2) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

    table: { minWidth: 650 },

    position: { marginleft: theme.spacing(5) },

    tableSpace: { marginTop: 20 },

    menuBox: {
      padding: theme.spacing(3),
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  })
);
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function SelectGroup() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  //Ex1
  const [ShowGroup, setShowGroup] = React.useState<GroupInterface[]>([]);
  const [sentGroup, setsentGroup] = React.useState<Partial<GroupInterface>>({});
  //Ex2
  const [joinGroup, setjoinGroup] = React.useState<Partial<GroupMemberInterface>>({});
  const [ShowjoinGroup, setShowjoinGroup] = React.useState<GroupMemberInterface[]>([]);


  const [user, setUser] = useState<UsersInterface>();


  //  const [shutt, setshutt] = React.useState<Partial<ShuttInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMassage] = useState("");
  const [trigger, setTrigger] = useState(0);
  const [triggerjoin, setTriggerjoin] = useState(0);

  const [msg,setMsg] = useState<string>("");

  const getUser = async () => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
  }



  const getjoinGroup = async () => {
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
          setShowjoinGroup(res.data);
        } else {
          console.log("else");
        }
      });
  };







  const handleChangeCreateGroup = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name1 = event.target.name as keyof typeof sentGroup;
    const name2 = event.target.name as keyof typeof joinGroup;
    setsentGroup({
      ...sentGroup,
      [name1]: event.target.value,
    })
    setjoinGroup({
      ...joinGroup,
      [name2]: event.target.value,
    }

    );

    // // //การล็อครายละเอียดโปรโมชั่นตามชื่อ
    // if (event.target.name === "CodeGroup") {
    //   setShowGroup(se.find((r) => r.ID === event.target.value));
    // }
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof ShowGroup;
    const { value } = event.target;
    setShowGroup({ ...ShowGroup, [id]: value === "" ? "" : Number(value) });
  };


  let length: number

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


  function submit() {
    let data = {
      CreatedMemberID: user?.ID,
      NameGroup: sentGroup.NameGroup,
      CodeGroup: makeid(5),

    };
    console.log(data);

    const apiUrl = "http://localhost:8080/creategroup";
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
        console.log(res);
        if (res.data) {
          setSuccess(true);
          setMsg("Create group success")
          setErrorMassage("");
        } else {
          setError(true);
          setErrorMassage(res.error)
        }
      });


  }


  function submitjoingroup() {
    let data = {
      MemberID: user?.ID,
      CodeGroup: sentGroup?.CodeGroup,
    };
    console.log(data);

    const apiUrl = "http://localhost:8080/joingroup";
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
        setTriggerjoin(triggerjoin + 1);
        if (res.data) {
          setSuccess(true);
          setMsg("Join group success")
          setErrorMassage("")
        } else {
          setError(true);
          setErrorMassage(res.error)
        }
      });
  }


  useEffect(() => {
    getUser();
  }, []);
  
  useEffect(() => {
    getjoinGroup();
  }, [trigger,triggerjoin]);



  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    // if (localStorage.getItem("role") === "Member")
    //   getPremiumMember();
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  console.log(ShowGroup);


  console.log(sentGroup.NameGroup)
  //console.log(sentGroup.CodeGroup)

  return (
    <Container className={classes.container} maxWidth="md">
       <Snackbar open={success} autoHideDuration={3000}onClose={handleClose} >
        <Alert onClose={handleClose} severity="success">
          {msg}
        </Alert>
      </Snackbar>
      <Snackbar autoHideDuration={3000} >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
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
            Select Group
          </Typography>
        </Box>
      </Box>
      <br />
      <br />
      <br />
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={6}>
          Join Group :
          <TextField
            id="CodeGroup"
            type="string"
            inputProps={{ name: "CodeGroup" }}
            value={sentGroup.CodeGroup}
            onChange={handleChangeCreateGroup}
            label=""
            // variant="outlined"
            //className ={classes.fullbox}
            multiline
          // rows={}
          />

          <Button
            style={{ float: "right" }}
            onClick={submitjoingroup}
            variant="contained"
            color="primary"
          >
            Join Group
          </Button>
        </Grid>


        <Box flexGrow={1}>

          <Button
            // component={RouterLink}
            // to="/CreateGroup"
            variant="contained"
            // color="primary"
            style={{ float: "right" }}
            onClick={handleMenu}
            aria-haspopup="true"
            color="secondary"

          >
            CreateGroup
          </Button>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            getContentAnchorEl={null}
            open={openMenu}
            onClose={handleClose}
          >
            <Box className={classes.menuBox}>
              <Grid container spacing={1} className={classes.root}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" noWrap>
                    <p>Name Group</p>
                    <TextField
                      id="NameGroup"
                      type="string"
                      inputProps={{ name: "NameGroup" }}
                      value={sentGroup.NameGroup}
                      onChange={handleChangeCreateGroup}
                      label=""
                      variant="outlined"
                      //className ={classes.fullbox}
                      multiline
                      rows={1}
                    />
                    <br />
                    <br />
                    <br />
                    <Button
                      style={{ float: "right" }}
                      onClick={submit}
                      variant="contained"
                      color="primary"
                    >
                      Create Group
                    </Button>


                  </Typography>

                </Grid>









              </Grid>

              {/* <Typography variant="body2" color="inherit" noWrap>
                {getRole()}
                {premiumMembers.length !== 0 ? (
                  <>
                    <br/><br/>
                    ID: {premiumMembers[premiumMembers.length - 1].PremiumMemberID}<br/>
                    Class: {premiumMembers[premiumMembers.length - 1].MemberClass.Name}<br/>
                    Point: {premiumMembers[premiumMembers.length - 1].Point}
                  </>) : <></>}
              </Typography> */}
            </Box>
          </Menu>



        </Box>
        <br />
        <br />
        <Divider />

      </Grid>


      <TableContainer component={Paper} className={classes.tableSpace}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" width="15%">
                No.
              </TableCell>
              <TableCell align="left" width="15%">
                Code
              </TableCell>

              <TableCell align="left" width="15%">
                NamesGroup
              </TableCell>
              <TableCell align="left" width="15%">

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {ShowjoinGroup.map((group: GroupMemberInterface, index) => (
              <TableRow key={group.ID} >
                <TableCell align="left" >{index + 1}</TableCell>

                <TableCell align="left">{group.Group.CodeGroup}</TableCell>

                <TableCell align="left">{group.Group.NameGroup}</TableCell>
                <TableCell align="left">
                  <Button
                    component={RouterLink}
                    to={"/CreateEvent/" + group.Group.ID.toString()}
                    variant="contained"
                    color="primary"
                  >
                    member
                  </Button>

                </TableCell>





              </TableRow>
            ))}
          </TableBody>


        </Table>
      </TableContainer>


    </Container>


  );
}

