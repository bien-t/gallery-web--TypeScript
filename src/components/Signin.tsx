import React from "react";
import {
    Section,
    Container,
    TopBar,
    BottomBar,
} from './styles/Styles'
import SigninForm from "./SigninForm";
import { useMutation } from '@apollo/client'
import { USER_LOGIN } from '../gql/mutation'
import { useNavigate, Navigate } from 'react-router-dom'

function Signin() {
    const [formValues, setFormValues] = React.useState({ email: '', password: '' })
    const [userError, setUserError] = React.useState<[{ message: string }]>([{ message: '' }])
    const [userLogin, { loading, error }] = useMutation(USER_LOGIN)
    const navigate = useNavigate()
    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }

    const submitValues = async (event: React.FormEvent) => {
        event.preventDefault()
        const { data } = await userLogin({
            variables: {
                input: {
                    email: formValues.email,
                    password: formValues.password
                }
            }
        })

        setUserError(data.userLogin.errors)
        if (data.userLogin.errors.length === 0) {

            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('id', data.userLogin.user._id);

            navigate('galleries')

        }

    }
    if (localStorage.getItem('isLogged')) {
        return <Navigate to="/galleries" />;
    }

    return (
        <Section>
            <Container>
                <TopBar />
                <SigninForm submit={submitValues} changeValue={changeValue} errors={userError} />
                <BottomBar />
            </Container>
        </Section>
    )
}

export default Signin