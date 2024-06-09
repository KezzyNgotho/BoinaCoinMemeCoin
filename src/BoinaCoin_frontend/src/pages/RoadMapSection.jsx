import React,{useState,useEffect} from 'react';
import '../index.scss'; // Add your CSS file for styling
import '../fonts/font.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

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
    <Header toggleMenu={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />

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
  <p className="text-black-600">
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

      {/* Footer */}
      <Footer handleBuyNow={handleBuyNow} />

    </div>
  );
};

export default RoadMapSection;
