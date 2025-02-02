import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';

import './ImageUpload.css';

const ImageUpload = ({ id, center, onInput, errorText }) => {
	const [ file, setFile ] = useState(null);
	const [ previewUrl, setPreviewUrl ] = useState(null);
	const [ valid, setIsValid ] = useState(false);
	const filePickerRef = useRef();

	useEffect(
		() => {
			if (!file) {
				return;
			}

			const fileReader = new FileReader();
			fileReader.onload = () => {
				setPreviewUrl(fileReader.result);
			};
			fileReader.readAsDataURL(file);
		},
		[ file ]
	);

	const pickedHandler = (event) => {
		const { target: { files } } = event;
		let fileIsValid = valid;
		let pickedFile;
		if (files && files.length === 1) {
			pickedFile = files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			pickedFile = false;
		}

		onInput(id, pickedFile, fileIsValid);
	};
	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	return (
		<div className='form-control'>
			<input
				id={id}
				style={{ display: 'none' }}
				ref={filePickerRef}
				type='file'
				accept='.jpg,.png,.jpeg'
				onChange={pickedHandler}
			/>
			<div className={`image-upload ${center && 'center'}`}>
                <div className='image-upload__preview'>
                    {previewUrl && <img src={previewUrl} alt='Preview' />}
                    {!previewUrl && <p>please pick an image</p>}
                </div>
				<Button type='button' onClick={pickImageHandler}>
					{' '}
					PICK IMAGE
				</Button>
            </div>
            {!valid && <p>{errorText}</p>}
		</div>
	);
};

export default ImageUpload;
