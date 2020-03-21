import React, {useState} from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useFrom } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "../../shared/utils/validators";

import "./Auth.css"

const Auth = ()=>{
    const [ isLoginMode, setIsLoginMode ] = useState(true);
    const [ formState , inputHandler, setDateForm ] = useFrom({
        email: {
            value: "",
            isValid: false,
        },
        password: {
            value: "",
            isValid: false
        }
    }, false);

    const onSwitchHandler = ()=>{
        if(!isLoginMode){
            setDateForm({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }else{
            setDateForm({
                ...formState.inputs,
                name: {
                    value: "",
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const onSubmitForm = (event)=>{
        event.preventDefault();
        console.log(formState.inputs)
    }
    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr/>
            <form onSubmit={onSubmitForm}>
                {
                    !isLoginMode && <Input 
                        element="input"
                        id="name"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid name"
                        onInput={inputHandler}
                    />
                }
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
                <Button type="submit" disabled={!formState.isValid}>{ isLoginMode ? "Login" : "SignUp" }</Button>
                <Button inverse onClick={onSwitchHandler}>Switch To { isLoginMode ? "Login" : "SignUp" }</Button>
            </form>
        </Card>
    )
}


export default Auth;