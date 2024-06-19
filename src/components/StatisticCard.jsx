// src/components/StatisticCard.js

import React from 'react';

// eslint-disable-next-line react/prop-types
const StatisticCard = ({ title, value }) => {
  return (
    <div
      className="rounded-lg shadow p-6"
      style={{
        background: 'linear-gradient(to right, #4f93c6, #1e5799)',
        color: 'white',
      }}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
};

export default StatisticCard;
