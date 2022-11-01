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
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import GroupIcon from '@material-ui/icons/Group';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import { GroupInterface } from "../../models/IGroup";
import { UsersInterface } from "../../models/ISignIn";
import { GroupMemberInterface } from "../../models/IGroupMember";
import { useParams } from "react-router-dom";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme: Theme) =>
  //การกำหนดลักษณะ


  createStyles({
    root: { flexGrow: 1 },

    container: { marginTop: theme.spacing(2),
      
     },

    paper: { padding: theme.spacing(2), 
      color: theme.palette.text.secondary 
    },

    table: { minWidth: 10 },

    position: { marginleft: theme.spacing(5) },

    tableSpace: { marginTop: 20, },

    menuBox: {
      padding: theme.spacing(3),
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
    colorbuttom:{
      background: 'linear-gradient(45deg, #DC143C 30%, #DC143C 70%)',
  
    },
    tableHead: {
      "& .MuiTableCell-head": {
        color: "white",
        backgroundColor: "#DC143C",
      },
      
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

export default function SelectGroup() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [ShowGroup, setShowGroup] = React.useState<GroupInterface[]>([]);
  const [sentGroup, setsentGroup] = React.useState<Partial<GroupInterface>>({});
  const [joinGroup, setjoinGroup] = React.useState<Partial<GroupMemberInterface>>({});
  const [ShowjoinGroup, setShowjoinGroup] = React.useState<GroupMemberInterface[]>([]);
  const [groupMember, setGroupMember] = React.useState<GroupMemberInterface[]>([]);
  const [user, setUser] = useState<UsersInterface>();
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMassage] = useState("");
  const [trigger, setTrigger] = useState(0);
  const [triggerjoin, setTriggerjoin] = useState(0);

  const [msg, setMsg] = useState<string>("");

  const getUser = async () => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
  }

  
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
          if (res.error == "UNIQUE constraint failed: groups.name_group") {
            setErrorMassage("GROUP NAME duplicate")
          }else if (res.error == "UNIQUE constraint failed: groups.code_group"){
            submit();
          }else{
            setErrorMassage(res.error)
          }
         

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
    getGroupMember();
  }, []);

  useEffect(() => {
    getjoinGroup();
  }, [trigger, triggerjoin]);



  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    // if (localStorage.getItem("role") === "Member")
    //   getPremiumMember();
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  console.log(ShowGroup);
  const handleCloseregister = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={3000} onClose={handleCloseregister} >
        <Alert onClose={handleCloseregister} severity="success">
          {msg}
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={5000} onClose={handleCloseregister} >
        <Alert onClose={handleCloseregister} severity="error">
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
            Create and Select Group
          </Typography>
        </Box>
      </Box>
      <br />
      <br />
      <br />
      <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12}>
        <Button     
            variant="contained"
            style={{ float: "right" }}
            onClick={handleMenu}
            aria-haspopup="true"
            color="secondary"
            className={classes.colorbuttom}


          >
            <GroupIcon/>&nbsp;CreateGroup
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
                      className={classes.text}
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
                      className={classes.colorbuttom}
                    >
                      Create Group
                    </Button>


                  </Typography>

                </Grid>
              </Grid>
            </Box>
          </Menu>

        </Grid>
        <br/>
        <br/>
        <br/>
        <Grid item xs={6}>
          Join Group 
          <br/>
          <TextField
            id="CodeGroup"
            type="string"
            inputProps={{ name: "CodeGroup" }}
            value={sentGroup.CodeGroup}
            onChange={handleChangeCreateGroup}
            label=""
            multiline
          />

        </Grid>
        
        <Grid item xs={12}>
        <Button
            style={{ float: "left" }}
            size = "small"
            onClick={submitjoingroup}
            variant="contained"
            color="primary"
            className={classes.colorbuttom}
          >
            <GroupAddIcon/>&nbsp; Join Group
           
          </Button>
        </Grid>

        <br />
        <br />
        <Divider />

      </Grid>


      <TableContainer component={Paper} className={classes.tableSpace}>
        <Table className={classes.table} aria-label="simple table" size="medium">
          <TableHead className = {classes.tableHead}>
            <TableRow>
              <TableCell align="left" width="1%">
                No.
              </TableCell>
              <TableCell align="left" width="3%">
                Code
              </TableCell>

              <TableCell align="left" width="4%">
                Name
              </TableCell>

              <TableCell align="left" width="4%">
                Create
                Event
              </TableCell>
              <TableCell align="left" width="4%">
                Manage
                Event
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
                    color="secondary"
                  > 
                   
                    <EventAvailableIcon />
                    <AddIcon fontSize="small"/>
                  </Button>

                </TableCell>
                <TableCell align="left">

                <Button
                  component={RouterLink}
                  to={"/manageEvent/" + group.Group.ID.toString()}
                  color="secondary"
                  style={{ float: "left" }}
                >
                  <EventAvailableIcon />
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

