import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			let formIsValid = true;
			for (const inputId in state.inputs) {
				if(!state.inputs[inputId]){
					continue;
				}
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
        case 'SET_DATA':
            return{
                inputs: action.inputs,
                isValid: action.formIsValid
            }
		default:
			return state;
	}
};

export const useFrom = (initialInputs, initialFormValidity)=>{
    const [ formState, dispatch ] = useReducer(formReducer, {
		inputs: initialInputs ,
		isValid: initialFormValidity
    });
    
    const inputHandler = useCallback((id, value, isValid) => {
		dispatch({
			type: 'INPUT_CHANGE',
			value,
			isValid,
			inputId: id
		});
    }, []);
    
    const setFromDate = useCallback(( inputData , fromValidity) =>{
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: fromValidity
        })
    }, [])
    return [ formState , inputHandler, setFromDate ];

}