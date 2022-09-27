import React, { Fragment, useEffect, useState } from "react";

import logo from './logo.svg';
import './App.css';
// import { Router } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import OwnShuttlecock from './components/shuttlecock/OwnerShuttlecock';
import DataPlayer from './components/player/DataPlayer';
import Status from './components/status/Status';
import Sum from './components/summarize/Sum';
import SelectGroup from "./components/shuttlecock/selectGroup";
import AccountInfomation from './components/Account';
import Navbar from './components/Navbar';

import { UsersInterface } from './models/ISignIn';
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import { BrowserRouter } from 'react-router-dom';
import HistoryEvent from "./components/shuttlecock/History";
import CreateEvent from "./components/shuttlecock/createEvent";
import MemberinEvent from "./components/shuttlecock/MemberEvent";

function App() {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<UsersInterface>();
  const [role, setRole] = useState<string>("");

  
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
      setToken(getToken);
      setRole(localStorage.getItem("role") || "");
    } 
  }, []);

  if (!token) {
    return <SignIn />
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
                role === "Member" &&(
                  <>
                  <Route path = "/" element={<AccountInfomation />} />
                  <Route path = "/AccountInfomation" element={<AccountInfomation />} />
                  <Route path = "/OwnerShuttlecock" element={<OwnShuttlecock />} />

                  <Route path = "/SelectGroup" element={<SelectGroup />} />
                  <Route path = "/CreateEvent/:id" element={<CreateEvent />} />
                  {/* <Route path = "/CreateEvent" element={<CreateEvent />} /> */}

                  
                  <Route path = "/memberinevent" element={<MemberinEvent />} />
                  <Route path = "/status" element={<Status />} />
                  <Route path = "/HistoryEvent/:id" element={<HistoryEvent />} />

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
