import React, { useState,useEffect } from 'react';
import '../index.scss'; // Add your CSS file for styling
import '../fonts/font.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import heroImage from '../assets/boina-removebg-preview.png';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
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
   /*  checkPlugWallet(); */
  }, []);
  const connectWallet = async () => {
    try {
      if (window.ic && window.ic.plug) { // Check for library availability
        const connected = await identity.connect(); // Use useIdentity hook
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
        // Display error message to user (optional)
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
      <Header toggleMenu={() => setMenuOpen(!menuOpne)} menuOpen={menuOpen} />

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
      <Footer handleBuyNow={handleBuyNow} />

      {/* Modal */}
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {transactionResult ? (
            <div>
              <p>Transaction successful</p>
              <pre>{JSON.stringify(transactionResult, null, 2)}</pre>
            </div>
          ) : (
            <p>NO trasaction result available..</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LandingPage;
