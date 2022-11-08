import React, { MouseEvent, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, Paper, Select } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { EventGroupMemberInterface } from "../../models/IEventGroupMember";
import VisibilityIcon from '@material-ui/icons/Visibility';

//Table
import InputAdornment from '@material-ui/core/InputAdornment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { EventShuttInterface } from "../../models/IEvent";
import { useParams } from "react-router-dom";
import { GroupInterface } from "../../models/IGroup";
import { GroupMemberInterface } from "../../models/IGroupMember";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { ShuttleCockInterface } from "../../models/IShuttleCock";
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import moment from "moment";
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
import { EventGroupmemberShuttlecockInterface } from "../../models/IEventGroupMemberShuttlecock";


const useStyles = makeStyles((theme: Theme) =>
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
    tableHead2: {
      "& .MuiTableCell-head": {
        color: "white",
        backgroundColor: "#F25D5D",
      },
    },


    menuBox: {
      padding: theme.spacing(3),
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },

    text: {
      borderRadius: "25",
    }

  })
);
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function ManageEvent() {
  const classes = useStyles();
  const [user, setUser] = React.useState<UsersInterface>();
  const [role, setRole] = useState("");

  // Show group name
  const [group, setGroup] = React.useState<GroupInterface>();

  // Show event on table
  const [showEvent, setShowEvent] = React.useState<EventShuttInterface[]>([]);

  // Get member not in event by GroupMemberID
  const [groupMember, setGroupMember] = React.useState<GroupMemberInterface[]>([]);

  // Control member menu and shuttle cock menu
  const [anchorEl, setAnchorEl] = useState<(null | HTMLElement)[]>([]);
  const [anchorEl2, setAnchorEl2] = useState<(null | HTMLElement)[]>([]);

  const [addshutt, setaddshutt] = React.useState<Partial<ShuttleCockInterface>>({
    Price:0,
  });


  const [msg, setMsg] = useState<string>("");
  const [trigger, setTrigger] = useState(0);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMassage] = useState("");

  const [selected, setSelected] = React.useState<number[]>([]);
  const [selectedOwnershutt, setSelectedOwnershutt] = React.useState<number[]>([]);
  const [selectedmembershutt, setSelectedmembershutt] = React.useState<number[]>([]);
  const [isItemEmpty, setIsItemEmpty] = useState<boolean>(false);

  const [showEventowneradndmembershutt, setshowEventowneradndmembershutt] = React.useState<EventShuttInterface[]>([]);

  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const isSelectedOwner = (id: number) => selectedOwnershutt.indexOf(id) !== -1;
  const isSelectedmembershutt = (id: number) => selectedmembershutt.indexOf(id) !== -1;



  const openMenuMember = (index: number) => {
    return Boolean(anchorEl[index]);
  }
  const openMenuCodeShuttlecock = (index: number) => {
    return Boolean(anchorEl2[index]);
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
  const handlecloseAdd = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
    setIsItemEmpty(false);
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

  const handleMenuMember = (event: MouseEvent<HTMLElement>, index: number, eventId: number) => {
    let newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);

    // When click open Member menu, then get Member not in event by eventId
    getMemberNotInEventMember(eventId);
  }

  const handleMenuCodeShuttlecock = (event: MouseEvent<HTMLElement>, index: number, eventId: number) => {
    let newAnchorEl2 = [...anchorEl2];
    newAnchorEl2[index] = event.currentTarget;
    setAnchorEl2(newAnchorEl2)
  }

  const handleCloseMember = (index: number) => {
    let newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
    setGroupMember([]);
    setSelected([]);
    setSelectedOwnershutt([]);

  }

  const handleClosecodeShuttlecock = (index: number) => {
    let newAnchorEl2 = [...anchorEl2];
    newAnchorEl2[index] = null;
    setAnchorEl2(newAnchorEl2);
    setselectedshutt({ EventGroupMemberShuttlecock: [] })
    setaddshutt({Price:0});

  }


  const handleChangeAddshuttlecock = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof addshutt;
    setaddshutt({
      ...addshutt,
      [name]: event.target.value,
    });
  };
  const { id } = useParams()

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
        //console.log(res.data);

        if (res.data) {
          setShowEvent(res.data);
        } else {
          console.log("else");
        }
      });
  };

  

  const [selectedshutt, setselectedshutt] = React.useState<Partial<ShuttleCockInterface>>({
    EventGroupMemberShuttlecock: []
  }
  );

  const ShowmemberofShutt = (shutt: number, event: number) => {
    setselectedshutt(showEventowneradndmembershutt[event].ShuttleCock[shutt] as Partial<ShuttleCockInterface>)
  }

  const getEventgroup = async () => {
    const apiUrl = `http://localhost:8080/groupeventshutt/${id}`;

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
        //console.log(res.data);

        if (res.data) {
          setshowEventowneradndmembershutt(res.data);
        } else {
          console.log("else");
        }
      });
  };




  const [openDialogEvent, setOpenDialogEvent] = React.useState(false);
  const [cancelEvent, setcancelEvent] = useState<string>('')

  const [openDialogShuttlecock, setOpenDialogShuttlecock] = React.useState(false);
  const [cancelShuttlecock, setcancelShuttlecock] = useState<string>('')


  const handleClickOpenDialogEvent = (id: string) => {
    setOpenDialogEvent(true);
    setcancelEvent(id)
  };

  const handleClickOpenDialogShuttlecock = (id: string) => {
    setOpenDialogShuttlecock(true);
    setcancelShuttlecock(id)
  };


  const handleCloseDialogEvent = () => {
    setOpenDialogEvent(false);
  };


  const handleCloseDialogShutt = () => {
    setOpenDialogShuttlecock(false);
  };


  const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }


  const deleteAddshuttlecock = async () => {
    setOpenDialogShuttlecock(false);
    const apiUrl = "http://localhost:8080/deleteaddshutttlecock/" + cancelShuttlecock;
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
     // console.log(res.data)
      await sleep(1000)
      window.location.reload()
    } else {
      console.log(res.data)
    }
  }

  const deleteEvent = async () => {
    setOpenDialogEvent(false);
    const apiUrl = "http://localhost:8080/deleteevent/" + cancelEvent;
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
      //console.log(res.data)
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
        //console.log(res.data);
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
        //console.log(res.data);

        if (res.data) {
          setGroup(res.data);
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

  function submitAddshuttlecock(Event: number) {

    let payload: any[] = [];
    selectedmembershutt.forEach((item: number) => {
      payload.push({
        EventGroupMemberID: item
      });
    });
    if (payload.length === 0) {
      setIsItemEmpty(true);
      setErrorMassage("Select Member please")
      return
    }

    let data = {
      Price: Number(addshutt?.Price),
      Code: makeid(6),
      EventShuttID: Event,
      MemberID: selectedOwnershutt[0],
      EventGroupMemberShuttlecock: payload,
    };



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
          setMsg("Add shuttlecock success")
          setErrorMassage("");
        } else {
          setError(true);
          setErrorMassage(res.error)
          if (res.error == "member not found") {
            setErrorMassage("Select Member please")
          } else {
            setErrorMassage(res.error)
          }
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
    if (payload.length === 0) {
      setIsItemEmpty(true);
      setErrorMassage("Did not select members or did not have members")
      return
    }
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
        //console.log(res);
        if (res.data) {
          setSuccess(true);
          setMsg("Add Member success")
          setTrigger(trigger + 1);
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
    getEventgroup();
  }, [trigger]);



  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={3000} onClose={handlecloseAdd} >
        <Alert onClose={handlecloseAdd} severity="success">
          {msg}
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={5000} onClose={handlecloseAdd} >
        <Alert onClose={handlecloseAdd} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={isItemEmpty} autoHideDuration={3000} onClose={handlecloseAdd}>
        <Alert onClose={handlecloseAdd} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Box display="flex">
        <Box flexGrow={1}>

          <Typography variant="h6">

            <h3>Group name : {group?.NameGroup}</h3>


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
            <ArrowBackIosIcon />
            Back
          </Button>

        </Grid>
      </Grid>


      <TableContainer component={Paper} className={classes.tableSpace}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left" width="2%">
                Place
              </TableCell>         
              <TableCell align="center" width="3%">
                Member
              </TableCell>
              <TableCell align="center" width="3%">
                shuttlecock
              </TableCell>
              <TableCell align="left" width="3%">
                summary
              </TableCell>
              <TableCell align="center" width="10%">
                TimeStart
              </TableCell>

              <TableCell align="center" width="10%">
                TimeStop
              </TableCell>
              <TableCell align="left" width="4%">
              </TableCell>


            </TableRow>
          </TableHead>

          <TableBody>
            {showEvent.map((item: EventShuttInterface, indexA: number) => {
              return (
                <TableRow key={item.ID}>
                  <TableCell align="left">{item.Place}</TableCell>
                  <TableCell align="center">
                    <div>
                      <Button

                        color="primary"

                        onClick={(e) => handleMenuMember(e, indexA, item.ID)}
                        aria-haspopup="true"
                      >
                        <GroupAddOutlinedIcon />
                      </Button>

                      <Menu
                        anchorEl={anchorEl[indexA]}
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
                        open={openMenuMember(indexA)}
                        onClose={() => handleCloseMember(indexA)}
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
                                      <TableCell align="left" width="1%">
                                        No.
                                      </TableCell>
                                      <TableCell align="left" width="20%">
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
                                <GroupAddOutlinedIcon />&nbsp;Add Member
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
                        onClick={(e) => handleMenuCodeShuttlecock(e, indexA, item.ID)}
                        aria-haspopup="true"
                        color="secondary"
                      >
                        <SportsTennisIcon />
                        <AddIcon fontSize="small" />
                      </Button>
                      <Menu
                        anchorEl={anchorEl2[indexA]}
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
                        open={openMenuCodeShuttlecock(indexA)}
                        onClose={() => handleClosecodeShuttlecock(indexA)}
                      >

                        <Box className={classes.menuBox}>
                          <Grid container spacing={1} className={classes.root}>
                            <Grid item xs={12}>
                              <Typography variant="subtitle1" noWrap>
                                <p>Add ShuttleCock</p>
                                <TextField
                                        id="Price"
                                        type="string"
                                        inputProps={{ name: "Price" }}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        InputProps={{
                                          endAdornment: <InputAdornment position="end">฿</InputAdornment>,
                                        }}
                                        label="Price/Shuttlecock"
                                        variant="outlined"
                                        onChange={handleChangeAddshuttlecock}
                                        value={addshutt.Price}
                                        className={classes.text}                                      
                                        rows={1}
                                      />
                                      <br/>
                                      <br/>
                                      
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
                                                disabled={!isItemSelectedOwner && selectedOwnershutt.length > 0}
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
                                <Button
                                  style={{ float: "right" }}
                                  onClick={() => submitAddshuttlecock(item.ID)}
                                  variant="contained"
                                  color="secondary"
                                >
                                  <SportsTennisIcon /><AddIcon fontSize="small" />&nbsp;&nbsp;Add Shuttle Cock
                                </Button>
                                <br />
                                <br />
                                <br />
                                <Typography variant="subtitle2" noWrap>
                                  Owner Shuttlecock
                                </Typography>
                                <br />

                                <TableContainer component={Paper} className={classes.tableContainer}>
                                  <Table stickyHeader size="small">
                                    <TableHead className={classes.tableHead2}>                                 
                                      <TableRow>
                                        <TableCell width="5%" align="left">Name</TableCell>
                                        <TableCell width="5%" align="left">Member</TableCell>
                                        <TableCell width="5%" align="left"></TableCell>
                                      </TableRow>
                                    </TableHead>
                                    {showEventowneradndmembershutt[indexA]?.ShuttleCock.map((i1: ShuttleCockInterface, indexB: number) => {
                                      return (
                                        <TableBody>

                                          <TableRow key={i1.ID} >
                                            <TableCell align="left">{i1.Member?.UserDetail?.FirstName}{" "}{i1.Member?.UserDetail?.LastName}</TableCell>
                                            <TableCell>
                                              <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => ShowmemberofShutt(indexB, indexA)}
                                                aria-haspopup="true"
                                              >
                                                <VisibilityIcon fontSize="small" />
                                              </Button>

                                            </TableCell>
                                            <TableCell>
                                              <Button
                                                size="small"
                                                color="secondary"
                                                onClick={() => handleClickOpenDialogShuttlecock(i1.ID.toString())}
                                              >
                                                <DeleteForeverIcon fontSize="small" />
                                              </Button>
                                              <Dialog
                                                open={openDialogShuttlecock}
                                                onClose={handleCloseDialogShutt}
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
                                                  <Button onClick={handleCloseDialogShutt} color="primary">
                                                    cancel
                                                  </Button>
                                                  <Button onClick={deleteAddshuttlecock} color="primary" autoFocus>
                                                    accept
                                                  </Button>
                                                </DialogActions>
                                              </Dialog>

                                            </TableCell>
                                          </TableRow>




                                        </TableBody>
                                      )
                                    })}
                                  </Table>
                                </TableContainer>

                                <br />
                                <br />
                                <Typography variant="subtitle2" noWrap>
                                  Members play shuttlecock

                                </Typography>
                                <Table size="small">
                                  <TableHead className={classes.tableHead2}>
                                    <TableRow>
                                      <TableCell align="left">Name</TableCell>
                                      <TableCell align="left">Nickname</TableCell>
                                      <TableCell align="left"></TableCell>
                                    </TableRow>
                                  </TableHead>



                                  {selectedshutt?.EventGroupMemberShuttlecock?.map((t2: EventGroupmemberShuttlecockInterface) => {
                                    return (
                                      <TableBody>
                                        <TableRow key={t2.ID} >
                                          <TableCell align="left">{t2?.EventGroupMember?.GroupMember?.Member?.UserDetail?.FirstName}{" "}{t2?.EventGroupMember?.GroupMember?.Member?.UserDetail?.LastName}</TableCell>
                                          <TableCell align="left">{t2?.EventGroupMember?.GroupMember?.Member?.UserDetail?.Nickname}</TableCell>

                                        </TableRow>
                                      </TableBody>

                                    )
                                  })
                                  }
                                </Table>




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
                      to={"/historyEvent/" + item.ID.toString()}
                      color="primary"
                    >
                      <HistoryIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="left">{moment(item.TimeStart).format("DD/MM/YYYY hh:mm A")}</TableCell>
                  <TableCell align="left">{moment(item.TimeStop).format("DD/MM/YYYY hh:mm A")}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => handleClickOpenDialogEvent(item.ID.toString())}
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                    <Dialog
                      open={openDialogEvent}
                      onClose={handleCloseDialogEvent}
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
                        <Button onClick={handleCloseDialogEvent} color="primary">
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

