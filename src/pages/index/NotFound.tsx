// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center">
      <h1 className="text-6xl font-bold text-green-600">404</h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
