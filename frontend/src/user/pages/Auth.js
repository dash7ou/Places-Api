import React, {useState, useContext, Fragment} from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useFrom } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook"
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from "../../shared/utils/validators";

import "./Auth.css"

const Auth = ()=>{
    const { login } = useContext(AuthContext);
    const [ isLoginMode, setIsLoginMode ] = useState(true);
    const [ isLoading , error, sendRequest, clearError ] = useHttpClient()

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
                name: undefined,
                image: undefined,
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }else{
            setDateForm({
                ...formState.inputs,
                name: {
                    value: "",
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const onSubmitForm = async (event)=>{
        event.preventDefault();
        if(isLoginMode){
            try{
                const data = await sendRequest("http://localhost:5000/api/v1/users/login", "POST",JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {
                    "Content-Type": "application/json"
                })
                login(data._id.toString())
            }catch(err){}
        }else{
            try{
                const formData = new FormData();
                formData.append("email", formState.inputs.email.value)
                formData.append("name", formState.inputs.name.value)
                formData.append("password", formState.inputs.password.value)
                formData.append("image", formState.inputs.image.value)
                const data = await sendRequest("http://localhost:5000/api/v1/users/signup", "POST",formData)
                login(data._id.toString())
            }catch(err){}
        }
    }

    return (
        <Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
            <h2>Login Required</h2>
            <hr/>
            <form onSubmit={(event)=>onSubmitForm(event)}>
                {
                    !isLoginMode &&<Fragment> 
                    <Input 
                        element="input"
                        id="name"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid name"
                        onInput={inputHandler}
                    />
                    <ImageUpload id="image" center onInput={inputHandler}/>
                    </Fragment>
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
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a valid password at least 6 characters."
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