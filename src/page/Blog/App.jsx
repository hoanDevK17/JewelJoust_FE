import React from 'react';
import './App.scss';
import HomePage from '../../component/home-default/home';

const testimonials = [
  {
    name: "Mr. Quang",
    image: "quang.jpg",
    feedback: "The course provided a comprehensive understanding of the subject. The instructors were highly knowledgeable and always willing to go the extra mile to help us succeed.",
  },
  {
    name: "Mr. Hoan",
    image: "hoan.jpg",
    feedback: "This course surpassed all my expectations. The curriculum was thorough, and the instructors' dedication was evident in every lesson.",
  },
  {
    name: "Mr. Truong",
    image: "truong.jpg",
    feedback: "Balancing work and study was challenging, but this course made it possible with its flexible schedule and supportive instructors.",
  },
  {
    name: "Mr. Phat",
    image: "phat.jpg",
    feedback: "The detailed approach and clarity of explanations made even the complex topics easy to understand. Highly recommend this course!",
  },
  {
    name: "Mr. Sang",
    image: "sang.jpg",
    feedback: "The instructor's passion and deep knowledge truly inspired me. The course content was rich and thoroughly engaging.",
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