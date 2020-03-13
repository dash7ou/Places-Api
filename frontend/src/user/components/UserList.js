import React from "react";
import UserItem from "./UserItem";


import "./UserList.css";


const UserList = ({ items })=>{
    return (
        items && items.length > 0 ? (
            <ul>
                {items.map(user => <UserItem key={user._id} userItem={user}/>)}
            </ul>
        ):(
            <div className="center">
                <h2>No user found.</h2>
            </div>
        )
    )
}


export default UserList;