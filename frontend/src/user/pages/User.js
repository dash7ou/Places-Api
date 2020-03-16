import React from "react";
import UserList from "../components/UserList";

const User = ()=>{
    const USERS = [
        {
            _id:"1",
            name: "shima zourob",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS2AhRVnZBfcAUValHymcCcdv6U5iuk0nwPogBG6dAtPK_1s2qS",
            placeCount: 3
        }
    ]
    return(
        <UserList items={USERS}/>
    )
}

export default User;