import React, { useState,useEffect } from 'react';
import '../index.scss'; // Add your CSS file for styling
import '../fonts/font.css';
import log from '../assets/log.png'; // Replace with your Boina Coin logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faTwitter, faDiscord, faAmazon } from '@fortawesome/free-brands-svg-icons';
import heroImage from '../assets/boina-removebg-preview.png';
import openchatLogo from '../assets/openchat-removebg-preview.png'; // Replace with your OpenChat logo image
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
 
    const [menuOpen, setMenuOpen] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [principal, setPrincipal] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [transactionResult, setTransactionResult] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkWalletConnection = async () => {
        const isConnected = await window.ic?.plug?.isConnected();
        setWalletConnected(isConnected);
        if (isConnected) {
          const principalId = await window.ic.plug.getPrincipal();
          setPrincipal(principalId.toText());
        }
      };
      checkWalletConnection();
    }, []);
  
    const connectWallet = async () => {
      try {
        if (window.ic && window.ic.plug) {
          const connected = await identity.connect();
          if (connected) {
            setWalletConnected(true);
            const principalId = await identity.getPrincipal();
            setPrincipal(principalId.toString());
          } else {
            console.warn('User declined wallet connection');
          }
        } else {
          console.error('IC Plug not available');
          window.alert ('kindly install plug wallet')
        }
      } catch (error ) {
        window.alert ('kindly install plug wallet')
        console.error('Failed to connect wallet:', error);
      }
    };
  
    const handleBuyNow = async () => {
      if (!walletConnected) {
        await connectWallet();
      }
  
      if (principal) {
        try {
          const canisterId = "7hnek-5iaaa-aaaam-acnta-cai"; // Replace with your actual canister ID
          const result = await window.ic.plug.requestTransfer({
            to: canisterId,
            amount: 1000000, // Example amount in e8s (equivalent to 1 token)
          });
          console.log('Transaction successful:', result);
          setTransactionResult(result);
          setModalIsOpen(true);
        } catch (error) {
          console.error('Transaction failed:', error);
        }
      }
    };
  
   
   
  
  const closeModal = () => {
    setModalIsOpen(false);
    setTransactionResult(null);
  };

  return (
    <div className="landing-page min-h-screen flex flex-col bg-blue-100">
      {/* Header */}
      <header className="navbar px-4 py-2 bg-blue-200 rounded-lg shadow-md">
        <div className="header-logo rounded-full bg-orange-500 flex items-center justify-center">
          <img src={log} alt="Boina Coin" className="w-14 h-14 rounded-full border-2 border-white" />
        </div>
        {/* Hamburger Menu */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className="w-6 h-1 bg-black mb-1 rounded"></div>
          <div className="w-6 h-1 bg-black mb-1 rounded"></div>
          <div className="w-6 h-1 bg-black rounded"></div>
        </div>
        {/* Navigation */}
        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <li className="inline-block">
              <a href="/" className="font-cursive text-black hover:text-blue-800 font-bold">HOME</a>
            </li>
            <li className="inline-block">
              <a href="About" className="font-cursive text-black hover:text-blue-800 font-bold">ABOUT</a>
            </li>
            <li className="inline-block">
              <a href="Buy" className="font-cursive text-black hover:text-blue-600 font-bold">HOW TO BUY</a>
            </li>
            <li className="inline-block">
              <a href="Tokenomics" className="font-alte-schwabacher text-black hover:text-blue-600 font-bold">TOKENOMICS</a>
            </li>
            <li className="inline-block">
              <a href="Roadmap" className="font-calibrated text-black hover:text-orange-600 font-bold">ROADMAP</a>
            </li>
            <li className="inline-block">
              <a href="Whitepaper" className="font-calibrated text-black hover:text-blue-600 font-bold">WHITEPAPER</a>
            </li>
          </ul>
        </nav>
        {/* Social icons */}
        <div className="social-icons flex space-x-4">
          <a href="https://t.me/BoinaCoin" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600">
            <FontAwesomeIcon icon={faTelegram} size="lg" />
          </a>
          <a href="https://x.com/BoinaCoin" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-800">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://openchat.xyz/yourOpenChatLink" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-500">
            <img src={openchatLogo} alt="OpenChat Logo" className="w-8 h-8" />
          </a>
          
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center px-4 py-16 bg-blue-100">
        <div className="w-full lg:w-1/2 lg:pr-8 text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-4 text-blue-400 hero-text">
            Welcome to Boina Coin
          </h1>
          <p className="text-lg text-black font-bold">
            Discover the future of cryptocurrency. Join us on this exciting journey!
          </p>
          <p className="text-lg text-purple-800 font-bold">
            Let's unite all the foodies!
          </p>
          <p className="text-lg text-pink-400 font-bold">
            Join the hype and be part of the Boina Coin community.
          </p>
          <div className="flex justify-center lg:justify-start mt-8 space-x-4">
          <button onClick={() => window.open("https://t.me/BoinaCoin", "_blank")} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
  Community
</button>

            <button 
               onClick={handleBuyNow}
            className="buy-button bg-purple-900 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
              Buy Now
            </button>
          </div>
          <div className="flex items-center justify-center lg:justify-start mt-4">
            <span className="animate-bounce text-3xl">🚀</span>
          </div>
        </div>
        <div className="w-full lg:w-1/4 flex items-center justify-center bg-transparent hero-image">
          <img src={heroImage} alt="Boina Coin Hero" className="rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-black py-4 mt-auto">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm text-black-400">
            © 2024 BoinaCoin. All rights reserved.
          </p>
          <p className="text-sm text-black-400">
            Contact us: <a href="mailto:info@boinacoin.com">info@boinacoin.com</a>
          </p>
          <button
             onClick={handleBuyNow}
           className="buy-button bg-purple-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full">
            Buy Now
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
