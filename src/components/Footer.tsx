import React from "react";
import styled from "styled-components";
import { colors } from "./styles/Variables";

const FooterStyle = styled.footer`
    border-top: 3px solid ${colors.color2};
    height:150px;
    padding:20px;
`

function Footer() {
    return (
        <FooterStyle>
            <div>Footer</div>
        </FooterStyle>
    )
}

export default Footer