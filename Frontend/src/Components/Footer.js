import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../CSS Files/Footer.css';
    
function Footer() {

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setShowButton(scrollTop > 100); // Adjust the scroll distance as needed
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (

        <footer className="footer">
            <div className="inner-container">
                <div className="column">
                    <h3>About Institute Library</h3>
                    <h5 style={{ fontWeight: 120 }}>This is the official instutute library webiste for issuing books to students and faculty of the IIT KGP instutute.</h5>
                </div>
                <div className="column1">
                    <h3>Contact Us</h3>
                    <div>    
                        <a mailto="203266.main@sasi.edu.in">
                            Email: 203266.main@sasi.edu.in
                        </a>
                    </div>
                    <a>
                        Phone: 9818645848
                    </a>
                </div>
                <div className="column2">
                    <h3>Quick Links</h3>
                    <div>
                        <Link to="https://www.iitkgp.ac.in/" className="quick-link">Official KGP website</Link>
                    </div>
                    <div>
                        <Link to="/" className="quick-link">Home</Link>
                    </div>
                    <div>
                        <Link to="/login" className="quick-link">Login</Link>
                    </div>
                    <div>
                        <Link to="/signup" className="quick-link">Sign up</Link>
                    </div>
                </div>


                <div className="column3">
                    <h3>Follow Us</h3>
                    <h4 style={{ fontWeight: 120 }}>Stay connected with us on social media for updates</h4>
                    <div className="social-icons">
                        <a href="https://www.instagram.com">
                            <FontAwesomeIcon icon={faInstagram} className="icon" />
                        </a>
                        <a href="https://www.facebook.com">
                            <FontAwesomeIcon icon={faFacebook} className="icon1" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <div className="copyright">
                    &copy; 2024 Your Company. All rights reserved.
                </div>
                {showButton && (
                    <button className="scroll-top-button" onClick={scrollToTop}>
                        <FontAwesomeIcon icon={faArrowUp} className="icon0" title="Scroll to the top" />
                    </button>
                )}
            </div>
        </footer>
    );
}

export default Footer;