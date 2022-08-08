import logo from './img/logo.png';
import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { Link, useNavigate  } from "react-router-dom";
import { ThreeDots } from  'react-loader-spinner';
import { useState } from 'react';
import UserContext from "./contexts/UserContext";
import { useContext } from "react";

export default function Login({ setColor, userinfo,setUserinfo,navigationbars,setNavigationbars }){
    setColor('#fff');
    const navigate = useNavigate();
    setNavigationbars(navigationbars=false);

    const { config, setConfig } = useContext(UserContext);

    const [unable, setUnable] =React.useState(false);

    const [form, setForm] = React.useState({
        email: '',
        password: ''
      });

      function handleForm (e) {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        }) 
      }

      function Enterlogin(e){
        setUnable(!unable)
        const loginrequest = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',form);
        e.preventDefault();

        loginrequest.then(element=> {
            setConfig({headers:{...config, Authorization: `Bearer ${element.data.token}`}});
            setUserinfo(element.data);
            const userData = JSON.stringify(element.data)
            localStorage.setItem("UserData", userData);
            navigate('./hoje');
        }
        )
        loginrequest.catch((element)=>{
            alert(`Erro ${element}`);
            setUnable(false);
        })
        
      }

    return(
        <>
        <Body>
        <Content>
        <img src={logo} />
        <form onSubmit={unable?(undefined):Enterlogin}>
            <Form>
                {unable?(<input name="email" type="text" onChange={handleForm} placeholder="Email" required disabled></input>):<input name="email" type="text" onChange={handleForm} placeholder="Email" required></input>}
                {unable?(<input name="password" type="text" onChange={handleForm} placeholder="Senha" required disabled></input>):<input name="password" type="text" onChange={handleForm} placeholder="Senha" required></input>}
                {unable?(<button type="submit" disabled><ThreeDots color="#FFF" height={40} width={40} margin={'auto'}/></button>):<button type="submit">Entrar</button>}
            </Form>
         </form>
         <Link to={'/cadastro'}>
         <LinkTo>
                Não tem uma conta? Cadastre-se!
            </LinkTo>
         </Link>
        
        </Content>
        </Body>
        </>
    )
}
const Body =styled.div`
width: 100%;
height: 100%;
background-color: #fff;
position: fixed;
bottom: 0;
`
const LinkTo = styled.div`
        margin: 10px auto auto auto;
        text-align: center;
        font-size: 12px;
        color: #52B6FF;
`
const Content=styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 150px auto auto auto;
    img{
        width: 150px;
        margin: auto;
    }
    button {
        height: 45px;
        background-color: #52B6FF;
        color: #fff;
        border: none;
        border-radius: 5px;
        }
`
const Form=styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    input{
        height: 45px;
        border: #D5D5D5 solid 1px;
        border-radius: 5px;
        margin-bottom:5px;
        padding-left: 10px ;
        ::placeholder{
            font-style: italic;
            color: lightgray;
        }
    }
    button{
        display: flex;
        align-items: center;
        justify-content: center;
    }
`