import React from "react";

import "./UserItem.css";

const UserItem = ({userItem})=>{
    const {
        image,
        name,
        placeCount
    } = userItem;
    return(
        <li className="user-item">
            <div className="user-item__content">
                <div className="user-item__image">
                    <img src={image} alt={name} />
                </div>
                <div className="user-item__info">
                    <h2>{name}</h2>
                    <h3> {placeCount} {placeCount > 1 ? "places" : "place"}</h3>
                </div>
            </div>
        </li>
    )
}


export default UserItem;