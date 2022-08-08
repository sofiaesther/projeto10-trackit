import logo from './img/logo.png';
import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { Link, useNavigate  } from "react-router-dom";
import { ThreeDots } from  'react-loader-spinner';
import { useState } from 'react';

export default function SignUp({ setColor,navigationbars,setNavigationbars }){
    const navigate = useNavigate();
    
    setNavigationbars(navigationbars=false);

    const [unable, setUnable] = React.useState( false );

    const [form, setForm] = React.useState({
            email: "",
            name: "",
            image: "",
            password: "",
      });

      function handleForm (e) {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        }) 
      }

      function sign(e){
        const loginrequest = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up',form);
        setUnable(!unable);
        e.preventDefault();
        loginrequest.then((element)=> {
            navigate("/")
        }
        )
        loginrequest.catch((element)=>{
            alert(`Erro ${element}`);
            setUnable(!unable);
        })
        
      }

    return(
        <>
        <Body>
        <Content>
        <img src={logo} />
        <form onSubmit={unable?(undefined):sign}>
            <Form>
                {unable?(<input name="name" type="text" onChange={handleForm} placeholder="Nome" required disabled></input>):<input name="name" type="text" onChange={handleForm} placeholder="Nome" required></input>}
                {unable?(<input name="email" type="email" onChange={handleForm} placeholder="Email" required disabled></input>):<input name="email" type="email" onChange={handleForm} placeholder="Email" required></input>}
                {unable?(<input name="image" type="url" onChange={handleForm} placeholder="Imagem de Perfil" required disabled></input>):<input name="image" type="url" onChange={handleForm} placeholder="Imagem de Perfil" required></input>}
                {unable?(<input name="password" type="text" onChange={handleForm} placeholder="Senha" required disabled></input>):<input name="password" type="text" onChange={handleForm} placeholder="Senha" required></input>}
                {unable?(<button type="submit"><ThreeDots color="#FFF" height={40} width={40} margin={'auto'} disabled/></button>):<button type="submit">Cadastrar</button>}
             </Form>
         </form>
         <Link to={'/'}>
             <LinkTo>
                Já tem uma conta? Faça login!
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