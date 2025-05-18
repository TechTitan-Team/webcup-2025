import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetOneTemplate from './useGetOneTemplate';
import sendData from './sendHTML';

export default function useLetterEditor(templateId) {
  const navigate = useNavigate();
  const { sendHtml } = sendData();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
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

  const handleNavigateBack = () => {
    if (hasChanges) {
      if (
        window.confirm(
          "Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir quitter ?"
        )
      ) {
        navigate("/list-template");
      }
    } else {
      navigate("/list-template");
    }
  };

  return {
    sidebarOpen,
    setSidebarOpen,
    template,
    loading,
    error,
    title,
    setTitle,
    content,
    setContent,
    hasChanges,
    handleSave,
    handleReset,
    handleShare,
    handleFullScreen,
    handleNavigateBack,
    getHTML
  };
} 