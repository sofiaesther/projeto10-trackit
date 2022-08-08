import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import { Link, useNavigate  } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import Verification from './LoggedUserVerify';
import HabitsList from './HabitsList';
import { ThreeDots } from  'react-loader-spinner';
import WeekdayButtonAll from './WeekdayButtonAll';

export default function Habits({setColor,userinfo, tasks, setTasks, setUserinfo, setNavigationbars ,navigationbars}){
    Verification(userinfo, setUserinfo);
    setColor('#E5E5E5');
    setNavigationbars(navigationbars=true);

    const { config, setConfig } = useContext(UserContext);
    const [unable, setUnable] =React.useState(false);
    const navigate = useNavigate();
    const [formName, setFormName] = React.useState({
        name: '',
      });
      const [formDay, setFormDay] = React.useState([]);

    const [ displayCreate, setDisplayCreate] = React.useState(false);
    const [reloadHabits, setReloadHabits]=useState(false)

    function DisplayModify(){
        setDisplayCreate(!displayCreate);
    }

    useEffect(()=>{
        const usertasks = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config);
        usertasks.then((e)=>{
            setTasks(e.data);}
        )
    },[reloadHabits]);

    function HabitFinish(e){
        e.preventDefault();
        const body ={...formName, days:formDay};
        setUnable(!unable);
        const habitpost = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', body, config);

        habitpost.then(element =>{
            setUnable(false);
            setReloadHabits(!reloadHabits);
            DisplayModify();
            e.target.reset();
        })
        habitpost.catch(element=>{
            setUnable(!unable);
            alert(`Error ${element}`)
        })
    }

    function handleName (e) {
        setFormName({
          name: e.target.value,
        }) 
      }
      function handleDays (e) {
          if(formDay.includes(parseInt(e.target.name))){
            setFormDay(()=> formDay.filter((d)=>d!=parseInt(e.target.name)))
          }else{
              setFormDay([...formDay,parseInt(e.target.name)]) 
          }
      }

    return(
        <>
        <Top>
            <h1>Meus hábitos</h1>
         {displayCreate?(<Button>+</Button>): <Button onClick={DisplayModify}>+</Button>}
        </Top>

        <CreateHabit displayCreate={displayCreate}> 
        
            <Form>
            <form onSubmit={HabitFinish}>
                <input type='text' name='name' onChange={handleName} placeholder='Habito' required />
            <DayButton>
                <DButton week={true}> {unable?(<input type='checkbox' name='0' value={false} onChange={handleDays} disabled></input>):<input type='checkbox' name='0' value={false} onChange={handleDays}></input>}</DButton>
                <SButton week='S'> {unable?(<input type='checkbox' name='1' value={false} onChange={handleDays} disabled></input>):<input type='checkbox' name='1' value={false} onChange={handleDays}></input>}</SButton>
                <TButton week='T'> {unable?(<input type='checkbox' name='2' value={false} onChange={handleDays} disabled></input>):<input type='checkbox' name='2' value={false} onChange={handleDays}></input>}</TButton>
                <QButton week='Q'> {unable?(<input type='checkbox' name='3' value={false} onChange={handleDays} disabled></input>):<input type='checkbox' name='3' value={false} onChange={handleDays}></input>}</QButton>
                <QButton week='Q'> {unable?(<input type='checkbox' name='4' value={false} onChange={handleDays} disabled></input>):<input type='checkbox' name='4' value={false} onChange={handleDays}></input>}</QButton>
                <SButton week='S'> {unable?(<input type='checkbox' name='5' value={false} onChange={handleDays} disabled></input>):<input type='checkbox' name='5' value={false} onChange={handleDays}></input>}</SButton>
                <SButton week='S'> {unable?(<input type='checkbox' name='6' value={false} onChange={handleDays} disabled></input>):<input type='checkbox' name='6' value={false} onChange={handleDays}></input>}</SButton>
            </DayButton>

            <Buttons>
                {unable?(<button disabled> <ThreeDots color="#FFF" height={20} width={20} margin={'auto'}/> </button>): <><div onClick={DisplayModify}>Cancelar</div> <button type='submit'> Salvar </button></>}
            </Buttons>

            </form>
            </Form>
        </CreateHabit>
        {tasks.length==0?<NoHabit>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabit>:<></>}

        <Habit>
            {tasks.length!=0?tasks.map(t=>
                <HabitsList t={t} reloadHabits={reloadHabits} setReloadHabits={setReloadHabits}/> ):<></>}
        </Habit>
        
        

        </>
    
    )

}
const Buttons=styled.div`
width: 300px;
display: flex;
justify-content: right;
margin-top: 15px;
font-size: 14px;
div{
    padding: 5px 15px;
    color: #52B6FF;
    background-color: #fff;
}
button{
    padding: 5px 15px;
    background-color: #52B6FF;
    color:#fff;
    border: none;
    border-radius: 5px;
}
`
const Habit = styled.div`
width: 340px;
margin: 15px auto 120px auto;
display: flex;
flex-direction: column;
scroll-behavior: auto;
`
const DButton =styled(WeekdayButtonAll)`
        input::before{
        content: 'D';
        padding:0 10px 0 0;
        align-items: center;
        justify-content: center;
    }
`
const SButton =styled(WeekdayButtonAll)`
        input::before{
        content: 'S';
        padding:0 10px 0 0;
        align-items: center;
        justify-content: center;
    }
`
const TButton =styled(WeekdayButtonAll)`
        input::before{
        content: 'T';
        padding:0 10px 0 0;
        align-items: center;
        justify-content: center;
    }
`
const QButton =styled(WeekdayButtonAll)`
        input::before{
        content: 'Q';
        padding:0 10px 0 0;
        align-items: center;
        justify-content: center;
    }
`

const Top = styled.div`
    width: 340px;
    margin: 100px auto 15px auto;
    color:#126BA5;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
`

const DayButton =styled.div`
    display: flex;
`
const Form=styled.div`
width: 300px;
height: 160px;
margin: 15px 15px;
display: flex;
flex-direction: column;
    input{
        width: 300px;
        height: 45px;
        border: 1px solid #D4D4D4;
        border-radius: 3px;
        padding-left: 10px;
    }
`
const Button= styled.div`
    height: 35px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    justify-content: center;
    text-align: center;
    color: #fff;
    background-color: #52B6FF;
`
const NoHabit =styled.div`
width: 340px;
margin: 20px auto auto auto;
color: #666666;
display: flex;
flex-wrap: wrap;
font-size: 18px;
font-weight: 100;
`
const DoneHabit=styled.div`
width: 340px;
margin: 5px auto auto auto;
color: #666666;
display: flex;
flex-wrap: wrap;
p{
    color: #8FC549;
}
`
const CreateHabit = styled.div`
    width: 340px;
    display: ${props => props.displayCreate?('inherits'):'none'};
    height: 180px;
    margin: 0 auto;
    border-radius: 10px;
    background-color: #fff;
`