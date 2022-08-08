import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useContext } from "react";
import Login from './Login';
import SignUp from './Sign-up';
import Today from './Today';
import Top from './Top';
import Menu from './Menu';
import History from './History';
import axios from 'axios';
import Habits from './Habits';
import UserContext from "./contexts/UserContext";


export default function App(){
    const [tasks, setTasks] = React.useState([]);
    const [userinfo,setUserinfo]=React.useState({});
    const [navigationbars,setNavigationbars]=React.useState(true);
    const [config, setConfig] = useState({});
    const [bg,setBg] = useState('#E5E5E5')
    const setColor=(color)=>{setBg(color)};
    const [percentage, setPercentage]= React.useState('')

    return(
        <Body bgcolor={bg} >
        <BrowserRouter>
        <UserContext.Provider value={{config, setConfig}}>
        {navigationbars?(<><Top userinfo={userinfo}/></>):<></>}
            
                    <Routes>                    
                        <Route path="/" element={<Login setColor={setColor} userinfo={userinfo} setUserinfo={setUserinfo} setNavigationbars={setNavigationbars} navigationbars={navigationbars}/>} />
                        <Route path="/cadastro" element={<SignUp  setColor={setColor} userinfo={userinfo} setUserinfo={setUserinfo} setNavigationbars={setNavigationbars} navigationbars={navigationbars}/> } />                
                        <Route path="/hoje" element={<Today percentage={percentage} setPercentage={setPercentage} setColor={setColor} tasks={tasks} setTasks={setTasks} userinfo={userinfo} setUserinfo={setUserinfo} setNavigationbars={setNavigationbars} navigationbars={navigationbars}/> }/>
                        <Route path='/habitos' element={<Habits setColor={setColor} tasks={tasks} setTasks={setTasks} userinfo={userinfo} setUserinfo={setUserinfo} setNavigationbars={setNavigationbars} navigationbars={navigationbars}/>} />
                        <Route path='/historico' element={ <History />} />
                    </Routes>
        {navigationbars?(<><Menu percentage={percentage}/></>):<></>}
        </UserContext.Provider>
        </BrowserRouter>
        </Body>
    )
}

const Body = styled.div.attrs((props)=>props)`
    width: 100%;
    height: 100% !important;
    margin: 0;
    background-color: ${(props)=>props.bgcolor};
    display: flex;
    flex-direction: column;
    font-family: 'Lexend Deca';
    justify-content: center;
    color:black;
`