import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, Paper, Select } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import { MenuItem } from "@material-ui/core";

//Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { GroupInterface } from "../../models/IGroup";
import { UsersInterface } from "../../models/ISignIn";
import { GroupMemberInterface } from "../../models/IGroupMember";
import { group } from "console";

const useStyles = makeStyles((theme: Theme) =>
  //การกำหนดลักษณะ


  createStyles({
    root: { flexGrow: 1 },

    container: { marginTop: theme.spacing(2) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

    table: { minWidth: 100 },

    position: { marginleft: theme.spacing(5) },

    tableSpace: { marginTop: 20 },

    tableHead: {
      "& .MuiTableCell-head": {
        color: "white",
        backgroundColor: "#DC143C",
      },
      
    },
  })
);
export default function DataPlayer() {
  const classes = useStyles();
  // List group by member id
  const [groupMember, setGroupMember] = React.useState<GroupMemberInterface[]>([]);
  
  // Selected group for get GroupID
  const [selectedGroup, setSelectedGroup] = React.useState<GroupInterface>();

  // Use GroupID to find member
  const [memberGroup, setMemberGroup] = React.useState<GroupMemberInterface[]>([]);


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

  const getMemberList = async () => {
    const user: UsersInterface = JSON.parse(localStorage.getItem("user") || "");
    const apiUrl = `http://localhost:8080/groupmember/${selectedGroup?.ID}`;

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
          setMemberGroup(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof group;
    setSelectedGroup(groupMember.find(g => g.ID === event.target.value as number)?.Group);
  };



  useEffect(() => {
    getGroupMember();
  }, []);

  useEffect(() => {
    getMemberList();
  }, [selectedGroup?.ID]);


  console.log(selectedGroup);

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
            Player in group
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3} className={classes.root}>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <Select             
              onChange={handleChange}
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


      <TableContainer component={Paper} className={classes.tableSpace}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className = {classes.tableHead}>
            <TableRow>
              <TableCell align="left" width="2%">
                No.
              </TableCell>
              <TableCell align="left" width="5%">
                Firstname
              </TableCell>

              <TableCell align="left" width="5%">
                Lastname
              </TableCell>

              <TableCell align="center" width="5%">
                Nickname
              </TableCell>

              <TableCell align="center" width="5%">
                PromptPay
              </TableCell>

              <TableCell align="center" width="7%">
                Tell
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {memberGroup?.map((item: GroupMemberInterface, index: number) => (
              <TableRow key={item.ID}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{item.Member.UserDetail.FirstName}</TableCell>
                <TableCell align="center">{item.Member.UserDetail.LastName}</TableCell>
                <TableCell align="center">{item.Member.UserDetail.Nickname}</TableCell>
                <TableCell align="center">{item.Member.UserDetail.PromtPay}</TableCell>
                <TableCell align="center">{item.Member.UserDetail.PhoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </Container>


  );
}

