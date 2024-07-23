import React from "react";
import "./TermsAndConditions.scss";
import HomePage from "../../component/home-default/home";

const TermsAndConditions = () => {
  return (
    <HomePage>
     <div className="terms-container">
      <h1>TERMS AND CONDITIONS OF THE JEWELRY MANAGEMENT AND AUCTION SITE</h1>
      
      <h2>Introduction</h2>
      <p>Welcome to our jewelry management and auction platform. We provide a system for managing jewelry sales and conducting online auctions. This document outlines the terms and conditions for using our platform.</p>
      
     

      <h2>Auction Rules</h2>
      
      <h3>1. Product Registration</h3>
      <p><strong>1.1</strong> Sellers must create an account and provide verification information before registering a product.</p>
      <p><strong>1.2</strong> Sellers must provide detailed information about the product, including:</p>
      <ul>
        <li>Product name</li>
        <li>Detailed description</li>
        <li>High-quality images of the product</li>
        <li>Legal documents of the product</li>
        <li>Starting price</li>
      </ul>
      
      <h3>2. Auction Management</h3>
      <p><strong>2.1</strong> Sellers can monitor their auction requests through the auction request history page.</p>
      
      <h3>3. Auction Conclusion</h3>
      <p><strong>3.1</strong> The auction ends when the auction time is over.</p>
      <p><strong>3.2</strong> The highest bidder will be notified and must make the payment within 48 hours.</p>
      
      <h3>4. Payment and Transaction Fees</h3>
      <p><strong>4.1</strong> Sellers must pay a 2% transaction fee.</p>
      <p><strong>4.2</strong> Sellers will receive the money after the system confirms the successful payment.</p>
      
      <h3>5. Additional Regulations</h3>
      <p><strong>5.1</strong> Users (sellers and bidders) must comply with the system's rules and terms.</p>
      <p><strong>5.2</strong> The system reserves the right to change the rules and fee schedule at any time and will notify users before they take effect.</p>

      <h2>Buyer Regulations</h2>
      
      <h3>1. Account Registration</h3>
      <p><strong>1.1</strong> Buyers must create an account and provide verification information before participating in an auction.</p>
      <p><strong>1.2</strong> Buyers must provide accurate and complete personal information during registration.</p>
      
      <h3>2. Bidding Process</h3>
      <p><strong>2.1</strong> Buyers can place bids on products through the auction interface.</p>
      <p><strong>2.2</strong> Each bid must be at least the minimum increment higher than the current bid.</p>
      <p><strong>2.3</strong> Buyers are responsible for ensuring their bids are placed correctly and cannot retract a bid once it is placed.</p>
      <p><strong>2.4</strong> With a bid that is 50% higher than the previous bid, automatically set the remaining time to 5 minutes from that bid.</p>
      
      <h3>3. Winning an Auction</h3>
      <p><strong>3.1</strong> The buyer with the highest bid at the end of the auction will be declared the winner.</p>
      
      <h3>4. Payment and Transaction Fees</h3>
      <p><strong>4.1</strong> Buyers must pay for the auction item using one of the accepted payment methods.</p>
      <p><strong>4.2</strong> When investing, you will receive a refund after the initial investment.</p>
      
      <h3>5. Additional Regulations</h3>
      <p><strong>5.1</strong> Buyers must comply with the system's rules and terms.</p>
      <p><strong>5.2</strong> The system reserves the right to change the rules and fee schedule at any time and will notify users before they take effect.</p>
      <p><strong>5.3</strong> Buyers are responsible for maintaining the security of their account information and are liable for any activity that occurs under their account.</p>
      
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
