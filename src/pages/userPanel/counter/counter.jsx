import React, { useState } from 'react';
import './counter.css';

function ScholarshipCard({ title, description, target }) {
  const [count, setCount] = useState(1);

  const animateCount = () => {
    let start = 1;
    let duration = 2000;
    let increment = (target - start) / (duration / 100);

    const counterInterval = setInterval(() => {
      setCount((prevCount) => {
        const newCount = Math.min(prevCount + increment, target);
        if (newCount >= target) clearInterval(counterInterval);
        return newCount;
      });
    }, 100);
  };

  return (
    <div
      className="card"
      onMouseEnter={animateCount}
      onMouseLeave={() => setCount(1)} // Reset when not hovered
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="counter">
        {Math.floor(count)}+
      </div>
    </div>
  );
}

function ScholarshipCounter() {
  return (
    <div className="counter-container">
      <ScholarshipCard
        title="Undergraduate Scholarships"
        description="Supporting students from underprivileged backgrounds."
        target={1000}
      />
      <ScholarshipCard
        title="Postgraduate Grants"
        description="Funding future researchers and change-makers."
        target={500}
      />
      <ScholarshipCard
        title="Merit-Based Awards"
        description="Recognizing academic excellence across disciplines."
        target={750}
      />
    </div>
  );
}

export default ScholarshipCounter;
