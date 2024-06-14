import React,{useState,useEffect} from 'react';
import '../index.scss'; // Add your CSS file for styling
import '../fonts/font.css';
import log from '../assets/log.png'; // Replace with your Boina Coin logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faTwitter, faDiscord, faMedium, faAmazon } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import openchatLogo from '../assets/openchat-removebg-preview.png'

import Countdown from '../components/CountDown';

const RoadMapSection = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
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
      <section id="roadmap" className=" py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-black-700 mb-4 text-decoration-underline">BoinaCoin Journey Ahead</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Vision */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white mb-2">
              🌟
            </div>
            <p className="font-semibold">Vision</p>
            <p className="text-black-600">
              Unite food lovers worldwide with BoinaCoin—a joyful and tasty community celebrating good food!
            </p>
          </div>
          {/* Launchpad */}
         
          <div className="flex flex-col items-center">
  <div className="bg-green-200 rounded-full w-12 h-12 flex items-center justify-center text-white mb-2 animate-bounce">
  🎉
  </div>
  <p className="font-semibold">Launchpad</p>
  <p className="text-black-400">
 prepare for takeoff. The countdown begins! 🕒
  </p>

  <Countdown  />
</div>
          {/* Exploration */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center text-gray-800 mb-2">
              🔍
            </div>
            <p className="font-semibold">Exploration</p>
            <p className="text-black-600">
              Dive deep into market research, user needs, and competitor analysis. Explore flavors and crypto gaps.
            </p>
          </div>
          
        {/* Seedling */}
<div className="flex flex-col items-center">
  <div className="bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center text-white mb-2 animate-pulse">
    🌱
  </div>
  <p className="font-semibold">Seedling</p>
  <p className="text-black-600">
    Develop core features, gather feedback. Watch as our project sprouts and grows, just like a tiny seedling reaching for the sun.
  </p>
</div>

          {/* Expansion */}
          <div className="flex flex-col items-center">
            <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center text-white mb-2">
              🌐
            </div>
            <p className="font-semibold">Expansion</p>
            <p className="text-black-600">
              Roots spread globally! Beta versions launch, foodies from different continents join the feast.
            </p>
          </div>
          {/* Refinement */}
          <div className="flex flex-col items-center">
            <div className="bg-pink-500 rounded-full w-12 h-12 flex items-center justify-center text-white mb-2">
              🔧
            </div>
            <p className="font-semibold">Refinement</p>
            <p className="text-gray-600">
              Fine-tune the recipe. Squash bugs, season user experience. BoinaCoin becomes a delectable delight.
            </p>
          </div>
          {/* Milestones */}
          <div className="flex flex-col items-center">
            <div className="bg-indigo-500 rounded-full w-12 h-12 flex items-center justify-center text-white mb-2">
              🎉
            </div>
            <p className="font-semibold">Milestones</p>
            <p className="text-black-600">
              Confetti rains down! Product launches, community celebrations, and partnerships spice up our journey.
            </p>
          </div>
          {/* Future */}
          <div className="flex flex-col items-center">
            <div className="bg-teal-500 rounded-full w-12 h-12 flex items-center justify-center text-white mb-2">
              🔮
            </div>
            <p className="font-semibold">Future</p>
            <p className="text-black-600">
              Peer into the crystal ball—partnerships, NFT collaborations, and global food festivals await BoinaCoin holders.
            </p>
          </div>
        </div>
      </div>
    </section>


<footer className="bg-gray-200 text-black py-4 mt-auto">
  <div className="container mx-auto flex justify-between items-center">
    {/* Logo or Brand Name */}
    <p className="text-sm  font-bold text-black-400">
      © 2024 BoinaCoin. All rights reserved.
    </p>

    {/* Contact Information */}
    <p className="text-sm text-black-400 font-bold">
      Contact us: <a href="mailto:info@boinacoin.com">info@boinacoin.com</a>
    </p>

    {/* Buy Button */}
    <button className="buy-button bg-purple-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full"
    onClick={handleBuyNow}>
      Buy Now
    </button>
  </div>
</footer>

    
    </div>
  );
};

export default RoadMapSection;
