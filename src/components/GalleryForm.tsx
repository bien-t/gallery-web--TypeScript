import React from "react";
import styled from "styled-components";
import { Form, Container, TopBar, BottomBar, ButtonGeneral, SubmitButton } from './styles/Styles'
import { colors } from './styles/Variables'

interface Props {
    onSubmit: (event: React.FormEvent) => Promise<void>
    buttonText: string
    close: () => void
    children: React.ReactNode
}

const GalleryButton = styled(ButtonGeneral)`
    border:none;
    color:${colors.white};
    cursor:pointer;
`
const GalleryFormTopBar = styled(TopBar)`
    width:400px;
    margin-top:5%;
`

const GalleryFormBottomBar = styled(BottomBar)`
    width:400px;
`
const GalleryFormContent = styled(Form)`
    width:400px;
    height:auto;
    min-height:300px;
`
const GalleryFormContainer = styled(Container)`
    position:absolute;
    left:0;
    top:0;
    max-width:100%;
    min-height:100%;
    align-items:center;
    background-color:rgba(30,30,30,0.7);
    z-index:1;
`

const GalleryFormCloseButton = styled(GalleryButton)`
    display:flex;
    align-items:center;
    justify-content:center;
    margin: -10px -10px 0 auto;
    font-size:2rem;
`

function GalleryForm({ onSubmit, buttonText, close, children }: React.PropsWithChildren<Props>) {
    return (
        <GalleryFormContainer>
            <GalleryFormTopBar>
                <GalleryFormCloseButton width={30} height={30} onClick={close}>X</GalleryFormCloseButton>
            </GalleryFormTopBar>
            <GalleryFormContent onSubmit={onSubmit}>
                {children}
                <SubmitButton type='submit'>{buttonText}</SubmitButton>
            </GalleryFormContent>
            <GalleryFormBottomBar />
        </GalleryFormContainer>
    )
}

export default GalleryForm