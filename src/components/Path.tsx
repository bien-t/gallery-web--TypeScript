import React from "react";
import styled from "styled-components";
import { colors } from './styles/Variables'
import { Link } from 'react-router-dom'

interface Props {
    path: string,
    id: string
}

const PathContainer = styled.div`
border-bottom: 3px solid ${colors.color2};
padding-left:15px;
display:flex;
flex-wrap:wrap;
 a {
     text-decoration:none;
     color:${colors.fontMain};
     font-weight:bold;
     &:hover{
         color:${colors.white}
     }
 }
`

function Path({ path, id }: Props) {
    let pathArray = path.split('/')
    let idArray = id.split('/')
    return (
        <PathContainer>Current location: {
            pathArray.map((path, index) => {
                return <Link key={`path-${index}`} to={`/galleries/${idArray[index]}`}>{path}/</Link>
            })
        }
        </PathContainer>
    )

}

export default Path