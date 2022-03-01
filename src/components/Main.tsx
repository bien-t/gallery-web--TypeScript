import React from "react";
import styled from "styled-components";

interface Props {
    children: React.ReactNode
}

const MainStyle = styled.main`
height:calc(100vh - 200px);
`

function Main({ children }: Props) {
    return (
        <MainStyle>
            {children}
        </MainStyle>
    )
}

export default Main