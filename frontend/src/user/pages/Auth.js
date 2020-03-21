import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useFrom } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH
} from "../../shared/utils/validators";

import "./Auth.css"

const Auth = ()=>{
    const [ formState , inputHandler ] = useFrom({
        email: {
            value: "",
            isValid: false,
        },
        password: {
            value: "",
            isValid: false
        }
    }, false)

    const onSubmitForm = (event)=>{
        event.preventDefault();
        console.log(formState.inputs)
    }
    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr/>
            <form onSubmit={onSubmitForm}>
                <Input 
                    id="email"
                    element="input"
                    type="email"
                    label="E-mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                <Input 
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid password at least 5 characters."
                    onInput={inputHandler}
                />
                <Button type="submit" disable={!formState.isValid}>Login</Button>
            </form>
        </Card>
    )
}


export default Auth;