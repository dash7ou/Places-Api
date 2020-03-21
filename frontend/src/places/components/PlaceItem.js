import React, { useState, Fragment, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context"

import "./PlaceItem.css"

const PlaceItem = ({ place: {_id, imageUrl, title, description, address, creator, location }})=>{
    const { isLoggedIn } = useContext(AuthContext)
    const [showMap, changeStateShow] = useState(false);
    const [showConfirm , changeConfirmState ] = useState(false);

    const onChangeStateShow = ()=>{
        changeStateShow(!showMap)
    }
    const onCahngeStateShowConfirm = ()=>{
        changeConfirmState(!showConfirm)
    }
    const confirmDeleteHandler = ()=>{
        console.log("delete")
        onCahngeStateShowConfirm()
    }
    return (
        <Fragment>
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
                    <div className="place-item__image">
                        <img src={imageUrl} alt={title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{title}</h2>
                        <h3>{address}</h3>
                        <p>{description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={onChangeStateShow}>View On Map</Button>
                        {isLoggedIn && <Fragment><Button to={`/places/${_id}`}>EDIT</Button>
                        <Button danger onClick={onCahngeStateShowConfirm}>DELETE</Button></Fragment>}
                    </div>
                </Card>
            </li>
        </Fragment>
    );
}


export default PlaceItem;