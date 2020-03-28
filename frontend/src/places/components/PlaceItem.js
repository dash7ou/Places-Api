import React, { useState, Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import  { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Spinner from "../../shared/components/UIElements/LoadingSpinner";

import "./PlaceItem.css"

const PlaceItem = ({ place: {_id, image, title, description, address, creator, location }, onDeletePlaceHandler})=>{
    const { isLoggedIn , userId} = useContext(AuthContext)
    const [showMap, changeStateShow] = useState(false);
    const [showConfirm , changeConfirmState ] = useState(false);
    const [ isLoading , error , sendRequest, clearError ] = useHttpClient();

    const history = useHistory()

    const onChangeStateShow = ()=>{
        changeStateShow(!showMap)
    }

    const onCahngeStateShowConfirm = ()=>{
        changeConfirmState(!showConfirm)
    }

    const confirmDeleteHandler = async ()=>{
        onCahngeStateShowConfirm()
        try{
            await sendRequest(`http://localhost:5000/api/v1/places/${_id.toString()}`, 'DELETE');
        }catch(err){}
        onDeletePlaceHandler(_id)

    }

    return (
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal 
                show={showMap} 
                onCancel={onChangeStateShow}
                header={address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={onChangeStateShow}>Close</Button>}
            >
                <div className="map-container">
                    <Map center={location} zoom={16}/>
                </div>
            </Modal>
            <Modal
                show={showConfirm}
                onCancel={onCahngeStateShowConfirm}
                header="Are you sure ?"
                footerClass="place-item__modal-actions"
                footer={
                    <Fragment>
                        <Button inverse onClick={onCahngeStateShowConfirm}> Cancel </Button>
                        <Button danger onClick={confirmDeleteHandler}> Delete </Button>
                    </Fragment>
                }


            >
                <p>
                    Do you want to proceed and delete this place? Please note that it can't be undone.
                </p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    {isLoading && <Spinner  asOverlay />}
                    <div className="place-item__image">
                        <img src={image} alt={title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{title}</h2>
                        <h3>{address}</h3>
                        <p>{description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={onChangeStateShow}>View On Map</Button>
                        {isLoggedIn && (userId === creator) && <Fragment><Button to={`/places/${_id}`}>EDIT</Button>
                        <Button danger onClick={onCahngeStateShowConfirm}>DELETE</Button></Fragment>}
                    </div>
                </Card>
            </li>
        </Fragment>
    );
}


export default PlaceItem;