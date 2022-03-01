import React from "react";
import styled from "styled-components";
import { Container, ButtonGeneral } from './styles/Styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons'

type ImageType = {
    url: string,
    index: number
}

type ImageProps = {
    url: string
}

interface Props {
    image: ImageType
    setSlider: (status: boolean) => void
    nextClick: (index: number) => void
    prevClick: (index: number) => void
}

const GallerySliderContainer = styled(Container)`
    position:absolute;
    left:0;
    top:0;
    max-width:100%;
    min-height:100%;
    align-items:center;
    justify-content:center;
    background-color:rgba(30,30,30,1);
    z-index:1;
`

const GallerySliderCloseButton = styled(ButtonGeneral)`
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:3rem;
    margin:5px 50px 0 auto;
`
const Image = styled.div<ImageProps>`
    background-image:url("${props => props.url}");
    background-position:center;
    background-size:contain;
    background-repeat:no-repeat;
    width:100%;
    min-height:100vh;
    position:relative;
`

const NextButton = styled(ButtonGeneral)`
    position:absolute;
    right:50px;
    font-size:3rem;
`

const PreviousButton = styled(ButtonGeneral)`
    position:absolute;
    left:50px;
    font-size:3rem;
`

function ImageSlider({ image, setSlider, nextClick, prevClick }: Props) {
    return (
        <GallerySliderContainer>
            <Image url={image.url} >
                <GallerySliderCloseButton width={40} height={40} onClick={() => setSlider(false)}>X</GallerySliderCloseButton>
            </Image>
            <PreviousButton width={50} height={50} onClick={() => prevClick(image.index)}><FontAwesomeIcon icon={faLessThan}></FontAwesomeIcon> </PreviousButton>
            <NextButton width={50} height={50} onClick={() => nextClick(image.index)}><FontAwesomeIcon icon={faGreaterThan}></FontAwesomeIcon> </NextButton>
        </GallerySliderContainer>
    )
}

export default ImageSlider