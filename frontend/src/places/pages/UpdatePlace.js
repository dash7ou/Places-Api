import React,{ useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';
import { useFrom } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card"

import "./PlaceForm.css"

const items = [
	{
		_id: '1',
		title: 'Empire State Building',
		description: 'One of the most famous sky scrapers in the world!',
		imageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
		address: '20 W 34th St, New York, NY 10001',
		location: {
			lat: 40.7484405,
			lng: -73.9878584
		},
		creator: '1'
	},
	{
		_id: 'p2',
		title: 'Empire State Building',
		description: 'One of the most famous sky scrapers in the world!',
		imageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
		address: '20 W 34th St, New York, NY 10001',
		location: {
			lat: 40.7484405,
			lng: -73.9878584
		},
		creator: '2'
	}
];

const UpdatePlace = () => {
	const placeId = useParams().placeId;

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


	let data = items.find((place) => place._id === placeId);

	useEffect(()=>{
		if(!data){
			data = null;
			return
		}
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
	}, [setFromData, data])


	const placeUpdateSubmitHandler = event =>{
		event.preventDefault();
		console.log(fromState.inputs)
	}

	return (
		data && fromState.inputs.description.value ? (
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
		):(
			<div className="center">
				<Card>
					<h2>Could not find place!</h2>
				</Card>
			</div>
		)
	);
};

export default UpdatePlace;
