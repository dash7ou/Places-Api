import React,{ useEffect, Fragment, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';
import { useFrom } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.js";
import Spinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context"

import "./PlaceForm.css"

const UpdatePlace = () => {
	const placeId = useParams().placeId;
	const [ isLoading , error , sendRequest , clearError ] = useHttpClient();
	const { userId } = useContext(AuthContext);

	const [ fromState, inputHandler, setFromData ] = useFrom({
		title:{
			value: "",
			isValid: false
		},
		description:{
			value: "",
			isValid: false
		}
	}, false);

	const history = useHistory()


	useEffect(()=>{
		const getData = async ()=>{
			try{
				const data = await sendRequest(`http://localhost:5000/api/v1/places/${placeId}`);
				const {title , description } = data;
				if(title && description){
					setFromData({
						title:{
							value: title,
							isValid: true
						},
						description:{
							value: description,
							isValid: true
						}
					}, true)
				}
			}catch(err){}
		}
		getData();

	}, [placeId, setFromData,sendRequest])


	const placeUpdateSubmitHandler = async event =>{
		event.preventDefault();
		try{
			await sendRequest(`http://localhost:5000/api/v1/places/${placeId}`, 'PATCH', JSON.stringify({
				title: fromState.inputs.title.value,
				description:fromState.inputs.description.value
			}),{
				"Content-Type":"application/json"
			})
			history.push(`/${userId}/places`)
		}catch(err){}
	}

	return (
		<Fragment>
		{isLoading && <Spinner asOverlay/>}
		<ErrorModal error={error} onClear={clearError} />
		{!isLoading && fromState.inputs.description.value ? (
			<Fragment>
			<form className='place-form' onSubmit={placeUpdateSubmitHandler}>
			<Input
				id='title'
				type='text'
				label='Title'
				element='input'
				validators={[ VALIDATOR_REQUIRE() ]}
				errorText='Please enter a vaild title.'
				onInput={inputHandler}
				value={fromState.inputs.title.value}
				valid={fromState.inputs.title.isValid}
			/>
			<Input
				id='description'
				label='Description'
				element='textarea'
				validators={[ VALIDATOR_MINLENGTH(5) ]}
				errorText='Please enter a vaild description at least 5 char.'
				onInput={inputHandler}
				value={fromState.inputs.description.value}
				valid={fromState.inputs.description.isValid}
			/>
			<Button type='submit' disabled={!fromState.isValid}>
				Update place
			</Button>
		</form>
		</Fragment>
		):(
			<div className="center">
				<Card>
					<h2>Could not find place!</h2>
				</Card>
			</div>
		)}
		</Fragment>
	)
};

export default UpdatePlace;
