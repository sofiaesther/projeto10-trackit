import styled from 'styled-components';

export default function Top({userinfo}){
    return(
        <Topdiv>
            <p>TrackIt</p>
            <img src={userinfo.image} />
        </Topdiv>
    )
}

const Topdiv =styled.div`
width: 100%;
height: 70px;
background-color: #126BA5;
position: fixed;
top: 0;
left: 0;
font-family: 'Playball';
font-size:30px;
color: #fff;
padding: 0 30px;
display: flex;
align-items: center;
justify-content: space-between;
z-index: 2;

img{
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50px;
    margin-right: 60px;
    z-index: 3;
}

`