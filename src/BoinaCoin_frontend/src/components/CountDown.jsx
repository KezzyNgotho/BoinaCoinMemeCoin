import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const launchDate = new Date('2024-06-05T00:00:00Z'); // Set your launch date and time here
  const now = new Date();
  const timeRemaining = launchDate - now;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <div className="rounded-full bg-purple-800 p-4 shadow-sm animate-pulse">
      <div className="text-l font-bold text-black-500">
        {days}d{hours}h 
        <br/>
        {minutes}m 
        
        {seconds}s
      </div>
    </div>
  );
};

export default Countdown;
