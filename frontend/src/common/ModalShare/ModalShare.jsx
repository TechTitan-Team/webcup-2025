import React, { useState, useEffect } from "react";
import { FaFacebookF, FaWhatsapp, FaEnvelope, FaTimes, FaLink, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function ShareModal({ isOpen, onClose, shareUrl }) {
  const [copied, setCopied] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent("Regarde ce contenu intéressant");

  // Fonction pour copier le lien et afficher feedback
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Impossible de copier le texte: ', err);
      // Fallback pour les navigateurs qui ne supportent pas clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Fonction pour fermer le modal avec animation
  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(onClose, 300); // Attendre la fin de l'animation
  };

  // Arrêter la propagation des clics dans le modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // Partage sur les réseaux sociaux
  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FaFacebookF />,
      color: "bg-[#1877F2] hover:bg-[#0e5fc7]"
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <FaTwitter />,
      color: "bg-[#1DA1F2] hover:bg-[#0c85d0]"
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <FaWhatsapp />,
      color: "bg-[#25D366] hover:bg-[#1da84d]"
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <FaLinkedinIn />,
      color: "bg-[#0077B5] hover:bg-[#005e8f]"
    },
    {
      name: "Email",
      url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: <FaEnvelope />,
      color: "bg-gray-600 hover:bg-gray-700"
    }
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity duration-300"
      style={{ opacity: animateIn ? 1 : 0 }}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="share-modal-title"
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative transition-transform duration-300 transform ${animateIn ? 'scale-100' : 'scale-95'}`}
        onClick={handleModalClick}
      >
        <h2
          id="share-modal-title"
          className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 text-center"
        >
          Partager ce contenu
        </h2>

        <div className="mb-6">
          <div className="relative">
            <input
              id="share-link"
              type="text"
              value={shareUrl}
              readOnly
              onClick={(e) => e.target.select()}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 pr-12 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2"
              aria-label="Copier le lien"
              title="Copier le lien"
            >
              <FaLink className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={handleCopy}
            className={`mt-4 w-full rounded-lg py-3 px-4 font-medium text-white shadow-md transition duration-300 ease-in-out flex items-center justify-center ${
              copied ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
            aria-live="polite"
          >
            {copied ? "Lien copié !" : "Copier le lien"}
          </button>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-4 font-medium">
          Ou partager via
        </p>

        <div className="grid grid-cols-5 gap-3">
          {shareLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center ${link.color} text-white rounded-lg p-3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg`}
              aria-label={`Partager sur ${link.name}`}
              title={`Partager sur ${link.name}`}
              onClick={(e) => {
                // Pour éviter que certains navigateurs bloquent les popups
                const width = 600;
                const height = 400;
                const left = (window.innerWidth - width) / 2;
                const top = (window.innerHeight - height) / 2;
                
                // Ne pas ouvrir de popup pour les emails
                if (link.name !== "Email") {
                  e.preventDefault();
                  window.open(
                    link.url,
                    `share-${link.name}`,
                    `width=${width},height=${height},left=${left},top=${top},location=no,menubar=no,toolbar=no,status=no,scrollbars=yes,resizable=yes`
                  );
                }
              }}
            >
              <span className="text-xl mb-1">{link.icon}</span>
              <span className="text-xs">{link.name}</span>
            </a>
          ))}
        </div>

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none bg-gray-100 dark:bg-gray-700 p-2 rounded-full transition-colors duration-200"
          aria-label="Fermer la fenêtre de partage"
          title="Fermer"
        >
          <FaTimes className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}