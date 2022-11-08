import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { EventShuttInterface } from '../../models/IEvent';
import { UsersInterface } from '../../models/ISignIn';
import { EventGroupMemberInterface } from '../../models/IEventGroupMember';
import moment from 'moment';
import { ShuttleCockInterface } from '../../models/IShuttleCock';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { EventGroupmemberShuttlecockInterface } from '../../models/IEventGroupMemberShuttlecock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { lineHeight } from '@mui/system';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
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

    const [showOwner, setShowOwner] = React.useState<ShuttleCockInterface>();


    const [user, setUser] = React.useState<UsersInterface>();
    const [role, setRole] = useState("");


    const [selectedshutt, setselectedshutt] = React.useState<Partial<ShuttleCockInterface>>({
        EventGroupMemberShuttlecock: [],
    });
    const ShowmemberofShutt = (index: number) => {
        setselectedshutt(showEventshuttmembergroup?.ShuttleCock[index] as Partial<ShuttleCockInterface>)
    }

    console.log(selectedshutt)

    const navigate = useNavigate();

    function TotalPriceShutt() {

        let totalprice = 0;
        if (typeof selectedshutt?.Member?.UserDetail === 'undefined' || selectedshutt.EventGroupMemberShuttlecock?.length === 0)
            return totalprice;
        if (typeof selectedshutt?.EventGroupMemberShuttlecock === 'undefined')
            return totalprice;
        if (typeof showOwner?.Price === 'undefined')
            return totalprice;
        totalprice = Number((showOwner?.Price) / (selectedshutt?.EventGroupMemberShuttlecock?.length))

        return totalprice;
    }

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


    const getownershutt = async () => {
        const apiUrl = `http://localhost:8080/ownershutt/${id}/` + selectedshutt?.MemberID + `/` + selectedshutt?.Price?.toFixed(1);

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
                    setShowOwner(res.data);
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


    useEffect(() => {
        getownershutt()
    }, [selectedshutt]);

    return (
        <div className={classes.root}>


            <Container maxWidth="lg" className={classes.container}>


                <Button
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

                        <Typography variant="h6">
                            Groupname : {showEvent?.Group.NameGroup}
                            <br />
                            Placename : {showEvent?.Place}
                            <br style={{display:"block",marginBottom:"2em"}}/>
                            Time : {moment(showEvent?.TimeStart).format("DD/MM/YYYY hh:mm A")}<br/> 
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{moment(showEvent?.TimeStop).format("DD/MM/YYYY hh:mm A")}
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
                                        <TableCell align="left" width="1%">No.</TableCell>
                                        <TableCell align="left" width="20%">Name</TableCell>
                                        <TableCell align="left" width="5%">Nickname</TableCell>
                                        <TableCell align="left" width="10%">Phonenumber</TableCell>
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
                            Owner Shuttlecock
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
                                            <TableCell width="1%">No.</TableCell>
                                            <TableCell width="20%">Name</TableCell>
                                            <TableCell width="1%">Price/shutt</TableCell>
                                            <TableCell width="1%">Member</TableCell>


                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {showEventownershutt?.ShuttleCock.map((item1: ShuttleCockInterface, index: number) => {

                                            {
                                                return (
                                                    <TableRow key={item1.ID} >
                                                        <TableCell align="left">{index + 1}</TableCell>
                                                        <TableCell align="left">{item1.Member?.UserDetail?.FirstName}{" "}{item1.Member?.UserDetail?.LastName}</TableCell>
                                                        <TableCell align="left">{item1?.Price}</TableCell>

                                                        <TableCell>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                onClick={() => ShowmemberofShutt(index)}
                                                                aria-haspopup="true"
                                                            >
                                                                <VisibilityIcon fontSize="small"/>
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
                            </React.Fragment>

                        </Paper>
                        <br />
                        <Typography variant="h5">
                            Members play shuttlecock
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
                                                    <TableCell align="left">{TotalPriceShutt().toFixed(2)}{" ฿"}</TableCell>

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