import React from 'react'
import styled from 'styled-components'
import { colors } from './styles/Variables'

type Position = {
    x: number,
    y: number
}

interface Props {
    position: Position
}


const Menu = styled.div<Position>`
position:absolute;
top:${props => props.y}px;
left:${props => props.x}px;
width:150px;
height:auto;
background-color:${colors.color3};
border-radius:5px;
ul{
    padding:0;
    margin:0;
    list-style-type:none;
    li {
        border-bottom:1px solid ${colors.color1};
        padding:5px;

        &:hover {
        background-color:${colors.color1};
        color:${colors.white};
        border-bottom:1px solid ${colors.white};
        cursor:pointer;
        }

        &:nth-last-child(1) {
            border:none;
            &:hover{
                border-bottom-left-radius:5px;
                border-bottom-right-radius:5px;
            }
        }

        &:first-child {
            &:hover{
                border-top-left-radius:5px;
                border-top-right-radius:5px;
            }
        }
    }
}
`


function ContextMenu({ position, children }: React.PropsWithChildren<Props>) {
    return (
        <Menu x={position.x} y={position.y}>
            {children}
        </Menu>
    )
}

export default ContextMenu
