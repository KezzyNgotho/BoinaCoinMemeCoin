import React from 'react';
import {Button} from 'react-bootstrap';

const Footer = ({ handleBuyNow }) => {
    return (
        <footer className='bg-gray-200 text-black py-4 mt-auto'>
            <div className='container mx-auto d-flex hustify-content-between align-items-center'>
                <p className='text-sm text-black-400'>
                    &copy; 2024 BoinaCoin. All rights reserved.
                </p>
                <p className='text-sm text-black-400'>
                    Contact us: <a href='https://x.com/BoinaCoin'>BoinaCoin on X</a>
                </p>
                <Button onClick={handleBuyNow} className="bg-purple-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full">
                    Buy Now
                </Button>
            </div>
        </footer>
    );
};

export default Footer;