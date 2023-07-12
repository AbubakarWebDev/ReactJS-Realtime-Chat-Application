import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { NavDropdown } from 'react-bootstrap';

import { authActions } from '../../store/slices/authSlice';
import { homePageActions } from '../../store/slices/homePageSlice';

import styles from "./style.module.scss";
const { avatarImg, navbar } = styles;

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    function handleLogout() {
        dispatch(authActions.logout());
        navigate('/login', { replace: true });
    }

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

                    {user && (<NavDropdown 
                        as="div"
                        id="user-dropdown"
                        title={
                            <img
                                alt="User Profile"
                                className={`rounded-circle border mr-2 ${avatarImg}`}
                                src={`${process.env.REACT_APP_SERVER_BASE_URL}/${user?.avatar}`}
                            />
                        }
                    >
                        <Link to="/profile" className='text-decoration-none'> 
                            <NavDropdown.Item as="div">Profile</NavDropdown.Item> 
                        </Link>

                        <NavDropdown.Item as="button" onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>)}
                </div>
            </nav>
        </>
    );
}

export default Header;