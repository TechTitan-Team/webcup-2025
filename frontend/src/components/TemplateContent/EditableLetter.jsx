import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetOneTemplate from "../../hooks/useGetOneTemplate";
import sendData from "../../hooks/sendHTML";
import Layout from "../Layout/Layout";

export default function EditableLetter() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { sendHtml } = sendData();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Exemple de données d'utilisateurs qui ont partagé (à remplacer par vos données réelles)
  const sharedUsers = [
    {
      id: 1,
      name: "Thomas Dupont",
      initial: "T",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      name: "Marie Lambert",
      initial: "M",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      name: "Jean Martin",
      initial: "J",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const {
    template,
    loading,
    error,
    title,
    setTitle,
    content,
    setContent,
    hasChanges,
    saveChanges,
    resetToDefault,
    discardChanges,
    getHTML,
  } = useGetOneTemplate(templateId);

  const handleSave = () => {
    if (saveChanges()) {
      alert("Modèle mis à jour avec succès !");
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir rétablir les valeurs par défaut ? Toutes vos modifications seront perdues."
      )
    ) {
      resetToDefault();
    }
  };

  const handleShare = () => {
    // Implémentation de la fonctionnalité de partage
    alert("Fonctionnalité de partage à implémenter");
  };

  const handleFullScreen = () => {
    // Obtenir le contenu HTML
    const htmlContent = getHTML();

    // Ouvrir dans une nouvelle fenêtre
    const newWindow = window.open("", "_blank");

    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    } else {
      alert(
        "Votre navigateur a bloqué l'ouverture d'une nouvelle fenêtre. Veuillez autoriser les popups pour ce site."
      );
    }
  };

  const IconBrandTemplates = () => (
    <svg
      className="w-5 h-5 text-gray-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </svg>
  );

  const IconVisualIdentity = () => (
    <svg
      className="w-5 h-5 text-gray-900"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <line x1="4" y1="9" x2="20" y2="9"></line>
      <line x1="9" y1="20" x2="9" y2="9"></line>
    </svg>
  );

  const IconFullScreen = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5"
      ></path>
    </svg>
  );

  const IconShare = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Chargement du modèle...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md p-6  rounded-lg shadow-md">
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

  if (!template) {
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

  return (
    <Layout>
      <div className="flex h-screen bg-gradient-to-br from-pink via-indigo-100 to-pink-200 overflow-x-hidden">
        {/* Sidebar */}
        <div
          className={`flex flex-col  border-r border-indigo-300 transition-all duration-300 ease-in-out overflow-y-auto ${
            sidebarOpen ? "w-80" : "w-0"
          }`}
        >
          <div className="p-4 space-y-6">
            <div className=" border border-gray-200 rounded-md p-4 mb-6">
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

            <div className=" border border-gray-200 rounded-md p-4 text-center text-gray-700 text-sm leading-relaxed">
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              ></textarea>
            </div>

            {/* Content Field */}
            <div className="flex items-center space-x-2 text-gray-900 font-semibold text-sm cursor-pointer">
              <IconVisualIdentity />
              <span>Contenu</span>
            </div>

            <div className=" border border-gray-200 rounded-md p-4 text-center text-gray-700 text-sm leading-relaxed">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="10"
              ></textarea>
            </div>

            {/* Action Buttons */}
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
        </div>

        <main className="flex-grow p-6  flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => {
                  if (hasChanges) {
                    if (
                      window.confirm(
                        "Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir quitter ?"
                      )
                    ) {
                      navigate("/app");
                    }
                  } else {
                    navigate("/app");
                  }
                }}
                className="flex items-center text-gray-700 hover:text-blue-600 transition mr-4"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
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
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
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

          <div className="flex-grow flex justify-center items-center">
            <div className="relative w-full  h-[800px] border  rounded-md">
              <iframe
                title="Aperçu HTML"
                srcDoc={getHTML()}
                className="w-full h-full rounded-md"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
