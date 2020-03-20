import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';

import './PlaceForm.css';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			let formIsValid = true;
			for (const inputId in state.inputs) {
				if (inputId === action.inputId) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: { value: action.value, isValid: action.isValid }
				},
				isValid: formIsValid
			};
		default:
			return state;
	}
};

const NewPlace = () => {
	const [ formState, dispatch ] = useReducer(formReducer, {
		inputs: {
			title: {
				value: '',
				isValid: false
			},
			description: {
				value: '',
				isValid: false
			}
		},
		isValid: false
	});
	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({
			type: 'INPUT_CHANGE',
			value,
			isValid,
			inputId: id
		});
	}, []);


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
