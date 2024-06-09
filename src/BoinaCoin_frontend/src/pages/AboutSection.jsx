import '../index.scss'; // Add your CSS file for styling
import '../fonts/font.css'
import heroImage from '../assets/OIG1__1_-removebg-preview.png';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const canisterId = '7hnek-5iaaa-aaaam-acnta-cai';
const AboutSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [walletConnected, setWalletConnected] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);

 /*  const checkPlugWallet = async () => {
    const publicKey = window.ic.plug.requestConnect();

    console.log(publicKey) 
    
    if (publicKey == undefined) {
    setWalletPresent(false)
    } else {
    setWalletPresent(true)
    }
    }; */




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

 /*  const connectWallet = async () => {
    try {
      const connected = await window.ic.plug.requestConnect();
      setWalletConnected(connected);
      if (connected) {
        const principalId = await window.ic.plug.getPrincipal();
        setPrincipal(principalId.toText());
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }; */ 
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
    <div className="landing-page min-h-screen flex flex-col  bg-blue-100">
    {/* Header */}
    <Header toggleMenu={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />

 {/* Hero Section */}
 <section id="about" className="bg-blue-100 py-8">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/4">
            <img src={heroImage} alt="Food" className="mt-4 " />
          </div>
          <div className="md:w-1/2 md:ml-8">
            <h2 className="text-3xl font-bold mb-4">About BoinaCoin</h2>
            <p className="text-lg">
              🍕🚀 BoinaCoin is not just another crypto token—it's a flavor-packed adventure! 🍔🌮
              Inspired by food lovers like you, we've seasoned BoinaCoin with blockchain magic.
              Whether you crave pizza, sushi, or tacos, BoinaCoin welcomes everyone to the table!
            </p>
            <p className="text-lg mt-4">
              Ready to take a bite? <span className="font-bold text-orange-500">Buy BoinaCoin now!</span>
            </p>
            {/* Add a button or link for buying */}
            <button className="buy-button bg-purple-900 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleBuyNow}>
        Buy Now
      </button>
          </div>
        </div>
      </div>
    </section>

      {/* Footer */}
      <Footer handleBuyNow={handleBuyNow} />

    </div>
  );
};

export default AboutSection;
