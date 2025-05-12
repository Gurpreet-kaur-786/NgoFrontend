import React from 'react';
import './cardTransaction.css';

const CardTransaction = ({ name, email, payment,date }) => {
  return (
    
    <div className="card">
      <h2>{name}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Payment:</strong> Rs. {payment}</p>
      <p><strong>Date:</strong>  {date}</p>
    </div>
  );
};

export default CardTransaction
