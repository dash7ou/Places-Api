import React, {useState, useContext, Fragment} from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useFrom } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "../../shared/utils/validators";

import "./Auth.css"

const Auth = ()=>{
    const { login } = useContext(AuthContext);
    const [ isLoginMode, setIsLoginMode ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error , setError ] = useState(null);

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

    const onSwitchHandler = (event)=>{
        event.preventDefault();
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

    const onSubmitForm = async (event)=>{
        event.preventDefault();
        setIsLoading(true);
        if(isLoginMode){
            try{
                const response = await fetch("http://localhost:5000/api/v1/users/login", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                })
                const data = await response.json();
                if(!response.ok) throw new Error(data.message);
                setIsLoading(false)
                console.log(data)
                // login()
            }catch(err){
                setError(err.message || 'Something went wrong, please try again.');
                setIsLoading(false)
            }
        }else{
            try{
                const response = await fetch("http://localhost:5000/api/v1/users/signup", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                })
                const data = await response.json();
                if(!response.ok) throw new Error(data.message);
                setIsLoading(false)
                console.log(data)
                // login()
            }catch(err){
                console.log(err)
                setError(err.message || 'Something went wrong, please try again.');
                setIsLoading(false)
            }

        }
    }
    const errorHandle = ()=>{
        setError(false)
    }
    return (
        <Fragment>
        <ErrorModal error={error} onClear={errorHandle}/>
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
            <h2>Login Required</h2>
            <hr/>
            <form onSubmit={(event)=>onSubmitForm(event)}>
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
                <Button inverse onClick={onSwitchHandler}>Switch To { isLoginMode ? "SignUp" : "Login" }</Button>
            </form>
        </Card>
        </Fragment>
    )
}


export default Auth;