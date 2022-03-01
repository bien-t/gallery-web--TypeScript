import React from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import styled from "styled-components";
import { colors } from "./styles/Variables";
import { useApolloClient, useMutation } from "@apollo/client";
import { LOG_OUT } from '../gql/mutation'
import { ButtonGeneral } from './styles/Styles'


const NavList = styled.ul`
    display:flex;
    list-style-type:none;
    margin:0;
`

const NavListItem = styled(ButtonGeneral)`
    display:flex;
    margin-right:10px;
    a {
        color:${colors.white};
        text-decoration:none;
        width:100%;
        height:100%;
        padding-top:10px;
        text-align:center;
    }
`

function Navigation() {
    const client = useApolloClient()
    const [log, { loading, error }] = useMutation(LOG_OUT)
    const navigate = useNavigate()


    const logout = async (event: React.MouseEvent) => {
        event.preventDefault()
        const { data } = await log()
        localStorage.removeItem('isLogged');
        localStorage.removeItem('id');
        client.clearStore();
        navigate('/signin')
    }

    return (
        <nav>
            <NavList>
                <NavListItem as="li" width={100} height={40}><NavLink to="/signin" onClick={logout}>Log out</NavLink></NavListItem>
            </NavList>
        </nav>
    )
}

export default Navigation