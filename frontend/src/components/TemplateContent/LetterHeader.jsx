import React from 'react';
import { IconBack, IconWarning, IconShare, IconFullScreen } from '../Icons/LetterIcons';

export default function LetterHeader({
  hasChanges, 
  handleNavigateBack, 
  sharedUsers, 
  handleShare, 
  handleFullScreen
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={handleNavigateBack}
          className="flex items-center text-gray-700 hover:text-blue-600 transition mr-4"
        >
          <IconBack />
          Retour aux modèles
        </button>

        {/* Avatar Group */}
        <div className="flex -space-x-2 ml-4">
          {sharedUsers.map((user) => (
            <div
              key={user.id}
              className={`w-8 h-8 ${user.color} rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-white`}
              title={user.name}
            >
              {user.initial}
            </div>
          ))}
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs ring-2 ring-white">
            +2
          </div>
        </div>
      </div>

      <div className="flex items-center">
        {hasChanges && (
          <span className="text-amber-600 text-sm flex items-center mr-4">
            <IconWarning />
            Modifications non enregistrées
          </span>
        )}

        <button
          onClick={handleShare}
          className="flex items-center text-gray-700 hover:text-blue-600 transition bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md mr-2"
          title="Partager"
        >
          <IconShare />
          <span className="ml-2">Partager</span>
        </button>

        <button
          onClick={handleFullScreen}
          className="flex items-center text-gray-700 hover:text-blue-600 transition bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md"
          title="Plein écran"
        >
          <IconFullScreen />
          <span className="ml-2">Plein écran</span>
        </button>
      </div>
    </div>
  );
} 