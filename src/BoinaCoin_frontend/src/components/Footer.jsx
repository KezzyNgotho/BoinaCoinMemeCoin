import React from 'react';
import { Container, Row, Col ,Button} from 'react-bootstrap';

const Footer = ({ handleBuyNow }) => {
    return (
        <footer className='bg-gray-200 text-black py-4 mt-auto'>
            <Container>
                <Row className="align-items-center">
                    <Col md={4} className="text-center text-md-left mb-2 mb-md-0">
                        <p className="mb-0 text-sm">&copy; 2024 BoinaCoin. All rights reserved.</p>
                    </Col>
                    <Col md={4} className="text-center text-md-left mb-2 mb-md-0">
                        <p className="mb-0 text-sm">Contact us: <a href='https://x.com/BoinaCoin'>BoinaCoin on X</a></p>
                    </Col>
                    <Col md={4} className="text-center mb-2 mb-md-0">
                        <Button onClick={handleBuyNow} className="bg-purple-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full">
                            Buy Now
                        </Button>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;