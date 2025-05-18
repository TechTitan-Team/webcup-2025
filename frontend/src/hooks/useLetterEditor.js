import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetOneTemplate from './useGetOneTemplate';
import sendData from './sendHTML';
import { BaseUrl } from './useHttps';

export default function useLetterEditor(templateId) {
  const navigate = useNavigate();
  const { sendHtml } = sendData();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("")
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

  const handleShare = async() => {
    await sendHtml("type", getHTML()).then((res)=>{
      console.log(res);
      setShareUrl(BaseUrl+res)
    setIsShareModalOpen(true);

    }).catch((err)=>{
      console.log(err);
    })
  };

  const handleFullScreen = () => {
    const htmlContent = getHTML();
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    } else {
      alert("Votre navigateur a bloqué l'ouverture d'une nouvelle fenêtre.");
    }
  };

  const handleNavigateBack = () => {
    if (hasChanges) {
      if (window.confirm("Modifications non enregistrées. Quitter ?")) {
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
    getHTML,
    isShareModalOpen,
    setIsShareModalOpen,
    shareUrl,
  };
}
