import React from 'react';
import './App.scss';
import HomePage from '../../component/home-default/home';

const testimonials = [
  {
    name: "Mr. Quang",
    image: "quang.jpg",
    feedback: "The jewelry auction experience was exceptional. The selection of rare and exquisite pieces was beyond my expectations. The auctioneer provided detailed insights into each item, making the process both informative and exciting. I felt well-guided throughout, and the transparent bidding process made it a truly enjoyable experience.",
  },
  {
    name: "Mr. Hoan",
    image: "hoan.jpg",
    feedback: "The auction surpassed all my expectations. The range of unique jewelry pieces was impressive, each with its own intriguing history. The staff was attentive and ensured that every aspect of the auction was seamless. Their dedication to providing a premium experience was evident, making the event memorable and rewarding.",
  },
  {
    name: "Mr. Truong",
    image: "truong.jpg",
    feedback: "Managing my schedule while participating in the auction was a challenge, but the flexibility offered made it possible. The auction was well-organized, and the ability to bid online kept me engaged even when I couldn't attend in person. The quality and authenticity of the pieces were outstanding, making the effort truly worthwhile.",
  },
  {
    name: "Mr. Phat",
    image: "phat.jpg",
    feedback: "The auction offered a remarkable opportunity to acquire stunning jewelry pieces. The thorough explanations provided for each item enhanced my understanding and appreciation of the pieces. The detailed descriptions and transparent process made it easy to place informed bids. I highly recommend this auction for its quality and professionalism.",
  },
  {
    name: "Mr. Sang",
    image: "sang.jpg",
    feedback: "The auction was an inspiring experience. The depth of knowledge and passion displayed by the staff was remarkable. The event provided not only beautiful jewelry but also valuable insights into the art and history behind each piece. It was a richly engaging experience that deepened my appreciation for fine jewelry.",
  },
];


const TestimonialCard = ({ name, image, feedback }) => (
  <div className="testimonial-card">
    <img src={image} alt={name} className="testimonial-image" />
    <h3>{name}</h3>
    <p>{feedback}</p>
  </div>
);

const App = () => (
  <HomePage>
    <div className="testimonial-container">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </div>
  </HomePage>
);

export default App;