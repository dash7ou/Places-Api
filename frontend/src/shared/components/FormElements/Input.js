import React, { useReducer, useEffect } from 'react';

import { validate } from '../../utils/validators';

import './Input.css';

const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators)
			};
		case 'TOUCH':
			return {
				...state,
				isTouched: true
			};
		default:
			return state;
	}
};
const Input = ({
	id,
	label,
	element,
	type,
	placeholder,
	rows,
	validators,
	errorText,
	value: oldValue,
	valid: oldValid,
	onInput
}) => {
	const [ inputState, dispatch ] = useReducer(inputReducer, {
		value: oldValue || '',
		isValid: oldValid || false,
		isTouched: false
	});

	const changeHandler = (event) => {
		dispatch({ type: 'CHANGE', val: event.target.value, validators });
	};

	const touchHandler = (_) => {
		dispatch({
			type: 'TOUCH'
		});
	};

	const { value, isValid } = inputState;
	useEffect(
		() => {
			onInput(id, value, isValid);
		},
		[ id, value, isValid, onInput ]
	);

	const elementForm =
		element === 'input' ? (
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		) : (
			<textarea
				id={id}
				onChange={changeHandler}
				rows={rows || 3}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		);
	return (
		<div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
			<label htmlFor={id}>{label} </label>
			{elementForm}
			{!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
		</div>
	);
};

export default Input;
