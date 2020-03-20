import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';
import { useFrom } from "../../shared/hooks/form-hook";

import './PlaceForm.css';

const NewPlace = () => {
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
			}
		}, false
	);


	const placeSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs);
	};
	return (
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
			<Button type='submit' disabled={!formState.isValid}>
				Add place
			</Button>
		</form>
	);
};

export default NewPlace;
