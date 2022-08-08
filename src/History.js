import styled from 'styled-components';

export default function History(){
    return(
        <>
        <Top>
        <h1>Histórico</h1>
        </Top>
        <Description>
        Em breve você poderá ver o histórico dos seus hábitos aqui!
        </Description>
        </>
    )
}

const Top = styled.div`
    width: 340px;
    margin: 100px auto 15px auto;
    color:#126BA5;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
`
const Description =styled.div`
width: 340px;
margin: 20px auto auto auto;
color: #666666;
display: flex;
flex-wrap: wrap;
font-size: 18px;
font-weight: 100;
`