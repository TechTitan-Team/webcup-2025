import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundState() {
  const navigate = useNavigate();
  
  return (
    <div className="p-8 text-center">
      <p>
        Modèle introuvable.{" "}
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline"
        >
          Retour à l'accueil
        </button>
      </p>
    </div>
  );
} 