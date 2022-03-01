import React from "react";
import styled from 'styled-components'
import { colors } from './styles/Variables'

export type ImageType = {
    _id: string,
    __typename: string,
    mime: string,
    miniatureImage: string,
    name: string
}

interface Props {
    image: ImageType
    index: number
    imageClick: (_id: string, index: number) => void,
    contextClick: (_id: string, __typename: string) => React.MouseEventHandler
}

const ImageIcon = styled.div`
    width:180px;
    height:160px;
    position:relative;
   
    img {
        border: 1px solid ${colors.color1};
        width:100%;
        height:100%;
        border-radius:20px;
        &:hover{
            cursor:pointer;
        }
    }
    

`
const GalleryTitle = styled.span`
    position:absolute;
    border-radius:10px;
    padding:5px;
    bottom:10px;
    background-color:rgba(30,30,30,0.7);
    text-align:center;
    width:80%;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    left: 50%;
    transform: translate(-50%, 0%);
    `

function Image({ image, index, imageClick, contextClick }: Props) {
    return (
        <ImageIcon onContextMenu={contextClick(image._id, image.__typename)}>
            <img alt={image.name} src={`data:${image.mime};base64,` + image.miniatureImage} onClick={() => imageClick(image._id, index)} />
            <GalleryTitle>{image.name}</GalleryTitle>
        </ImageIcon>
    )
}

export default Image