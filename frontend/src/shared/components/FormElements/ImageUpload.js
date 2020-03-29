import React, { useRef } from "react";

import Button from "./Button";

import "./ImageUpload.css";


const ImageUpload = ({id , center})=>{
    const filePickerRef = useRef();

    const pickedHandler = event=>{
        console.log(event.target)
    }
    const pickImageHandler = ()=>{
        filePickerRef.current.click();
    }

    return(
        <div className="form-control">
            <input 
                id={id} 
                style={{display: "none"}} 
                ref={filePickerRef}
                type="file" 
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${center && 'center'}`}>
                <div className="image-upload__preview">
                    <img src="" alt="Preview" />
                </div>
                <Button type="button" onClick={pickImageHandler}> PICK IMAGE</Button>
            </div>
        </div>
    )
}


export default ImageUpload;