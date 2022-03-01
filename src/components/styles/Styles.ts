import styled from "styled-components"
import { colors } from "./Variables";

type ButtonSize = {
    width?:number,
    height?:number
}

export const Section = styled.section`
    display:flex;
    justify-content:center;
    margin-top:5%;
`

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    max-width: 400px;
    width:100%;
    max-height:500px;
`

const BarGeneral = styled.div`
    border-left: 1px solid ${colors.fontMain};
    border-right:1px solid ${colors.fontMain};
    height:30px;
    width:100%;
    background-color:${colors.backgroundMain};
`

export const TopBar = styled(BarGeneral)`
    border-radius: 5px 5px 0 0;
    border-top:1px solid ${colors.fontMain};
 `

export const BottomBar = styled(BarGeneral)`
    border-radius:  0 0 5px 5px;
    border-bottom:1px solid ${colors.fontMain};
 `

export const Form = styled.form`
    display:flex;
    min-width:150px;
    flex-direction:column;
    row-gap:10px;
    background-color:${colors.backgroundMain};
    border-left: 1px solid ${colors.fontMain};
    border-right:1px solid ${colors.fontMain};

    h2 {
        text-align: center;
    }

    a {
        text-decoration:none;
        color:${colors.fontMain};
        text-align:center;
        margin-top:5px;
        &:hover {
            color:${colors.hover1};
        }
    }
`
export const Label = styled.label`
    width:90%;
    align-self:center;
    color:${colors.fontMain};
`

export const Input = styled.input`
    width:90%;
    border:none;
    padding:5px;
    align-self:center;
    color:${colors.font1};
    background-color:#ccc;
    border-radius:5px;
`

export const Error = styled.span`
    color:${colors.red};
    text-align:center;
`

export const ButtonGeneral = styled.button<ButtonSize>`
    width:${props => props.width}px;
    height:${props => props.height}px;
    background-color:${colors.color1};
    border-radius:5px;
    color:${colors.white};
    cursor:pointer;
    border:none;

    &:hover{
        background-color:${colors.hover1}
    }
    
    &:disabled{
        background-color:gray;
        cursor:default;
    }
`

export const SubmitButton = styled(ButtonGeneral)`
    margin-top:auto;
    align-self: center;
    padding:10px 15px;
    text-transform:uppercase;
    font-weight:bold;
`