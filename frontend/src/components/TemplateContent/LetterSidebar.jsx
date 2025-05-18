import React from 'react';
import { IconBrandTemplates, IconVisualIdentity } from '../Icons/LetterIcons';

export default function LetterSidebar({
  sidebarOpen,
  template,
  title,
  setTitle,
  content,
  setContent,
  hasChanges,
  handleSave,
  handleReset
}) {
  if (!sidebarOpen) return null;

  return (
    <div className="p-4 space-y-6">
      <div className="border border-gray-200 rounded-md p-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          {template.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {template.description}
        </p>
        <div className="flex items-center">
          <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
            {template.author.charAt(0)}
          </div>
          <span className="ml-2 text-sm text-gray-700">
            par {template.author}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-gray-700 font-semibold text-sm">
        <IconBrandTemplates />
        <span>Titre</span>
      </div>

      <div className="border border-gray-200 rounded-md p-4 text-center text-gray-700 text-sm leading-relaxed">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="2"
        ></textarea>
      </div>

      <div className="flex items-center space-x-2 text-gray-900 font-semibold text-sm cursor-pointer">
        <IconVisualIdentity />
        <span>Contenu</span>
      </div>

      <div className="border border-gray-200 rounded-md p-4 text-center text-gray-700 text-sm leading-relaxed">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="10"
        ></textarea>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleReset}
          className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
        >
          Réinitialiser
        </button>
        <button
          onClick={handleSave}
          className={`flex-1 px-4 py-2 rounded-md transition ${
            hasChanges
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!hasChanges}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
} 