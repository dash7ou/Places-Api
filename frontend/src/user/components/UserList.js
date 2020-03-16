import React from "react";
import UserItem from "./UserItem";

import Card from "../../shared/components/UIElements/Card"

import "./UserList.css";


const UserList = ({ items })=>{
    return (
        items && items.length > 0 ? (
            <ul className="users-list">
                {items.map(user => <UserItem key={user._id} userItem={user}/>)}
            </ul>
        ):(
            <div className="center">
                <Card>
                    <h2>No user found.</h2>
                </Card>
            </div>
        )
    )
}


export default UserList;