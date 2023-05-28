import React from 'react';

export default function About() {
  return (
    <div>
      <div className="banner-item-02">
        <div className="text-content">
          <h2>About Dazzling Delights</h2>
        </div>
      </div>
      <div className="about-us-container">
        <p className="about-us-description">
          Dazzling Delights is your ultimate destination for exquisite jewelry that sparkles with elegance and luxury.
        </p>
        <div className="about-us-features">
          <div className="feature quality">
            <h4>Premium Quality</h4>
            <p>Each piece of jewelry in our collection is crafted using the highest quality materials, ensuring durability and timeless beauty.</p>
          </div>
          <div className="feature craftsmanship">
            <h4>Exquisite Craftsmanship</h4>
            <p>Our jewelry is created by skilled artisans who pay meticulous attention to detail, resulting in stunning designs that captivate and inspire.</p>
          </div>
          <div className="feature shipping">
            <h4>Worldwide Shipping</h4>
            <p>We offer fast and reliable shipping options, so you can enjoy your dazzling new piece of jewelry no matter where you are in the world.</p>
          </div>
        </div>
        <p className="about-us-call-to-action">
          At Dazzling Delights, we are dedicated to providing you with an exceptional shopping experience. Explore our collection and find the perfect piece that will make you shine bright like a diamond!
        </p>
      </div>
    </div>
  );
}
