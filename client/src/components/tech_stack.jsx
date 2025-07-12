import React from 'react';
import './tech_stack.css';

const techNames = [
  'Python', 'Java', 'SQL', 'JavaScript',
  'TensorFlow', 'Pandas', 'PyTorch', 'Scikit-learn',
  'HTML5', 'CSS3', 'React', 'Node.js',
  'Git', 'Docker', 'AWS', 'Cloud'
];


const TechStackScroll = () => (
  <div className="tech-scroll-container scroll-animate">
    <div className="tech-scroll-track">
      {[...techNames, ...techNames].map((name, idx) => (
        <span className="tech-scroll-item" key={idx}>{name}</span>
      ))}
    </div>
  </div>
);

export default TechStackScroll;
