import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import TableContainer from '@material-ui/core/TableContainer';

import Button from "@material-ui/core/Button";
import { id } from 'date-fns/locale';
import { EventShuttInterface } from '../../models/IEvent';
import { GroupMemberInterface } from '../../models/IGroupMember';
import { UsersInterface } from '../../models/ISignIn';
import { EventGroupMemberInterface } from '../../models/IEventGroupMember';
import moment from 'moment';
import { Title } from '@material-ui/icons';
import { ShuttleCockInterface } from '../../models/IShuttleCock';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { EventGroupmemberShuttlecockInterface } from '../../models/IEventGroupMemberShuttlecock';
import VisibilityIcon from '@material-ui/icons/Visibility';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 400,
    },
    seeMore: {
        marginTop: theme.spacing(3),
    },
    table: { minWidth: 650 },
    tableSpace: { marginTop: 20 },
    tableHead: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#DC143C",
        },
    },


}));

export default function Dashboard() {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [showEvent, setShowEvent] = React.useState<EventShuttInterface>();
    const [showEventownershutt, setshowEventownershutt] = React.useState<EventShuttInterface>();
    const [showEventshuttmembergroup, setshowEventshuttmembergroup] = React.useState<EventShuttInterface>();

    const [user, setUser] = React.useState<UsersInterface>();
    const [role, setRole] = useState("");

    let { id } = useParams();
    
    const getEventDetail = async () => {
        const apiUrl = `http://localhost:8080/summarizeevent/${id}`;

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



    const getEventDetailshuttlecock = async () => {
        const apiUrl = `http://localhost:8080/summarizegroupmembershuttlecockevent/${id}`;

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
                    setshowEventshuttmembergroup(res.data);
                } else {
                    console.log("else");
                }
            });
    };



    const getEventOwnerDetailshuttlecock = async () => {
        const apiUrl = `http://localhost:8080/summarizegroupownershuttlecockevent/${id}`;

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
                    setshowEventownershutt(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    const [selectedshutt, setselectedshutt] = React.useState<Partial<ShuttleCockInterface>>({
        EventGroupMemberShuttlecock: [],
    });
    const ShowmemberofShutt = (index: number) => {
        setselectedshutt(showEventshuttmembergroup?.ShuttleCock[index] as Partial<ShuttleCockInterface>)
    }


    const navigate = useNavigate();

    function TotalPriceShutt() {

        let totalprice = 0;
        if (typeof selectedshutt?.Member?.UserDetail === 'undefined' || selectedshutt.EventGroupMemberShuttlecock?.length === 0)
            return totalprice;
        if (typeof selectedshutt?.EventGroupMemberShuttlecock === 'undefined')
            return totalprice;


        totalprice = Number(selectedshutt?.Member?.UserDetail?.PriceShutt / selectedshutt?.EventGroupMemberShuttlecock?.length)


        return totalprice;
    }

    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            setUser(JSON.parse(localStorage.getItem("user") || ""));
            setRole(localStorage.getItem("role") || "");
        }
        getEventDetail();
        getEventDetailshuttlecock();
        getEventOwnerDetailshuttlecock();
    }, []);


    return (
        <div className={classes.root}>


            <Container maxWidth="lg" className={classes.container}>


                <Button
                    // component={RouterLink}
                    // to={"/manageEvent/"+id}
                    variant="contained"
                    color="secondary"
                    style={{ float: "right" }}
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIosIcon />
                    Back
                </Button>


                <Grid container spacing={3}>


                    <Grid item xs={12}>

                        <Typography variant="h5">
                            Group: {showEvent?.Group.NameGroup}
                            <br />
                            Place: {showEvent?.Place}
                            <br />
                            Time: {moment(showEvent?.TimeStart).format("DD/MM/YYYY hh:mm A")}  to {moment(showEvent?.TimeStop).format("DD/MM/YYYY hh:mm A")}
                        </Typography>

                    </Grid>
                    {/* Calculate */}
                    <Grid item xs={12} md={7} >
                        <Typography variant="h5">
                            Member in Team
                        </Typography>
                        <Paper className={fixedHeightPaper}>

                            <Table size="small">
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell align="center">No.</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Nickname</TableCell>
                                        <TableCell align="left">Phonenumber</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {showEventshuttmembergroup?.EventGroupMember.map((item1: EventGroupMemberInterface, index: number) => {

                                        return (
                                            <TableRow key={item1.ID} >
                                                <TableCell align="left">{index + 1}</TableCell>
                                                <TableCell align="left">{item1.GroupMember.Member.UserDetail.FirstName}{" "}{item1.GroupMember.Member.UserDetail.LastName}</TableCell>
                                                <TableCell align="left">{item1.GroupMember.Member.UserDetail.Nickname}</TableCell>
                                                <TableCell align="left">{item1.GroupMember.Member.UserDetail.PhoneNumber}</TableCell>

                                            </TableRow>


                                        )



                                    })
                                    }


                                </TableBody>
                            </Table>

                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Typography variant="h5">
                            Shuttlecock
                        </Typography>
                        <Paper className={fixedHeightPaper}>


                            <React.Fragment>
                                <Typography variant="h5">

                                    Total Shutt : {showEventownershutt?.ShuttleCock?.length}

                                </Typography>
                                <br />


                                <Table size="small">
                                    <TableHead className={classes.tableHead}>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>Nickname</TableCell>
                                            <TableCell>Price/shutt</TableCell>
                                            <TableCell>Member</TableCell>


                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {showEventownershutt?.ShuttleCock.map((item1: ShuttleCockInterface, index: number) => {

                                            {
                                                return (
                                                    <TableRow key={item1.ID} >
                                                        <TableCell align="left">{index + 1}</TableCell>
                                                        <TableCell align="left">{item1.Member?.UserDetail?.Nickname}</TableCell>
                                                        <TableCell align="left">{item1.Member?.UserDetail?.PriceShutt}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                                // component={RouterLink}
                                                                // to={"/memberinevent"}
                                                                variant="contained"
                                                                color="secondary"
                                                                onClick={() => ShowmemberofShutt(index)}
                                                                // aria-controls={openMenuMember ? 'basic-menu' : undefined}
                                                                aria-haspopup="true"
                                                            // aria-expanded={openMenuMember ? 'true' : undefined}
                                                            >
                                                                <VisibilityIcon />
                                                            </Button>

                                                        </TableCell>
                                                    </TableRow>
                                                )


                                            }
                                        })}







                                    </TableBody>

                                </Table>
                                <br />
                                <br />
                                {/* <Typography variant="h5">

                                    Total Price : {TotalPriceShutt(showEvent?.ShuttleCock)} 

                                </Typography> */}

                            </React.Fragment>

                        </Paper>
                        <Typography variant="h5">
                            Member
                        </Typography>
                        <Paper className={fixedHeightPaper}>
                           

                            <Table size="small">
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell align="center">No.</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Nickname</TableCell>
                                        <TableCell align="left">price/person</TableCell>

                                    </TableRow>
                                </TableHead>


                                {
                                    selectedshutt?.EventGroupMemberShuttlecock?.map((t2: EventGroupmemberShuttlecockInterface, index: number) => {
                                        return (
                                            <TableBody>
                                                <TableRow key={t2.ID} >
                                                    <TableCell align="center">{index + 1}</TableCell>
                                                    <TableCell align="left">{t2?.EventGroupMember?.GroupMember?.Member?.UserDetail?.FirstName}{" "}{t2?.EventGroupMember?.GroupMember?.Member?.UserDetail?.LastName}</TableCell>
                                                    <TableCell align="left">{t2?.EventGroupMember?.GroupMember?.Member?.UserDetail?.Nickname}</TableCell>
                                                    <TableCell align="left">{TotalPriceShutt()}{" ฿"}</TableCell>

                                                </TableRow>
                                            </TableBody>

                                        )




                                    })
                                }
                            </Table>



                            <br />
                            <br />
                            <br />

                        </Paper>


                    </Grid>






                </Grid>
                <Box pt={4}>

                </Box>
            </Container>
        </div>
    );
}