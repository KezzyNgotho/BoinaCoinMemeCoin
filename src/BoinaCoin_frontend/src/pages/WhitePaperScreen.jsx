import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../fonts/font.css';
import log from '../assets/log.png'; // Replace with your Boina Coin logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';
import openchatLogo from '../assets/openchat-removebg-preview.png';
import '../index.scss';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const whitepaperContent = [
  {
    title: 'Executive Summary ("Amuse-bouche")',
    text: 'BOINACOIN is a memecoin that brings the world of culinary delights to the blockchain. By leveraging the Internet Computer (ICP), BOINACOIN aims to create a global, food-loving community through the innovative use of blockchain technology. Our mission is to blend the universality of food with the excitement of crypto, making blockchain as universally loved as food.',
  },
  {
    title: 'Background ("Origin Story")',
    text: 'The Rise of Memecoins\nMemecoins have captured the imagination of the crypto community, driven by the success of early projects like Dogecoin and Shiba Inu. These coins started as jokes but quickly amassed dedicated followings, proving that humor and community can be powerful drivers in the world of cryptocurrency. Memecoins offer a way to engage a broader audience, attracting those who might not be interested in more traditional, finance-focused cryptocurrencies.\n\nThe Power of Food Culture Online\nSimultaneously, food culture has become a dominant force online. Platforms like Instagram and TikTok are filled with food-related content, from cooking tutorials to food reviews. Food bloggers, chefs, and influencers have created vibrant communities centered around their shared love of cuisine. Food, unlike finance, speaks to everyone, transcending age, culture, and background.\n\nCombining Memecoins and Food Culture\nIn a world full of complex financial jargon, BOINACOIN combines the playful nature of memecoins with the universal appeal of food. By doing so, we create a project that is both accessible and engaging. Food is a common denominator that everyone understands and enjoys. It evokes memories, emotions, and connections. By embedding this universal love of food into our cryptocurrency, we aim to create a community that is inclusive, vibrant, and passionate.'
  },
  {
    title: 'Why Combine Them?',
    text: 'Combining the excitement of memecoins with the universality of food culture, BOINACOIN aims to create a unique and engaging experience for all. Food is a universal language that transcends borders, making it the perfect vehicle to bring blockchain to the masses. In a world of finance jargon, food speaks to everyone, making blockchain technology more accessible and relatable.'
  },
  {
    title: 'Vision & Mission ("Our Recipe")',
    text: 'Vision: To make blockchain as universally loved as food.\nAt BOINACOIN, our vision is to create a blockchain ecosystem that is as beloved and essential as food. Just as food is a universal necessity that brings joy, comfort, and togetherness, we envision a blockchain platform that fosters inclusivity, community, and innovation. By integrating the playful and engaging aspects of food culture, we aim to make blockchain technology more approachable and enjoyable for everyone.\n\nMission: To blend culinary passion with crypto innovation, fostering a global, food-loving community.\nOur mission is to unite culinary enthusiasts and crypto innovators to build a vibrant, global community. BOINACOIN strives to harness the passion people have for food and channel it into the world of blockchain. We aim to:\nEducate: Provide accessible resources and tools to help people understand and engage with blockchain technology.\nInnovate: Develop unique, food-themed blockchain applications that offer practical and entertaining uses.\nUnite: Bring together a diverse community of food lovers and crypto enthusiasts, fostering collaboration and cultural exchange.'
  },
  {
    title: 'The BOINACOIN Concept ("Main Course")',
    text: 'BOINACOIN is more than just a coin; it\'s a global potluck on the blockchain. Our mascot, the shapeshifting Boina, embodies the spirit of culinary diversity and innovation, constantly evolving and adapting to different cuisines and cultures. BOINACOIN brings people together to celebrate food, culture, and technology in a way that\'s fun and accessible.\n\nA Global Potluck on the Blockchain\nImagine a potluck where everyone brings their favorite dish to share. BOINACOIN embodies this spirit by creating a platform where users can contribute their unique perspectives and ideas, enriching the community with diverse flavors. From recipe exchanges to virtual cooking classes, BOINACOIN offers numerous ways for users to connect and share their culinary passions.\n\nCelebrating Food, Culture, and Technology\nBOINACOIN is a celebration of the intersection between food, culture, and technology. By integrating these elements, we create a platform that is not only innovative but also deeply rooted in the shared human experience. Whether you\'re a seasoned crypto investor or a food lover new to blockchain, BOINACOIN offers something for everyone.'
  },
  {
    title: 'Why Internet Computer? ("Our Kitchen")',
    text: 'The Internet Computer (ICP) offers the perfect platform for BOINACOIN with its unmatched speed, global node network, and robust Web3 hosting capabilities.\n\nSpeed: As Fast as Stir-frying\nThe Internet Computer provides lightning-fast transaction speeds, ensuring that our users can enjoy a seamless and efficient experience. Just as stir-frying cooks food quickly while retaining its flavor and nutrients, ICP\'s speed allows us to deliver fast and reliable services without compromising on quality.\n\nGlobal Nodes: Each One, a Different Country\'s Kitchen\nICP\'s decentralized network of global nodes acts like a vast network of kitchens, each contributing to the overall robustness and security of the platform. This global distribution ensures that BOINACOIN remains resilient and accessible to users around the world, regardless of their location.\n\nWeb3 Hosting: Our Recipes Live On-Chain\nWith ICP\'s robust Web3 hosting capabilities, BOINACOIN\'s applications and content are securely hosted on-chain. This ensures that our recipes, and other digital assets are always accessible and protected. Just as treasured family recipes are passed down through generations, our blockchain-based solutions provide lasting value and security.\n\nICP\'s Innovative Features\nThe Internet Computer\'s cutting-edge technology enables BOINACOIN to operate efficiently, securely, and globally. From smart contracts to decentralized applications, ICP provides the tools we need to create a rich and dynamic ecosystem. This ensures that BOINACOIN can deliver a seamless and enjoyable experience for all users.'
  },
  {
    title: 'Tokenomics ("Ingredients List")',
    text: 'Total Supply: 500B BOINA\nBOINACOIN\'s total supply of 500 billion tokens ensures ample availability for a growing community while maintaining scarcity to drive value.\n\nDistribution:\n45% Public Sale ("Open Buffet")\nA significant portion of BOINACOIN will be available for public sale, ensuring wide accessibility and allowing a broad base of users to participate in our community.\n\n20% Community Rewards ("Loyalty Points")\nTo reward our dedicated community members, we allocate a substantial portion of tokens to community rewards. These rewards incentivize participation, engagement, and loyalty.\n\n10% Team ("Kitchen Staff")\nOur team of dedicated professionals will receive a portion of the tokens, aligning their interests with the project\'s success and ensuring their continued commitment to BOINACOIN\'s development.\n\n15% Marketing ("Food Critics\' Fund")\nEffective marketing is crucial for building awareness and attracting new users. Our marketing fund will be used to promote BOINACOIN through various channels, including social media, influencer partnerships, and events.\n\n10% Charity ("Community Kitchen")\nA portion of BOINACOIN is dedicated to charitable initiatives, reflecting our commitment to giving back to the community. These funds will support food-related charities and initiatives worldwide.\n\nSeasoning Fee: A Transaction Tax for Charity & Development\nEvery transaction incurs a small tax, which is allocated to charity and development initiatives. This "seasoning fee" ensures ongoing support for community projects and continuous improvement of the BOINACOIN ecosystem.'
  },
  {
    title: 'Features ("Menu Items")',
    text: 'Mise en Place: Staking for Boinacoin Tokens\nUsers can stake their BOINACOIN tokens to earn BOINACOIN tokens, providing a flavor of passive income. Just as mise en place is the preparation before cooking, staking sets the stage for future rewards and benefits.\n\nCookSwap: An ICP-Based Decentralized Exchange (DEX)\nCookSwap, our decentralized exchange built on the Internet Computer, allows users to trade BOINA and other tokens securely and efficiently. This DEX ensures that our community can access a wide range of trading options within the BOINACOIN ecosystem.\n\nFlash Kitchen: A Speed-Cooking Game\nOur speed-cooking game, Flash Kitchen, adds a playful and competitive element to the BOINACOIN ecosystem. Users can participate in cooking challenges, earning rewards and recognition within the community.'
  },
  {
    title: 'DAO & Governance ("Kitchen Council")',
    text: 'BOINACOIN\'s governance model involves the community in decision-making processes, from monthly cuisine spotlights to charity initiatives.\n\nStructure: From Sous Chefs to Head Chefs\nOur governance structure ensures that everyone has a role, from Sous Chefs (general members) to Head Chefs (core team). This inclusive approach fosters a sense of ownership and responsibility among all participants.\n\nVoting: Community-Driven Decisions\nThe community votes on key projects, charity picks, and more, ensuring that BOINACOIN remains a truly community-driven project. This democratic process empowers users to shape the future of BOINACOIN, reflecting their collective vision and values.'
  },
  {
    title: 'Roadmap ("Course Schedule")',
    text: 'Q3 2024: Menu Launch\nRelease of the BOINACOIN whitepaper, detailing our vision, mission, and plans.\n\nQ4 2024: Kitchen Open\nToken launch and initial distribution, making BOINACOIN available to the public.\n\nQ1 2025: First Course\nListing on decentralized exchanges (DEX), enabling broader access and liquidity.\n\nQ2 2025: Main Dish\nListing on major centralized exchanges, increasing visibility and accessibility.\n\nQ3 2025: Chef\'s Table\nHosting in-real-life (IRL) events to bring the community together and celebrate our achievements.\n\nQ4 2025: Michelin Star\nAchieving a market cap milestone of $100M, reflecting the growth and success of BOINACOIN.'
  },
  {
    title: 'Team ("Kitchen Staff")',
    text: 'Our team operates under fun, food-themed aliases, blending culinary creativity with technological expertise:\n\nHead Chef (Founder): Visionary leader and driving force behind BOINACOIN.\n\nSous Chef (CTO): Technical expert responsible for developing and maintaining the platform.\n\nMaître D\' (Community Lead): Ensures a vibrant and engaged community, fostering communication and collaboration.\n\nWhile we maintain anonymity, our real credentials in tech and culinary arts provide the expertise needed to drive BOINACOIN forward.'
  },
  {
    title: 'Partnerships ("Guest Chefs")',
    text: 'We plan to partner with chefs, food apps, and festivals, ranging from street vendors to Michelin-starred establishments, to create a rich and diverse ecosystem. These partnerships will enhance our platform, offering unique opportunities and experiences for our community.'
  },
  {
    title: 'Risks ("Allergen Notice")',
    text: 'Investing in BOINACOIN involves risks, including:\n\nMarket Volatility: Crypto markets can be highly volatile, and prices may fluctuate significantly.\n\nRegulatory Challenges: Changes in regulations could impact our operations and the overall crypto landscape.\n\nHigh-Risk Memecoin: BOINACOIN is a high-risk investment; only invest "dough" you can afford to lose.'
  },
  {
    title: 'Community & Social Impact ("More Than Meals")',
    text: 'Platforms: Engage with Our Community\n\nTelegram ("Dinner Table"): Join discussions, share ideas, and participate in events.\n\nTwitter ("Fast Food"): Stay updated with the latest news and announcements.\n\nOpenChat: A decentralized discussions forum for the whole community.\n\nWebsite: Share your food experience and keep important timelines.\n\nCharity Work: 100,000 Meals and Counting\nOur goal is to provide 100,000 meals to those in need, reflecting our commitment to social impact and community support.\n\nCarbon Offsets: Cleaning Our Kitchen\nWe are committed to offsetting our carbon footprint, ensuring that our kitchen is clean and sustainable. This initiative reflects our dedication to environmental responsibility.'
  },
  {
    title: 'Why BOINACOIN? ("Dessert")',
    text: 'BOINACOIN offers a unique blend of food, technology, and community. In a world of bland finance, we\'re adding spice. Join our global feast and be part of a deliciously innovative project that brings people together through the universal love of food. BOINACOIN is more than a cryptocurrency; it\'s a celebration of culinary culture and blockchain innovation.'
  },
  {
    title: 'Appendices ("Side Dishes")',
    text: 'Technical Details: ICP Integration\nComprehensive information on how BOINACOIN integrates with the Internet Computer, leveraging its features to deliver a seamless user experience.\n\nTeam Backgrounds: Culinary and Tech Expertise\nInsights into our team\'s backgrounds, highlighting their expertise in both culinary arts and technology, ensures that BOINACOIN is built on a foundation of knowledge and passion.\n\nFood Culture Research: Trends and Insights\nIn-depth research into food culture trends and insights, providing context and inspiration for BOINACOIN\'s development and community initiatives.'
  }
];

const WhitepaperScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-200 rounded-lg shadow-md flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src={log} alt="Boina Coin" className="w-14 h-14 rounded-full border-2 border-white" />
          <div className="ml-4 font-cursive text-black font-bold">BOINACOIN</div>
        </div>
        <div className="lg:hidden" onClick={toggleMenu}>
          <div className="w-6 h-1 bg-black mb-1 rounded"></div>
          <div className="w-6 h-1 bg-black mb-1 rounded"></div>
          <div className="w-6 h-1 bg-black rounded"></div>
        </div>
        <nav className={`lg:flex ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <li>
              <a href="/" className="text-black hover:text-blue-800 font-bold">HOME</a>
            </li>
            <li>
              <a href="about" className="text-black hover:text-blue-800 font-bold">ABOUT</a>
            </li>
            <li>
              <a href="buy" className="text-black hover:text-blue-600 font-bold">HOW TO BUY</a>
            </li>
            <li>
              <a href="tokenomics" className="text-black hover:text-blue-600 font-bold">TOKENOMICS</a>
            </li>
            <li>
              <a href="roadmap" className="text-black hover:text-orange-600 font-bold">ROADMAP</a>
            </li>
            <li>
              <a href="Whitepaper" className="text-black hover:text-blue-600 font-bold">WHITEPAPER</a>
            </li>
          </ul>
        </nav>
        <div className="flex space-x-4">
          <a href="https://t.me/BoinaCoin" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600">
            <FontAwesomeIcon icon={faTelegram} size="lg" />
          </a>
          <a href="https://x.com/BoinaCoin" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-800">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://openchat.xyz/yourOpenChatLink" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center hover:bg-blue-500">
            <img src={openchatLogo} alt="OpenChat Logo" className="w-8 h-8" />
          </a>
          <a href="https://discord.com/invite/yourDiscordLink" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700">
            <FontAwesomeIcon icon={faDiscord} />
          </a>
        </div>
      </header>
      {/* Whitepaper Content */}
      <div className="whitepaper-container mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-md mt-6">
        <header className="text-center py-4 mb-6">
          <h1 className="text-4xl font-bold">BOINACOIN Whitepaper</h1>
        </header>
        {whitepaperContent.map((section, index) => (
          <motion.section
            key={index}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
            <p className="text-gray-700">{section.text}</p>
          </motion.section>
        ))}
        <footer className="text-center py-4 mt-6 border-t">
          <p className="text-sm text-gray-600">&copy; 2024 BOINACOIN. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default WhitepaperScreen;
