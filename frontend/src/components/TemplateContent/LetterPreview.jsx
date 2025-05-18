import React from 'react';

export default function LetterPreview({ getHTML }) {
  return (
    <div className="flex-grow flex justify-center items-center">
      <div className="relative w-full h-[800px] border rounded-md">
        <iframe
          title="Aperçu HTML"
          srcDoc={getHTML()}
          className="w-full h-full rounded-md"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
} 