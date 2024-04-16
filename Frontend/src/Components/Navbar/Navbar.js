// import {Link,useHistory} from 'react-router-dom';
// import Reac,{useState,useEffect} from 'react';
// import { useDispatch,useSelector } from 'react-redux';
// import { useAlert } from 'react-alert';
// import { Logout } from '../../Action/UserActions';
// import { Dropdown } from '@mui/base/Dropdown';
// import { Menu } from '@mui/base/Menu';
// import MenuIcon  from '@mui/icons-material/Menu';
// // import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
// import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
// import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
// import { styled } from '@mui/system';
// import { Fragment } from 'react';
// import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';




// const Navbar =() => {

//     const alert = useAlert()
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const location = useLocation();
//     const [currentPath, setCurrentPath] = useState(location.pathname);
//     const {user,loading,isAuthenticated} = useSelector(state=>state.user);

//     const [isSearchOpen, setIsSearchOpen] = useState(false);


//     useEffect(() => {
//         setCurrentPath(location.pathname);
//     },[location.pathname])

//     const handleLogOut = async (e) => {
//         e.preventDefault();
//         try{
//             await dispatch(Logout());
//             history.push('/Books');
//             alert.success('Logged Out Successfully');
//         }
//         catch {
//             alert.error('Something went wrong');
//         }
//     }
//     return ( 
//         <nav className="navbar">
//             <div><Link to="/">
//                 <h1> Library </h1>
//                 <h4>Indian Institute of Technology</h4>
//             </Link></div>
//             <div className="links"> 
//                 {isAuthenticated? (user.Type==='Admin'? (<Dropdown>
//                     <MenuButton><MenuIcon/></MenuButton>
//                     <Menu slots={{ listbox: Listbox }}>
//                         <MenuItem onClick={() => history.push("/admin/overdue")}>Over Due</MenuItem>
//                         <MenuItem onClick={() => history.push("/admin/Books")}>All Book</MenuItem>
//                         <MenuItem onClick={() => history.push("/admin/Books/New")}>Add Book</MenuItem>
//                         <MenuItem onClick={() => history.push("/admin/returnbooks")}>Return Books</MenuItem>
//                         <MenuItem onClick={() => history.push("/admin/AllUsers")}>All Users</MenuItem>
//                         <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
//                     </Menu>
//                 </Dropdown>):
//                 (<Dropdown>
//                     <MenuButton><MenuIcon/></MenuButton>
//                     <Menu slots={{ listbox: Listbox }}>
//                         <MenuItem onClick={() => history.push("/Books")}>All Books</MenuItem>
//                         <MenuItem onClick={() => history.push("/me")}>Profile</MenuItem>
//                         <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
//                     </Menu>
//                 </Dropdown>)):
//                 (<Fragment>
//                     <div><Link to="/Books">All Books</Link></div>
//                     <div><Link to="/LogIn">Log In</Link></div>
//                     <div><Link to="/Signup">Sign Up</Link></div>
//                   </Fragment>
//                        )   
//             }
//             </div>
//         </nav>
//      );
     
// }

// const blue = {
//     50: '#F0F7FF',
//     100: '#C2E0FF',
//     200: '#99CCF3',
//     300: '#66B2FF',
//     400: '#3399FF',
//     500: '#007FFF',
//     600: '#0072E6',
//     700: '#0059B3',
//     800: '#004C99',
//     900: '#003A75',
//   };
  
//   const grey = {
//     50: '#F3F6F9',
//     100: '#E5EAF2',
//     200: '#DAE2ED',
//     300: '#C7D0DD',
//     400: '#B0B8C4',
//     500: '#9DA8B7',
//     600: '#6B7A90',
//     700: '#434D5B',
//     800: '#303740',
//     900: '#1C2025',
//   };

// const Listbox = styled('ul')(
//     ({ theme }) => `
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-size: 0.875rem;
//     box-sizing: border-box;
//     padding: 6px;
//     margin: 12px 0;
//     min-width: 200px;
//     border-radius: 12px;
//     overflow: auto;
//     outline: 0px;
//     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//     box-shadow: 0px 4px 6px ${
//       theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
//     };
//     z-index: 1;
//     `,
//   );
  
//   const MenuItem = styled(BaseMenuItem)(
//     ({ theme }) => `
//     list-style: none;
//     padding: 8px;
//     border-radius: 8px;
//     cursor: default;
//     user-select: none;
  
//     &:last-of-type {
//       border-bottom: none;
//     }
  
//     &:focus {
//       outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
//       background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
//       color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//     }
  
//     &.${menuItemClasses.disabled} {
//       color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
//     }
//     `,
//   );
  
//   const MenuButton = styled(BaseMenuButton)(
//     ({ theme }) => `
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-weight: 600;
//     font-size: 0.875rem;
//     line-height: 1.5;
//     padding: 8px 16px;
//     border-radius: 8px;
//     color: white;
//     transition: all 150ms ease;
//     cursor: pointer;
//     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//     border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//     color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
//     box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
//     &:hover {
//       background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
//       border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
//     }
  
//     &:active {
//       background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
//     }
  
//     &:focus-visible {
//       box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
//       outline: none;
//     }
//     `,
//   );
 
// export default Navbar;


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

// import profileImage from '../../pages/Profile/profile.jpg';

// import { set } from 'immer/dist/internal';

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
