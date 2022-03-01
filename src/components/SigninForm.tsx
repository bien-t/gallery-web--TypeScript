
import React from "react";
import { Link } from "react-router-dom";
import { Form, Error, SubmitButton, Label, Input } from './styles/Styles'

interface Props {
    submit: (event: React.FormEvent) => Promise<void>
    changeValue: (event: React.ChangeEvent<HTMLInputElement>) => void
    errors: { message: string }[]
}

function SigninForm({ submit, changeValue, errors }: Props) {
    return (
        <Form onSubmit={submit}>
            <h2>Log in</h2>
            <Label htmlFor="email">Email:</Label>
            <Input type="email" name="email" id="email" placeholder="Email" onChange={changeValue} required />
            <Label htmlFor="password">Password:</Label>
            <Input type="password" name="password" id="password" placeholder="Password" onChange={changeValue} required />
            {errors &&
                errors.map((error, index) => {
                    return (
                        <Error key={`error-${index}`}>{error.message}</Error>
                    )
                })
            }
            <SubmitButton width={90} height={40} type="submit">Log in</SubmitButton>
            <Link to="/signup"> Don't have an account yet? Create a new one</Link>
        </Form>
    )
}

export default SigninForm