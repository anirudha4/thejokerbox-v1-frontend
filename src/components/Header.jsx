import React, { useContext } from 'react'
import Feather from 'feather-icons-react';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
export default function Header() {
    const {auth} = useContext(AuthContext);
    return (
        <div className="header">
            <div className="search">
                <input type="text" className="input-box" placeholder="Search Files" />
                <Feather icon="search" size={18} color="#555" />
            </div>
            <NavLink to='/profile' className="profile">
                {auth.name[0]}
            </NavLink>
        </div>
    )
}
