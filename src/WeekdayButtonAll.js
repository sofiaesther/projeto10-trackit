import styled from 'styled-components';
const WeekdayButtonAll = styled.div`
input{
        -webkit-appearance: none;
        appearance: none;
        width: 30px !important;
        height: 30px !important;
        border: 1px solid #D4D4D4;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        margin: 10px 5px 0 0;
        background-color: #fff;
        color: #D4D4D4;
        display: grid;
        place-content: center;
}
        input:checked {
        background-color: #D4D4D4;
        color:#fff;
    }
`
export default WeekdayButtonAll;