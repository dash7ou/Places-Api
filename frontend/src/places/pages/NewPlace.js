import React, { useContext, Fragment } from 'react';
import { useHistory } from "react-router-dom";

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Spinner from "../../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';
import { useFrom } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import './PlaceForm.css';

const NewPlace = () => {
	const [isLoading,  error , sendRequest, clearError ] = useHttpClient();
	const { token } = useContext(AuthContext);
	const [formState , inputHandler] = useFrom(
		{
			title: {
				value: '',
				isValid: false
			},
			description: {
				value: '',
				isValid: false
			},
			address:{
				value: "",
				isValid: false
			},
			image:{
				value: "",
				isValid: false
			}
		}, false
	);


	const history = useHistory();
	const placeSubmitHandler = async (event) => {
		event.preventDefault();
		try{
			const formData = new FormData();
			formData.append("title", formState.inputs.title.value)
			formData.append("address", formState.inputs.address.value)
			formData.append("description", formState.inputs.description.value)
			formData.append("image", formState.inputs.image.value)
			await sendRequest("http://localhost:5000/api/v1/places", 'POST', formData, {
				Authorization: 'Bearer '+ token
			})
			//redirect user to different page
			history.push('/')

		}catch(err){}

	};
	return (
		<Fragment>
		<ErrorModal error={error} onClear={clearError} />
		{isLoading && <Spinner asOverlay />}
		<form className='place-form' onSubmit={placeSubmitHandler}>
			<Input
				id='title'
				type='text'
				label='Title'
				element='input'
				validators={[ VALIDATOR_REQUIRE() ]}
				errorText='Please enter a vaild title.'
				onInput={inputHandler}
			/>
			<Input
				id='description'
				label='Description'
				element='textarea'
				validators={[ VALIDATOR_MINLENGTH(5) ]}
				errorText='Please enter a vaild description at least 5 char.'
				onInput={inputHandler}
			/>
			<Input
				id='address'
				element='input'
				label='Address'
				errorText='Please enter a valid address'
				validators={[ VALIDATOR_REQUIRE() ]}
				onInput={inputHandler}
			/>
			<ImageUpload id="image" onInput={inputHandler} errorText="Please provid an image" />
			<Button type='submit' disabled={!formState.isValid}>
				Add place
			</Button>
		</form>
		</Fragment>
	);
};

export default NewPlace;
