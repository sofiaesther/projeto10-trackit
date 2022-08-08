import styled from 'styled-components';
import React from 'react';
import trash from './img/trash.png';
import axios from 'axios';
import { useContext } from "react";
import UserContext from "./contexts/UserContext";


export default function HabitsList({ t, reloadHabits, setReloadHabits }){
    const { config, setConfig } = useContext(UserContext);
    
    console.log('tasssssk',t)
    const name = t.name;
    const days = t.days;
    const idtask = t.id; 
    console.log(days,'days')
    const weekdays =['D','S','T','Q','Q','S','S'];
    function Marked(e){
        if(days.includes(e)){
            return true;
        } else{ return false}
    };

    function Confirm() {
        if ( window.confirm("Deseja excluir o hábito?") === true) {
          return Delete(idtask);
        } else {
            return null;
          }
      };
    let marked = weekdays.map((w,index)=> Marked(index));

    function Delete(id){
        const promisse = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,config);
        promisse.then(()=>{
                setReloadHabits(!reloadHabits);
            }
        )}
    


    return(
        <Habit id={idtask}>
            <Topper>
            <p>
                {name}
            </p>
            <DeleteHabit onClick={()=>Confirm()}>
                <img src={trash} />
            </DeleteHabit>

            </Topper>
            <div>
                <WeekBox marked={marked[0]}> <p>{weekdays[0]}</p> </WeekBox>
                <WeekBox marked={marked[1]}> <p>{weekdays[1]}</p> </WeekBox>
                <WeekBox marked={marked[2]}> <p>{weekdays[2]}</p> </WeekBox>
                <WeekBox marked={marked[3]}> <p>{weekdays[3]}</p> </WeekBox>
                <WeekBox marked={marked[4]}> <p>{weekdays[4]}</p> </WeekBox>
                <WeekBox marked={marked[5]}> <p>{weekdays[5]}</p> </WeekBox>
                <WeekBox marked={marked[6]}> <p>{weekdays[6]}</p> </WeekBox>
            </div>
        </Habit>
    )

}

const Habit = styled.div`
width: 340px;
margin: 5px auto 10px auto;
border-radius: 10px;
background-color: #fff;
p{
    margin: 5px auto auto 15px;
    color: #666666;
    font-size: 18px;
}
div{
    margin: 8px auto 10px 10px;
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: left;
}
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
const DeleteHabit = styled.div`
    img{
        width: 12px;
        margin: auto 0 auto auto;
    }
`
const WeekBox = styled.div`
        width: 30px;
        height: 30px;
        border: 1px solid #D4D4D4;
        display: flex;
        align-items: center;
        font-size: 24px;
        justify-content: center;
        text-align: center;
        border-radius: 5px;
        background-color: ${(props) => props.marked?'#D4D4D4': '#fff'};
        

        p{
            color: ${(props) => props.marked?'#fff':'#D4D4D4'};
            margin: auto;
        }
        `