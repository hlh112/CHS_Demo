import React from "react";
import styled, { css } from "styled-components";
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import NavBar from './navigation/NavBar.js'
import Header from './navigation/Header.js';
import Login from './routes/Login'

import closeOtherModals from "./helper/closeOtherModals.js";

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

export default function App(props) {

  //Login Logout handling
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState('')
  const navigate = useNavigate()

  const userLogin = (inputValue) => {
    setLogin(true)
    setUser(inputValue)
  }

  const userLogout = () => {
    setLogin(false)
    navigate('../' + 'Login')
  }

  const LoggedOutUI = <Login onSubmit={userLogin} />

  const LoggedInUI = <>  
                      <NavBar />
                      <AppWrapper>
                          <Header userName={user} onLogout={userLogout}/>
                          <Outlet />
                      </AppWrapper>
                    </>

  //Navbar active class handling
  const [currentLocation, setCurrentLocation] = useState(window.location.pathname)
  
  useEffect(() => {
    setCurrentLocation(window.location.pathname)
  })

  useEffect(() => {    
    const links = document.querySelectorAll('.sidebar_btn a')

    links.forEach(link => {
      
      const linkLocation = link.getAttribute('href')
      return linkLocation === currentLocation? link.closest('.sidebar_btn').classList.add('active') : link.closest('.sidebar_btn').classList.remove('active');

    })
  }, [currentLocation])

  return <>
          {login? LoggedInUI : LoggedOutUI}
        </>
}