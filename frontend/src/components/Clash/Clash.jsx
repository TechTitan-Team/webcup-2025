import React, { useState } from 'react';

const ClashList = () => {
  const [clashes, setClashes] = useState([
    { id: 1, title: 'Clash #1 : Dev vs Designer' },
    { id: 2, title: 'Clash #2 : Dark Mode vs Light Mode' },
  ]);

  const addClash = () => {
    const newId = clashes.length + 1;
    setClashes([
      ...clashes,
      { id: newId, title: `Clash #${newId} : Nouveau Clash` },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Liste des Clashs</h1>
          <button onClick={addClash} className="flex items-center gap-2">
            + Ajouter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clashes.map((clash) => (
            <div
              key={clash.id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-700">{clash.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClashList;
