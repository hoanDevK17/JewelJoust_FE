import React from 'react';
import './TermsAndConditions.scss';
import HomePage from '../../component/home-default/home';

const TermsAndConditions = () => {
  return (
     <HomePage>
      <div className="terms-container">
      <h1>TERMS AND CONDITIONS OF THE JEWELRY AUCTION SITE</h1>
      
      <h2>Introduction</h2>
      <p>Welcome to our jewelry auction site. We provide a platform for users to buy and sell jewelry items through online auctions.</p>
      
      <h2>Terms of Participation</h2>
      <p><strong>Age and Legal Capacity:</strong> Participants must be 18 years or older and have full legal capacity to conduct transactions.</p>
      <p><strong>Registration Process:</strong> Users must create an account on our website and provide accurate and complete personal information. The account verification process may include identity and payment method checks.</p>
      
      <h2>Auction Process</h2>
      <p><strong>Bidding:</strong> Users can place bids online through our website interface. Each bid must be at least the minimum increment higher than the current bid.</p>
      <p><strong>Auction End:</strong> The auction will end at the designated time. The user with the highest bid at the end of the auction will be the winner.</p>
      <p><strong>Shipping:</strong> Upon receiving payment, we will ship the item to the buyer within 7-10 business days. Shipping costs will be added to the item value.</p>
      
      <h2>User Responsibilities</h2>
      <p><strong>Accurate Information:</strong> Users must provide accurate and timely information when registering and participating in auctions.</p>
      <p><strong>Account Security:</strong> Users must keep their account information secure and not share it with third parties. We are not responsible for any loss due to user account security breaches.</p>
      
      <h2>Our Responsibilities</h2>
      <p><strong>Transparency:</strong> We are committed to ensuring transparency and fairness in all auctions.</p>
      <p><strong>Dispute Resolution:</strong> We will assist in resolving disputes between buyers and sellers fairly and reasonably.</p>
      
      <h2>Other Terms</h2>
      <p><strong>Changes to Terms:</strong> We reserve the right to change these terms and conditions at any time without prior notice. Users are responsible for staying updated and complying with the new terms.</p>
      
      <p><strong>Governing Law:</strong> These terms and conditions are governed and interpreted in accordance with the current laws of Vietnam.</p>
    </div>
     </HomePage>
    
  );
};

export default TermsAndConditions;
