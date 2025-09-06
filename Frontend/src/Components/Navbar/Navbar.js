import './Navbar.css'

import { Logout } from '../../Action/UserActions';

import { Link, useLocation,useHistory } from 'react-router-dom';
import React, { useState,useEffect} from 'react';
import {useAlert} from 'react-alert';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux'
import Searchbar from '../Searchbar/Searchbar';
import { clearErrors } from '../../Action/UserActions';

function Navbar() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const [isOpen, setIsOpen] = useState(false);
    const {user,loading,isAuthenticated} = useSelector(state=>state.user);
    useEffect(() => {
        setCurrentPath(location.pathname);
    },[location.pathname])

    const handleLogOut = async (e) => {
        e.preventDefault();
        try{
            dispatch(Logout());
            dispatch(clearErrors());
            alert.success('Logged Out Successfully');
            history.push('/Books');
        }
        catch {
            alert.error('Something went wrong');
        }
    }

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    const handleEnterKeyPress = (event) => {
        setIsSearchOpen(false);
    }

    useEffect(() => {
        const handleResult = (event) => {
            if (event.key === 'Enter' && isSearchOpen) {
                // handleEnterKeyPress();
            } else if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                setIsSearchOpen(true);
            }
        };
    
        document.addEventListener('keydown', handleResult);
    
        return () => {
            document.removeEventListener('keydown', handleResult);
        };
    }, [isSearchOpen]);

    return (
        <div className={`navbar ${isOpen ? 'open' : ''}`}>

            {isSearchOpen && <Searchbar 
                                defaultFocus={isSearchOpen} 
                                onClose={handleEnterKeyPress}
                            />}

            <div className={`TitleOfPlatforms ${isOpen ? 'open' : ''}`}>

                <div id='Before600px' className="TitleOfPlatform">
                    <div id="name1">Library</div>
                    <p id="name2">IIT Kharagpur</p>
                </div>

                <div id='After600px' className="TitleOfPlatform">
                    <div id="name1">Library</div>
                    <p id="name2">IIT KGP</p>
                </div>

            </div>



            <button id='hambutton' className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </button>



            {isAuthenticated === true ?
                (<div className={`Navigation ${isOpen ? 'open' : ''}`}>

                    <div className={`NavigatingOptions ${isOpen ? 'open' : ''}`}>
                        <div className={`MainPartNavBar ${isOpen ? 'open' : ''}`}>
                            {user.Type==='Admin' &&
                                <li onClick={() => {
                                    if (isOpen) {
                                        toggleMenu()
                                    }
                                }}>
                                    <Link to="/admin/Users/New">Admin</Link>
                                </li>
                            }
                            <li onClick={() => {
                                if (isOpen) {
                                        toggleMenu()
                                    }
                            }}>
                                <Link to="/">Home</Link>
                            </li>
                            <li onClick={() => {
                                if (isOpen) {
                                        toggleMenu()
                                    }
                            }}>
                                <Link to="/Books">Books</Link>
                            </li>
                            <li style={{cursor: "pointer", display: "grid", placeItems: "center"}} onClick={toggleSearch}>
                                <SearchIcon />
                            </li>
                        </div>
                        {currentPath === '/me' ?
                            (
                                <div className={`profile-buttons-navbar ${isOpen ? 'open' : ''}`}>
                                    <li onClick={() => {
                                        if (isOpen) {
                                        toggleMenu()
                                    }
                                    }}>
                                        <button className="profile-buttons-logout" onClick={handleLogOut}>
                                            Logout
                                        </button>

                                    </li>
                                    <li onClick={() => {
                                        if (isOpen) {
                                        toggleMenu()
                                    }
                                    }}>
                                    </li>
                                </div>
                            ) : (
                                <li>
                                    <Link to="/me" onClick={() => {
                                        if (isOpen) {
                                            toggleMenu()
                                        }
                                    }}>
                                        <div className="navbar-profile-picture">
                                            <AccountCircleIcon/>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }

                    </div>


                </div>) :
                (<div className={`Navigation ${isOpen ? 'open' : ''}`}>

                    <div className={`NavigatingOptions ${isOpen ? 'open' : ''}`}>
                        <div className={`MainPartNavBar ${isOpen ? 'open' : ''}`}>
                            <li onClick={() => {
                                if (isOpen) {
                                        toggleMenu()
                                    }
                            }}>
                                <Link to="/">Home</Link>
                            </li>
                            <li onClick={() => {
                                if (isOpen) {
                                        toggleMenu()
                                    }
                            }}>
                                <Link to="/Books">Books</Link>
                            </li>
                            {/* {currentPath !== '/' && */}
                                <li style={{cursor: "pointer", display: "grid", placeItems: "center"}} onClick={toggleSearch}>
                                    <SearchIcon />
                                </li>
                        </div>
                        <div className={`profile-buttons-navbar ${isOpen ? 'open' : ''}`}>
                            <li onClick={() => {
                                if (isOpen) {
                                        toggleMenu()
                                    }
                            }}>
                                <Link className='LoginNavBar' to='/Login'>Log in</Link>
                            </li>
                            <li onClick={() => {
                                if (isOpen) {
                                        toggleMenu()
                                    }
                            }}>
                                <Link className='SigupNavBar' to='/Signup'>Sign Up</Link>
                            </li>
                        </div>
                    </div>

                </div>)}


        </div>
    );
}

export default Navbar;
