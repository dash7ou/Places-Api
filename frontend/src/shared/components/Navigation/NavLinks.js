import React, { useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";


import { AuthContext } from "../../context/auth-context"

import "./NavLinks.css";

const NavLinks = ()=>{
    const {isLoggedIn} = useContext(AuthContext);
    return(
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    All Users
                </NavLink>
            </li>
            {isLoggedIn && (<Fragment><li>
                <NavLink to="/:userId/places">
                    My Places
                </NavLink>
            </li>
            <li>
                <NavLink to="/places/new">
                    Add Places
                </NavLink>
            </li> </Fragment>)}
            {!isLoggedIn && <li>
                <NavLink to="/auth">
                    Authenticate
                </NavLink>
            </li> }
        </ul>
    )
};


export default NavLinks;