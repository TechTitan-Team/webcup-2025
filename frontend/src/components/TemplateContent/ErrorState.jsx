import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorState({ error }) {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center max-w-md p-6 rounded-lg shadow-md">
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Erreur de chargement du modèle
        </h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Retour aux modèles
        </button>
      </div>
    </div>
  );
} 