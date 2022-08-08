import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import TodayHabits from './TodayHabits';
import { Link, useNavigate  } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import Verification from './LoggedUserVerify';


export default function Today({ percentage, setPercentage, setColor, tasks, setTasks, userinfo, setUserinfo, setNavigationbars ,navigationbars }){
    Verification(userinfo, setUserinfo);
    setColor('#E5E5E5');
    const { config, setConfig } = useContext(UserContext);
    const [ todaytask, setTodaytask ] = React.useState([]);
    const [reload, setReload] = useState(false);

    setNavigationbars(navigationbars=true);

    useEffect(()=>{
        const gettodaytask = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',config);
        
        gettodaytask.then((e)=>{
            setTodaytask(e.data);
            }
        )

    },[reload]);

    const dayname =   dayjs().locale("pt").format("dddd, DD/MM");
            
            

    setPercentage(`${((todaytask.filter((t) => t.done == true).length)/todaytask.length)*100}`);
    console.log(todaytask)
  
    return(
        <>
            <Day>
                <h1>{dayname}</h1>
                {todaytask.length!=0?<p>{percentage}% dos hábitos concluídos</p>:<h2>Nenhum hábito concluído ainda</h2>}
            </Day>
            <Habit>
            {todaytask.length!=0&&todaytask.map(t=>
                <TodayHabits todaytask={t} reload={reload} setReload={setReload}/> )}
            </Habit>
        </>
    )
}

const Day=styled.div`
width: 340px;
height: 100%;
margin: 100px auto auto auto;
h2{
    margin: 15px auto auto auto;
    color:#BABABA;
    font-size: 16px;
}
h1{
    color:#126BA5;
    font-size: 24px;
}
p{
    margin: 15px auto auto auto;
    color:#8FC549;
    font-size: 16px;
}
`
const Habit = styled.div`
width: 340px;
margin: 15px auto 120px auto;
display: flex;
flex-direction: column;
scroll-behavior: auto;
`
