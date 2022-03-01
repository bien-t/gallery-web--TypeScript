import React from "react";
import { Form, Error, SubmitButton, Label, Input } from './styles/Styles'
import { Link } from "react-router-dom";

interface Props {
    submit: (event: React.FormEvent) => Promise<void>
    changeValue: (event: React.ChangeEvent<HTMLInputElement>) => void
    errors: { message: string }[]
    disable: () => boolean
}

function SignupForm({ submit, changeValue, errors, disable }: Props) {
    return (
        <Form onSubmit={submit}>
            <h2>Create Account</h2>
            <Label htmlFor="email">Email:</Label>
            <Input type="email" name="email" id="email" placeholder="Email" onChange={changeValue} required />
            <Label htmlFor="confirmEmail">Confirm email:</Label>
            <Input type="email" name="confirmEmail" id="confirmEmail" placeholder="Confirm your email" onChange={changeValue} required />
            <Label htmlFor="password">Password:</Label>
            <Input type="password" name="password" id="password" placeholder="Password" onChange={changeValue} required />
            <Label htmlFor="ConfirmPassword">Confirm password:</Label>
            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" onChange={changeValue} required />
            {errors &&
                errors.map((error, index) => {
                    return (
                        <Error key={`error-${index}`}>{error.message}</Error>
                    )
                })
            }
            <SubmitButton width={100} height={40} type="submit" disabled={disable()}>Sign up</SubmitButton>
            <Link to="/signin"> Already have an account? Log in</Link>
        </Form>
    )
}

export default SignupForm