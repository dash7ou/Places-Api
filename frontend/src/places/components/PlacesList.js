import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";

import "./PlacesList.css";

const PlacesList = ({ items })=>{
    return(
        items.length > 0 ? (
            <ul className="place-list">
                {
                    items.map(
                        place => <PlaceItem key={place._id} place={place}/>
                    )
                }
            </ul>
        ) 
        : 
        (
            <div className="place-list center">
                <Card>
                    <h2> No places found. Maybe create one? </h2>
                    <button> Share Places </button>
                </Card>
            </div>
        )
    )
}

export default PlacesList;