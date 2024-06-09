import React, {useState} from 'react';
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import log from '../assets/log.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faXTwitter, faDiscord, faAmazon } from '@fortawesome/free-brands-svg-icons';
import openchatLogo from '../assets/openchat-removebg-preview.png';

const Header = ({ toggleMenu, menuOpen }) => {
    return (
        <Navbar bg='light' expand="lg" className="shadow-md rounded">
            <Navbar.Brand href="/">
                <img src={log} alt="BoinaCoin" className="w-14 h-14 rounded-full border-2 border-white" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={toggleMenu} />
            <Navbar.Collapse id="basic-navbar-nav" className={menuOpen ? 'show' : ''}>
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="About">About</Nav.Link>
                    <Nav.Link href="Buy">How To Buy</Nav.Link>
                    <Nav.Link href="Tokenomics">Tokenomics</Nav.Link>
                    <Nav.Link href="Roadmap">Roadmap</Nav.Link>
                    <Nav.Link href="Whitepaper">Whitepaper</Nav.Link>
                </Nav>
                <div className="d-none d-lg-flex ml-auto">
                    <a href="https://t.me/BoinaCoin" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full d-flex align-items-center justify-content-center hover:mx-1">
                        <FontAwesomeIcon icon={faTelegram} size="lg" />
                    </a>
                    <a href="https://x.com/BoinaCoin" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full d-flex align-items-center justify-content-center hover:mx-1">
                        <FontAwesomeIcon icon={faXTwitter} />
                    </a>
                    <a href="https://openchat.xyz/yourOpenChatLink" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full d-flex align-items-center justify-content-center hover:mx-1">
                        <img src={openchatLogo} alt="OpenChat Logo" className="w-8 h-8" />
                    </a>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;