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
import { Link as RouterLink, useParams } from "react-router-dom";
import TableContainer from '@material-ui/core/TableContainer';

import Button from "@material-ui/core/Button";
import { id } from 'date-fns/locale';
import { EventShuttInterface } from '../../models/IEvent';
import { GroupMemberInterface } from '../../models/IGroupMember';
import { UsersInterface } from '../../models/ISignIn';
import { EventGroupMemberInterface } from '../../models/IEventGroupMember';

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

}));

export default function Dashboard() {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [showEvent, setShowEvent] = React.useState<EventShuttInterface[]>([]);
    const [user, setUser] = React.useState<UsersInterface>();
    const [role, setRole] = useState("");



    let { id } = useParams()
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


    useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken) {
            setUser(JSON.parse(localStorage.getItem("user") || ""));
            setRole(localStorage.getItem("role") || "");
        }
        getEventMember();
    }, []);


    return (
        <div className={classes.root}>
            <CssBaseline />


            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>


                    {/* <Button
                        component={RouterLink}
                        to={"/manageEvent/"+id}
                        variant="contained"
                        color="primary"
                        style={{ float: "right" }}
                    >
                        Back
                    </Button> */}


                    <Grid container spacing={3}>


                        <Grid item xs={12}>


                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Typography variant="h5">
                                member
                            </Typography>

                            <Paper className={fixedHeightPaper}>

                                {/* <Title>Recent Orders</Title> */}
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">No.</TableCell>
                                            <TableCell align="left">Name</TableCell>
                                            <TableCell align="left">Nickname</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {showEvent.map((item: EventShuttInterface) => {
                                           

                                                {item?.EventGroupMember.map((item2: EventGroupMemberInterface,index) => {
                                                    return (
                                                        <TableRow key={item2.ID} >
                                                            <TableCell align="center">{index + 1}</TableCell>
                                                            <TableCell align="left">{item2.GroupMember?.Member?.UserDetail?.FirstName}{" "}{item2.GroupMember?.Member?.UserDetail?.LastName}</TableCell>

                                                            <TableCell align="left">{item2.GroupMember?.Member?.UserDetail?.Nickname}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                        
                                        })}

                                    </TableBody>
                                </Table>


                            </Paper>
                        </Grid>


                        {/* Calculate */}
                        <Grid item xs={12} md={4} >
                            <Typography variant="h5">
                                Shuttlecock
                            </Typography>
                            <Paper className={fixedHeightPaper}>
                                <React.Fragment>
                                    {/* <Title>Recent Orders</Title> */}
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>No.</TableCell>
                                                <TableCell>Nickname</TableCell>
                                                <TableCell>Price</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                        </TableBody>
                                    </Table>

                                </React.Fragment>

                            </Paper>
                        </Grid>



                    </Grid>
                    <Box pt={4}>

                    </Box>
                </Container>
            </main>
        </div>
    );
}