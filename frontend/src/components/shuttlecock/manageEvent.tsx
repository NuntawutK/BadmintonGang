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
import { EventGroupMemberInterface } from "../../models/IEventGroupMember";
//Table
import Popover from '@material-ui/core/Popover';
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
import { ShuttleCockInterface } from "../../models/IShuttleCock";

import moment from "moment";
import id from "date-fns/locale/id";
import Menu from "@material-ui/core/Menu";
import Checkbox from '@material-ui/core/Checkbox';
import { UsersInterface } from "../../models/ISignIn";



const useStyles = makeStyles((theme: Theme) =>
  //การกำหนดลักษณะ
  createStyles({
    root: { flexGrow: 1 },

    container: { marginTop: theme.spacing(2) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

    table: { minWidth: 650 },
    tableshutt: { minWidth: 300 },


    position: { marginleft: theme.spacing(5) },

    tableSpace: { marginTop: 20 },
    tableSpaceshutt: { marginTop: 5 },
    tableContainer: { maxHeight: 480 },
    tableHead: {
      "& .MuiTableCell-head": {
        color: "white",
        backgroundColor: "navy",
      },
    },


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

export default function ManageEvent() {
  const classes = useStyles();

  //  const [showEvent,setShowEvent] = React.useState<EventGroupMemberInterface[]>([]);
  // const [event, setevent] = React.useState<EventGroupMemberInterface>();

  const [showEvent, setShowEvent] = React.useState<EventShuttInterface[]>([]);

  const [user, setUser] = React.useState<UsersInterface>();
  const [role, setRole] = useState("");

  const [showCodeShuttlecockInEvent, setshowCodeShuttlecockInEvent] = React.useState<EventShuttInterface[]>([]);

  const [groupMember, setGroupMember] = React.useState<GroupMemberInterface[]>([]);

  const [anchorEl, setAnchorEl] = useState<(null | HTMLElement)[]>([]);
  const [anchorEl2, setAnchorEl2] = useState<(null | HTMLElement)[]>([]);


  const [sentcodeshuttlecock, setsentcodeshuttlecock] = React.useState<Partial<GroupInterface>>({});

  // const openMenuMember = Boolean(anchorEl);
  // const openMenuCodeShuttlecock = Boolean(anchorEl2);

  const openMenuMember = (index: number) => {
    return Boolean(anchorEl[index]);
  }
  const openMenuCodeShuttlecock = (index: number) => {
    return Boolean(anchorEl2[index]);
  }

  const [trigger, setTrigger] = useState(0);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMassage] = useState("");

  const [selected, setSelected] = React.useState<number[]>([]);
  const isSelected = (id: number) => selected.indexOf(id) !== -1;




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



  const handleChangeCode = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name1 = event.target.name as keyof typeof sentcodeshuttlecock;
    setsentcodeshuttlecock({
      ...sentcodeshuttlecock,
      [name1]: event.target.value,
    });


    // // //การล็อครายละเอียดโปรโมชั่นตามชื่อ
    // if (event.target.name === "CodeGroup") {
    //   setShowGroup(se.find((r) => r.ID === event.target.value));
    // }
  };

  const handleMenuMember = (event: MouseEvent<HTMLElement>, index: number) => {
    let newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  }

  const handleMenuCodeShuttlecock = (event: MouseEvent<HTMLElement>, index: number) => {
    let newAnchorEl2 = [...anchorEl2];
    newAnchorEl2[index] = event.currentTarget;
    setAnchorEl2(newAnchorEl2);
  }

  const handleCloseMember = (index: number) => {
    let newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
  }
  const handleClosecodeShuttlecock = (index: number) => {
    let newAnchorEl2 = [...anchorEl2];
    newAnchorEl2[index] = null;
    setAnchorEl2(newAnchorEl2);
  }




  const { id } = useParams()

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

  function submitAddshuttlecock(Event: number) {
    let data = {
      Code: makeid(6),
      EventShuttID: Event,
      MemberID: user?.ID,

    };
    console.log(data);

    const apiUrl = "http://localhost:8080/addshutt";
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
          // setMsg("Create group success")
          setErrorMassage("");
        } else {
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
    getEventMember();
    getGroupMember();
  }, [trigger]);

  console.log(anchorEl);


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
            Player
          </Typography>
          <Typography variant="h4">

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
              <TableCell align="left" width="5%">
                Place
              </TableCell>

              <TableCell align="center" width="7%">
                TimeStart
              </TableCell>

              <TableCell align="center" width="7%">
                TimeStop
              </TableCell>

              <TableCell align="center" width="4%">
                Member
              </TableCell>
              <TableCell align="center" width="4%">
                shuttlecock
              </TableCell>
              <TableCell align="left" width="4%">
                summary
              </TableCell>


            </TableRow>
          </TableHead>

          <TableBody>
            {showEvent.map((item: EventShuttInterface, index: number) => {
              return (
                <TableRow key={item.ID}>
                  <TableCell align="left">{item.Place}</TableCell>
                  <TableCell align="left">{moment(item.TimeStart).format("DD/MM/YYYY hh:mm A")}</TableCell>
                  <TableCell align="left">{moment(item.TimeStop).format("DD/MM/YYYY hh:mm A")}</TableCell>
                  <TableCell align="center">
                    <div>
                      <Button
                        // component={RouterLink}
                        // to={"/memberinevent"}
                        variant="contained"
                        color="primary"

                        onClick={(e) => handleMenuMember(e, index)}
                        // aria-controls={openMenuMember ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                      // aria-expanded={openMenuMember ? 'true' : undefined}
                      >
                        see
                      </Button>

                      <Menu
                        anchorEl={anchorEl[index]}
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
                        open={openMenuMember(index)}
                        onClose={() => handleCloseMember(index)}
                      >
                        <Box className={classes.menuBox}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" noWrap>
                                Member in Event

                              </Typography>
                              <TableContainer component={Paper} className={classes.tableSpaceshutt}>
                                <Table className={classes.tableshutt} aria-label="simple table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell align="left" width="5%">
                                        No.
                                      </TableCell>
                                      <TableCell align="left" width="8%">
                                        Firstname
                                      </TableCell>
                                      <TableCell align="left" width="5%">
                                        Lastname
                                      </TableCell>
                                      <TableCell align="left" width="5%">
                                        Nickname
                                      </TableCell>
                                      <TableCell align="left" width="5%">
                                        Phone Number
                                      </TableCell>

                                    </TableRow>
                                  </TableHead>

                                  <TableBody>
                                    {item?.EventGroupMember.map((item2: EventGroupMemberInterface, index) => {
                                      return (
                                        <TableRow key={item2.ID} >
                                          <TableCell align="center">{index + 1}</TableCell>
                                          <TableCell align="center">{item2.GroupMember.Member.UserDetail.FirstName}</TableCell>
                                          <TableCell align="center">{item2.GroupMember.Member.UserDetail.LastName}</TableCell>
                                          <TableCell align="center">{item2.GroupMember.Member.UserDetail.Nickname}</TableCell>
                                          <TableCell align="center">{item2.GroupMember.Member.UserDetail.PhoneNumber}</TableCell>
                                        </TableRow>
                                      )
                                    })}
                                  </TableBody>


                                </Table>
                              </TableContainer>
                              <br />
                              <br />
                              <br />
                              <Typography variant="subtitle2" noWrap>
                                Add Member
                              </Typography>
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

                                    {/* {groupMember?.map((item: GroupMemberInterface) => {
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
                                    })} */}




                                  </TableBody>

                                </Table>
                              </TableContainer>

                              <br />
                              <br />
                              <br />
                              <Button
                                style={{ float: "right" }}
                                // onClick={submit}
                                variant="contained"
                                color="primary"
                              >
                                Add Member
                              </Button>


                            </Grid>
                          </Grid>
                        </Box>
                      </Menu>
                    </div>
                  </TableCell>



                  <TableCell align="center">
                    <Box flexGrow={1}>
                      <Button
                        // component={RouterLink}
                        // to={"/memberinevent"}
                        variant="contained"

                        onClick={(e) => handleMenuCodeShuttlecock(e, index)}
                        aria-haspopup="true"
                        color="secondary"
                      >
                        SEE
                      </Button>
                      <Menu
                        anchorEl={anchorEl2[index]}
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
                        open={openMenuCodeShuttlecock(index)}
                        onClose={() => handleClosecodeShuttlecock(index)}
                      >
                        <Box className={classes.menuBox}>
                          <Grid container spacing={1} className={classes.root}>
                            <Grid item xs={12}>
                              <Typography variant="subtitle1" noWrap>
                                <p>Code ShuttleCock</p>

                                <TableContainer component={Paper} className={classes.tableSpaceshutt}>
                                  <Table className={classes.tableshutt} aria-label="simple table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell align="left" width="5%">
                                          No.
                                        </TableCell>
                                        <TableCell align="left" width="8%">
                                          Name
                                        </TableCell>

                                        <TableCell align="left" width="5%">
                                          Price
                                        </TableCell>

                                      </TableRow>
                                    </TableHead>
                                    <TableBody>

                                      {item?.ShuttleCock.map((item3: ShuttleCockInterface, index) => (
                                        <TableRow key={item.ID}>
                                          <TableCell align="left" >{index + 1}</TableCell>

                                          <TableCell align="left">{item3.Member?.UserDetail?.FirstName}{" "}{item3.Member?.UserDetail?.LastName}</TableCell>
                                          <TableCell align="left">{item3.Member?.UserDetail?.PriceShutt}</TableCell>

                                        </TableRow>

                                      ))}
                                    </TableBody>


                                  </Table>
                                </TableContainer>


                                <br />
                                <br />
                                <br />
                                <Button
                                  style={{ float: "right" }}
                                  onClick={() => submitAddshuttlecock(item.ID)}
                                  variant="contained"
                                  color="primary"
                                >
                                  Add ShuttleCock
                                </Button>


                              </Typography>

                            </Grid>
                          </Grid>
                        </Box>
                      </Menu>
                    </Box>

                  </TableCell>
                  
                  <TableCell align="center">
                    <Button
                      style={{ float: "left" }}
                      component={RouterLink}
                      to={"/historyEvent/"+ item.ID.toString()}
                      variant="contained"
                      color="primary"
                    >
                      see
                    </Button>
                  </TableCell>


                </TableRow>
              )
            }
            )}
          </TableBody>

        </Table>
      </TableContainer>

    </Container>


  );
}

