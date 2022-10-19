import React, { Fragment, useEffect, useState } from "react";

import logo from './logo.svg';
import './App.css';
// import { Router } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import OwnShuttlecock from './components/shuttlecock/OwnerShuttlecock';
import DataPlayer from './components/player/DataPlayer';
import Status from './components/status/Status';
import Sum from './components/summarize/Sum';
import SelectGroup from "./components/shuttlecock/createGroup";
import AccountInfomation from './components/Account';
import Navbar from './components/Navbar';

import { UsersInterface } from './models/ISignIn';
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import { BrowserRouter } from 'react-router-dom';
import CreateEvent from "./components/shuttlecock/createEvent";
import MemberinEvent from "./components/shuttlecock/MemberEvent";
import ManageEvent from "./components/shuttlecock/manageEvent";
import Dashboard from "./components/shuttlecock/historyEvent";

function App() {
  const [token, setToken] = useState<string | null>();
  const [user, setUser] = useState<UsersInterface>();
  const [role, setRole] = useState<string | null>();

  
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
      setToken(getToken);
      setRole(localStorage.getItem("role"));
    } 
  }, []);

  if (!token) {
    return /* <SignIn /> */ (
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </Router>
      );
   
  }
  
  // <Route path = "/Register" element={<Register />} />

  return (
    
    <Router>
      {
        token &&(
          <Fragment>
            <Navbar />
            <Routes>
              {
                role === "Member" && (
                  <>
                  <Route path = "/" element={<AccountInfomation />} />
                  <Route path = "/AccountInfomation" element={<AccountInfomation />} />
                  <Route path = "/OwnerShuttlecock" element={<OwnShuttlecock />} />

                  <Route path = "/SelectGroup" element={<SelectGroup />} />
                  <Route path = "/CreateEvent/:id" element={<CreateEvent />} />

                  
                  <Route path = "/memberinevent" element={<MemberinEvent />} />
                  <Route path = "/status" element={<Status />} />
                  <Route path = "/manageEvent/:id" element={<ManageEvent />} />
                  <Route path = "/historyEvent/:id" element={<Dashboard />} />



                  <Route path = "/summarize" element={<Sum />} /> 
                  <Route path = "/player" element={<DataPlayer />} />
                            
                  </>
                )
              }
            </Routes>
          </Fragment>
        )
      }
    </Router>
   
  );
}

export default App;
