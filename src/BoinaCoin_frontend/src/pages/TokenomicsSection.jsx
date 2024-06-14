import React,{useEffect,useState} from 'react';
import '../index.scss'; // Add your CSS file for styling
import '../fonts/font.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import TokenomicsChart from '../components/TokenomicsChart';
import { useNavigate } from 'react-router-dom';

const TokenomicsSection= () => {

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
 <section id="tokenomics" className=" bg-blue-100 py-8">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">BoinaCoin Tokenomics</h2>

    <p className="text-lg">
      BoinaCoin (BOINA) combines food-inspired joy with innovation. Here's what you need to know:
    </p>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg p-1 shadow-md">
        <h3 className="text-xl font-semibold mb-2">Initial Distribution</h3>
        <p className="text-purple-700">100B BOINA tokens during launch.</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-xl font-semibold mb-2">Community Rewards</h3>
        <p className="text-purple-700">Earn BOINA through staking and engagement.</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-xl font-semibold mb-2">Liquidity Pool</h3>
        <p className="text-purple-700">225B BOINA tokens on DEXs for trading.</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-xl font-semibold mb-2">Marketing and Partnerships</h3>
        <p className="text-purple-700">75B BOINA for campaigns.</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="text-xl font-semibold mb-2">Ecosystem Development</h3>
        <p className="text-purple-700">125B BOINA for growth.</p>
      </div>
    </div>
    {/* Include the actual tokenomics chart */}
    <div className="flex flex-row items-center justify-center mt-8">
      <div className="w-1/2">
        <TokenomicsChart />
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <Footer handleBuyNow={handleBuyNow} />

    
    </div>
  );
};

export default TokenomicsSection;
