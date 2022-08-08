import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function Menu({ percentage }){
    
return(
<MenuTotal>

    <TodayCircle>
    <Link to={'/hoje'}>
    <CircularProgressbar value={percentage} text={'Hoje'} styles={buildStyles( {strokeLinecap: 'round', pathColor:'#fff', textColor:'#fff',transformOrigin: 'center center'})}/>
    </Link>
    </TodayCircle>
    <Menubar>
        <Link to={'/habitos'}>
        <Text>Hábitos</Text>
        </Link>
        <Link to={'/historico'}>
        <Text>Histórico</Text>
        </Link>
    </Menubar>
</MenuTotal>
)
}

const TodayCircle = styled.div`
    width: 91px;
    height: 91px;
    background-color: #52B6FF;
    border-radius: 90px;
    position: fixed;
    bottom: 25px;
    left: calc(50% - 45.5px);
    z-index: 4;
    color:#fff;
    font-size: 18px;
    .CircularProgressbar-text {
    transform: translate(-20px, 5px);
}
`
const MenuTotal = styled.div`
width: 100%;
position: fixed;
bottom: 0;
left: 0;
`
const Menubar = styled.div`
width: 100%;
height: 70px;
background-color: #ffffff;
position: fixed;
bottom: 0;
left: 0;
display: flex;
justify-content: space-between;
align-items: center;
font-family: 'Lexend Deca';
`
const Text = styled.div`
color: #52B6FF;
margin: auto 30px;

`