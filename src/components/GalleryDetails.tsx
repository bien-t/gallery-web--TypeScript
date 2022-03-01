import React from "react";
import styled from 'styled-components'
import { colors } from './styles/Variables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

export type Child = {
    _id: string,
    __typename: string,
    name: string
}

interface Props {
    child: Child,
    contextClick: (_id: string, __typename: string) => React.MouseEventHandler
}

const GalleryIcon = styled.div`
    background-color:${colors.color2};
    width:180px;
    height:160px;
    border-radius:20px;
    border: 1px solid ${colors.color1};

    &:hover{
        border: 1px solid ${colors.hover1};
    }
    
    a {
        display:flex;
        align-items:center;
        justify-content:end;
        flex-direction:column;
        text-decoration:none;
        width:100%;
        height:100%;
        color:${colors.fontMain};

        svg {
            font-size:7rem;
            margin-bottom:20px;
        }
        
        &:hover {
            color:${colors.hover1};
        }
    }
`
const GalleryTitle = styled.span`
    margin-bottom:15px;
    text-align:center;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    width:80%;
`

function GalleryDetails({ child, contextClick }: React.PropsWithChildren<Props>) {
    return (
        <GalleryIcon >
            <Link to={`/galleries/${child._id}`} onContextMenu={contextClick(child._id, child.__typename)}>
                <FontAwesomeIcon icon={faFolder} />
                <GalleryTitle>{child.name}</GalleryTitle>
            </Link>
        </GalleryIcon>
    )
}

export default GalleryDetails