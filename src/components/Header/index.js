import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";

import { homePageActions } from '../../store/slices/homePageSlice'

import styles from "./style.module.scss";

function Header({ avatarUrl }) {
    const dispatch = useDispatch();
    const { avatarImg, navbar } = styles;

    const userProfile = (
        <img
            src={avatarUrl}
            alt="User Profile"
            className={`rounded-circle mr-2 ${avatarImg}`}
        />
    );

    return (
        <>
            <nav className={`navbar bg-white ${navbar}`}>
                <div className="container-fluid">
                    <button
                        onClick={() => dispatch(homePageActions.setSearchUserSidebar(true))}
                        className="border-0 p-0 bg-transparent fw-bold d-flex align-items-center"
                    >
                        <FaSearch className="me-2" />
                        <span className="fs-5">Find Friends</span>
                    </button>

                    <Link className="text-decoration-none text-dark fs-4 fw-bold" to="/" >Chat Me Up</Link>

                    <NavDropdown title={userProfile} id="user-dropdown">
                        <NavDropdown.Item href="#action/1">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3">Logout</NavDropdown.Item>
                    </NavDropdown>
                </div>
            </nav>
        </>
    );
}

export default Header;