import React, { useContext } from 'react'
import logo from '../assets/img/logo.png'
import Feather from 'feather-icons-react'
import { NavLink } from 'react-router-dom'
import { ModalContext } from '../contexts/ModalContext'
import { AuthContext } from '../contexts/AuthContext'
export default function Sidebar() {
    const {setFileUploadModalStatus} = useContext(ModalContext)
    const {logout} = useContext(AuthContext)
    return (
        <div className="sidebar">
            <NavLink exact to="/" className="logo">
                <img src={logo} alt=""/>
            </NavLink>
            <div className="btn-container">
                <button className="btn btn-primary" onClick={e => {
                    setFileUploadModalStatus(prevState => !prevState);
                }}>
                    Upload
                    <Feather icon="upload" size={18} color="white" />
                </button>
            </div>
            <div className="menu">
                <NavLink exact to="/" className="menu-item">
                    <Feather icon="grid" size={18} color="#555" />
                    <span className="menu-text">Home</span>
                </NavLink>
                <NavLink to="/favourites" className="menu-item">
                    <Feather icon="star" size={18} color="#555"/>
                    <span className="menu-text">Favourites</span>
                </NavLink>
                <NavLink to="/profile" className="menu-item">
                    <Feather icon="user" size={18} color="#555" />
                    <span className="menu-text">Account</span>
                </NavLink>
                <div to="/logout" className="menu-item logout" onClick={logout}>
                    <Feather icon="log-out" size={18} color="#555" />
                    <span className="menu-text">Logout</span>
                </div>
            </div>
        </div>
    )
}
