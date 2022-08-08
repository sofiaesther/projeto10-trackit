import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import CheckMark from './img/Vector.png'


export default function TodayHabits({ todaytask,reload, setReload }){
    console.log(todaytask,'td task')
    const name = todaytask.name;
    const done = todaytask.done;
    const idtask = todaytask.id; 
    const current = todaytask.currentSequence;
    const higher = todaytask.highestSequence;
    const { config, setConfig } = useContext(UserContext);
    console.log(done);

    function MarkHabit(){
        let url ='';
        if (done){
            url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idtask}/uncheck`;
        }else{
            url= `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idtask}/check`;
        }
        console.log(url)
        const body ={};
        const request = axios.post(url , body, config);
        request.then(()=>{
            setReload(!reload);
        }
        )
    }

    return(
    <Habit>
            <Information id={idtask}>
                <h1>
                    {name}
                </h1>

                <Sequences>
                    <Sequence done={false}>
                        Sequência atual:
                    </Sequence>
                    <Sequence done={done}> 
                        {current===1?('1 dia'):<>{current} dias</>} 
                    </Sequence>
                </Sequences>
                <Sequences>
                    <Sequence done={false}>
                        Seu recorde: 
                    </Sequence>
                    <Sequence done={(current!=higher||higher>0)?true:false}>
                    {higher===1?('1 dia'):<>{higher} dias</>} 
                    </Sequence>
                </Sequences>
            </Information>
            <TaskDone done={done} onClick={MarkHabit}>
                <img src={CheckMark} />
            </TaskDone>
    </Habit>
    )
}
const TaskDone= styled.div`
width: 70px;
height: 70px;
margin: 10px 10px 10px auto;
border-radius: 5px;
display: flex;
align-items: center;
justify-content: center;
background-color: ${(props) => props.done?'#8FC549': '#D4D4D4'};

img{
    width: 35px;
    margin: auto;
}
`
const Habit = styled.div`
display: flex;
width: 340px;
margin: 5px auto 10px auto;
border-radius: 10px;
background-color: #fff;
`
const Information = styled.div`
display: flex;
flex-direction: column;
margin: 10px auto auto 10px;
h1{
    text-align: left;
    margin: 5px auto 5px 0;
    color: #666666;
    font-size: 18px;
}
p{
    font-size: 12px;
}
`
const Sequences = styled.div`
display: flex;
`
const Sequence = styled.p`
font-size: 12px;
color: ${(props)=>props.done?'#8FC549': '#666666'};
margin: 3px 2px auto;
`
const Topper = styled.div`
    width: 280px;
    display: flex;
    justify-content: space-between;
    p{
        width: 80px;
    margin: 5px auto auto 15px;
    color: #666666;
    font-size: 18px;
}
`