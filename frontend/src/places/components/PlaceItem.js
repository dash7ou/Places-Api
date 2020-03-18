import React, { useState, Fragment } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

import "./PlaceItem.css"

const PlaceItem = ({ place: {_id, imageUrl, title, description, address, creator, location }})=>{
    const [showMap, changeStateShow] = useState(false);
    const onChangeStateShow = ()=>{
        changeStateShow(!showMap)
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
                        <Button to={`/places/${_id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </Fragment>
    );
}


export default PlaceItem;