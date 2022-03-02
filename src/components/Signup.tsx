
import React from "react";
import SignupForm from "./SignupForm";
import {
    Section,
    Container,
    TopBar,
    BottomBar,
} from './styles/Styles'
import { useNavigate, Navigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { USER_CREATE } from '../gql/mutation'

interface Inputs {
    email: string,
    confirmEmail: string
    password: string
    confirmPassword: string
}

function Signup() {
    const [formValues, setFormValues] = React.useState({} as Inputs)
    const [emailError, setEmailError] = React.useState({ message: '' })
    const [passwordError, setPasswordError] = React.useState({ message: '' })
    const [userError, setUserError] = React.useState([])
    const [userCreate] = useMutation(USER_CREATE)
    const navigate = useNavigate()
    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserError([])
        setFormValues(state => {
            state[event.target.name as keyof Inputs] = event.target.value
            checkPassword(state.password, state.confirmPassword)
            checkEmail(state.email, state.confirmEmail)
            return {
                ...state
            }
        })
    }
    const checkEmail = (email: string, confirmEmail: string) => {
        if (email !== confirmEmail) {
            setEmailError({ message: 'Email addresses are different' })
        } else {
            setEmailError({ message: '' })
        }
    }

    const checkPassword = (password: string, confirmPassword: string) => {
        if (password !== confirmPassword) {
            setPasswordError({ message: 'Passwords are different' })
        } else {
            setPasswordError({ message: '' })
        }
    }
    const submitValues = async (event: React.FormEvent) => {
        event.preventDefault()
        const { data } = await userCreate({
            variables: {
                input: {
                    email: formValues.email,
                    confirmEmail: formValues.confirmEmail,
                    password: formValues.password,
                    confirmPassword: formValues.confirmPassword
                }
            }
        })
        setUserError(data.userCreate.errors)
        if (data.userCreate.user) {
            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('id', data.userCreate.user._id);
            navigate('/galleries')
        }
    }

    const disableButton = () => {
        if (emailError.message || passwordError.message) {
            return true
        }
        return false
    }

    if (localStorage.getItem('isLogged')) {
        return <Navigate to="/galleries" />;
    }
    return (
        <Section>
            <Container>
                <TopBar />
                <SignupForm submit={submitValues} changeValue={changeValue} errors={[emailError, passwordError, ...userError]} disable={disableButton} />
                <BottomBar />
            </Container>
        </Section>
    )
}

export default Signup