import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";


import "./PlacesList.css";

const PlacesList = ({ items, onDeletePlaceHandler })=>{
    return(
        items.length > 0 ? (
            <ul className="place-list">
                {
                    items.map(
                        place => <PlaceItem key={place._id} place={place} onDeletePlaceHandler={onDeletePlaceHandler}/>
                    )
                }
            </ul>
        ) 
        : 
        (
            <div className="place-list center">
                <Card>
                    <h2> No places found. Maybe create one? </h2>
                    <Button to="/places/new"> Share Places </Button>
                </Card>
            </div>
        )
    )
}

export default PlacesList;