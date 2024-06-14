import React ,{useEffect,useState}from 'react';
import '../index.scss'; // Add your CSS file for styling
import '../fonts/font.css';
import heroImage from '../assets/boina-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HowToBuySection = () => {
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
    <div className="landing-page min-h-screen flex flex-col bg-blue-100">
    {/* Header */}
    <Header toggleMenu={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />

      {/* Hero Section */}
      <section id="buy" className="py-1">
        <div className="container mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/4">
              <img src={heroImage} alt="Food" className="mt-4" />
            </div>
            <div className="md:w-1/2 md:ml-8">
              <h2 className="text-3xl font-bold mb-4">How to Buy BoinaCoin</h2>
              <ul className="text-left mt-4">
                <li className="flex items-center mb-2">
                  <span className="mr-2">🌐</span>
                  Create a Wallet: Set up a reliable wallet (e.g., MetaMask).
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">💰</span>
                  Get ICP Tokens: Acquire ICP tokens through exchanges.
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">🔗</span>
                  Connect to a DEX: Link your wallet to an ICP-compatible exchange.
                </li>
              
          <li className="flex items-center mb-2">
            <span className="mr-2">🔍</span>
            Find the Boinacoin: Search for the specific ICP BNCoin.
          </li>
          <li className="flex items-center">
            <span className="mr-2">🔄</span>
            Swap ICP for Memecoin: Confirm the swap in the DEX.
          </li>
        </ul>
        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg" 
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

export default HowToBuySection;
