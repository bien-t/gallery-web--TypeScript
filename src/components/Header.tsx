import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

const HeaderStyle = styled.header`
    display:flex;
    height:50px;
    width:100%;
    justify-content: flex-end;
    align-items:center;
`

function Header() {
    return (
        <HeaderStyle>
            <Navigation />
        </HeaderStyle>
    )
}

export default Header