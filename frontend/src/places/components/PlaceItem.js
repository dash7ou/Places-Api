import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

import "./PlaceItem.css"

const PlaceItem = ({ place: {_id, imageUrl, title, description, address, creator, location }})=>{
    return (
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
                    <Button inverse>View On Map</Button>
                    <Button to={`/places/${_id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>
            </Card>
        </li>
    );
}


export default PlaceItem;