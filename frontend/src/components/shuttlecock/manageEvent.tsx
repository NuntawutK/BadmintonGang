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
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Details } from "@material-ui/icons";
//import { stringify } from "querystring";
import { ShuttleCockInterface } from "../../models/IShuttleCock";
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import moment from "moment";
import id from "date-fns/locale/id";
import Menu from "@material-ui/core/Menu";
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import HistoryIcon from '@material-ui/icons/History';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import { UsersInterface } from "../../models/ISignIn";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
        backgroundColor: "#DC143C",
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

  // Get User and Role from localStorage
  const [user, setUser] = React.useState<UsersInterface>();
  const [role, setRole] = useState("");
  
  // Show group name
  const [group, setGroup] = React.useState<GroupInterface>();
  
  // Show event on table
  const [showEvent, setShowEvent] = React.useState<EventShuttInterface[]>([]);

  const [showCodeShuttlecockInEvent, setshowCodeShuttlecockInEvent] = React.useState<EventShuttInterface[]>([]);

  // Get member not in event by GroupMemberID
  const [groupMember, setGroupMember] = React.useState<GroupMemberInterface[]>([]);

  // Control member menu and shuttle cock menu
  const [anchorEl, setAnchorEl] = useState<(null | HTMLElement)[]>([]);
  const [anchorEl2, setAnchorEl2] = useState<(null | HTMLElement)[]>([]);


  const [sentcodeshuttlecock, setsentcodeshuttlecock] = React.useState<Partial<GroupInterface>>({});

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
  const [selectedOwnershutt, setSelectedOwnershutt] = React.useState<number[]>([]);
  const [selectedmembershutt, setSelectedmembershutt] = React.useState<number[]>([]);


  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const isSelectedOwner = (id: number) => selectedOwnershutt.indexOf(id) !== -1;
  const isSelectedmembershutt = (id: number) => selectedmembershutt.indexOf(id) !== -1;

  const [selectDisabled, setSelectDisabled] = useState(false)
  const handleClickedit = () =>{
    setSelectDisabled(selectDisabled)
  }


  
  
  
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


  const handleClickOwner = (event: React.MouseEvent<unknown>, item: number) => {
    const selectedIndex = selectedOwnershutt.indexOf(item);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedOwnershutt, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedOwnershutt.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selectedOwnershutt.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedOwnershutt.slice(0, selectedIndex),
        selectedOwnershutt.slice(selectedIndex + 1),
      );
    }
 

    setSelectedOwnershutt(newSelected);
  };

  const handleClickMemberShutt = (event: React.MouseEvent<unknown>, item: number) => {
    const selectedIndex = selectedmembershutt.indexOf(item);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedmembershutt, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedmembershutt.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selectedmembershutt.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedmembershutt.slice(0, selectedIndex),
        selectedmembershutt.slice(selectedIndex + 1),
      );
    }

    setSelectedmembershutt(newSelected);
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

  const handleMenuMember = (event: MouseEvent<HTMLElement>, index: number, eventId: number) => {
    let newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);

    // When click open Member menu, then get Member not in event by eventId
    getMemberNotInEventMember(eventId);
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

    // Clear member after close Member menu
    setGroupMember([]);
    setSelected([]);
    setSelectedOwnershutt([]);
    
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

  const [openDialog, setOpenDialog] = React.useState(false);
  const [cancelMS, setCancelMS] = useState<string>('')
  const handleClickOpenDialog = (id: string) => {
    setOpenDialog(true);
    setCancelMS(id)
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const deleteEvent = async () => {
    setOpenDialog(false);
    const apiUrl = "http://localhost:8080/deleteevent/"+cancelMS;
    const requestOptions = {
      method: "DELETE",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const reponse = await fetch(apiUrl, requestOptions);

    const res = await reponse.json()
    if (res.data) {
      console.log(res.data)
      await sleep(1000)
      window.location.reload()
    } else {
      console.log(res.data)
    }
  }

  const getMemberNotInEventMember = (eventId: number) => {
    const apiUrl = `http://localhost:8080/listevent/membernotingroup/${eventId}`;

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
  }

  const getGroup = async () => {

    const apiUrl = `http://localhost:8080/group/${id}`;

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
          setGroup(res.data);
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

    let payload: any[] = [];
    selectedmembershutt.forEach((item: number) => {
      payload.push({
        EventGroupMemberID: item
      });
    });
    console.log(payload)
    let data = {
      Code: makeid(6),
      EventShuttID: Event,
      MemberID: selectedOwnershutt[0],
      EventGroupMemberShuttlecock: payload,
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

  const submitMemberNotInEvent = (eventId: number) => {
    let payload: any[] = [];
    selected.forEach((item: number) => {
      payload.push({
        GroupMemberID: item
      });
    });
    console.log(payload);
    const apiUrl = `http://localhost:8080/listevent/membernotingroup/${eventId}`;

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    //การกระทำ
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          setTrigger(trigger+1);
          setSelected([]);
          getMemberNotInEventMember(eventId);
          console.log(res.data);
        } else {
          setError(true);
          console.log(res.error);
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
    getGroup();
  }, [trigger]);

  // console.log(anchorEl);


  return (
    <Container className={classes.container} maxWidth="md">
      <Box display="flex">
        <Box flexGrow={1}>
          
          <Typography variant="h6">

            <h3>GroupName : {group?.NameGroup}</h3>


          </Typography>
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
            <ArrowBackIosIcon/>
            Back
          </Button>

        </Grid>
      </Grid>


      <TableContainer component={Paper} className={classes.tableSpace}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead  className={classes.tableHead}>
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
              <TableCell align="left" width="4%">
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
                        // variant="contained"
                        color="primary"

                        onClick={(e) => handleMenuMember(e, index, item.ID)}
                        // aria-controls={openMenuMember ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                      // aria-expanded={openMenuMember ? 'true' : undefined}
                      >
                        <GroupAddOutlinedIcon/>
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
                                        Name
                                      </TableCell>
                                      <TableCell align="left" width="5%">
                                        Nickname
                                      </TableCell>
                                      

                                    </TableRow>
                                  </TableHead>

                                  <TableBody>
                                    {item?.EventGroupMember.map((item2: EventGroupMemberInterface, index) => {
                                      return (
                                        <TableRow key={item2.ID} >
                                          <TableCell align="left">{index + 1}</TableCell>
                                          <TableCell align="left">{item2.GroupMember.Member.UserDetail.FirstName}{" "}{item2.GroupMember.Member.UserDetail.LastName}</TableCell>
                                          <TableCell align="left">{item2.GroupMember.Member.UserDetail.Nickname}</TableCell>
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
                                      <TableCell width="5%" align="center">Name</TableCell>
                                      <TableCell width="5%" align="center">Nickname</TableCell>
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
                                          <TableCell align="left">{item.Member.UserDetail.FirstName}{" "}{item.Member.UserDetail.LastName}</TableCell>
                                          <TableCell align="left">{item.Member.UserDetail.Nickname}</TableCell>
                                        </TableRow>
                                      )
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>

                              <br />
                              <br />
                              <br />
                              <Button
                                style={{ float: "right" }}
                                onClick={() => submitMemberNotInEvent(item.ID)}
                                variant="contained"
                                color="secondary"
                              >
                                <GroupAddOutlinedIcon/>&nbsp;Add Member
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
                        // variant="contained"

                        onClick={(e) => handleMenuCodeShuttlecock(e, index)}
                        aria-haspopup="true"
                        color="secondary"
                      >
                        <SportsTennisIcon/>
                        <AddIcon fontSize="small"/>
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
                                <p>Add ShuttleCock</p>
                                <TableContainer component={Paper} className={classes.tableContainer}>
                                <Table stickyHeader>
                                  <TableHead className={classes.tableHead}>
                                    <TableRow>
                                      <TableCell width="5%" align="center">OwnerShutt</TableCell>
                                      <TableCell width="5%" align="center">Member</TableCell>
                                      <TableCell width="5%" align="center">Name</TableCell>
                                      <TableCell width="5%" align="center">Nickname</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {item.EventGroupMember.map((item3: EventGroupMemberInterface) => {
                                      const isItemSelectedOwner = isSelectedOwner(item3.GroupMember.MemberID);
                                      const isItemSelectedmembershutt = isSelectedmembershutt(item3.ID);
                                      return (
                                        <TableRow key={item3.ID} >
                                          <TableCell padding="checkbox" align="center">
                                            <Checkbox
                                              name="myCheckbox"
                                              disabled = {!isItemSelectedOwner && selectedOwnershutt.length > 0}
                                              checked={isItemSelectedOwner}
                                              onClick={(event) => handleClickOwner(event, item3.GroupMember.MemberID)}
                                            />

                                          </TableCell>
                                          
                                          <TableCell padding="checkbox" align="center">
                                            <Checkbox
                                              checked={isItemSelectedmembershutt}
                                              onClick={(event) => handleClickMemberShutt(event, item3.ID)}
                                            />

                                          </TableCell>
                                          <TableCell align="left">{item3.GroupMember.Member.UserDetail.FirstName}{" "}{item3.GroupMember.Member.UserDetail.LastName}</TableCell>
                                          <TableCell align="left">{item3.GroupMember.Member.UserDetail.Nickname}</TableCell>
                                        </TableRow>
                                      )
                                    })}
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
                                  color="secondary"
                                >
                                  <SportsTennisIcon/><AddIcon fontSize="small"/>&nbsp;&nbsp;Add Shuttle Cock
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
                      // variant="contained"
                      color="primary"
                    >
                      <HistoryIcon/>
                    </Button>
                  </TableCell>
                  <TableCell>
                         <Button 
                            size="small"
                            color="secondary"
                            onClick={() => handleClickOpenDialog(item.ID.toString())}
                         >
                           <DeleteForeverIcon fontSize="small"/>
                         </Button>
                         <Dialog
                           open={openDialog}
                           onClose={handleCloseDialog}
                           aria-labelledby="alert-dialog-title"
                           aria-describedby="alert-dialog-description"
                         >
                           <DialogTitle id="alert-dialog-title">{"Want to delete activity data?"}</DialogTitle>
                           <DialogContent>
                             <DialogContentText id="alert-dialog-description">
                               ⚠️ If the data has been deleted <b>Will not be able to recover data</b>
                             </DialogContentText>
                           </DialogContent>
                           <DialogActions>
                             <Button onClick={handleCloseDialog} color="primary">
                               cancel
                             </Button>
                             <Button onClick={deleteEvent} color="primary" autoFocus>
                              accept
                             </Button>
                           </DialogActions>
                         </Dialog>
                     
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

