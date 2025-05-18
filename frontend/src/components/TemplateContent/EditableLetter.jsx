import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import useLetterEditor from "../../hooks/useLetterEditor";
import useSharedUsers from "../../hooks/useSharedUsers";
import LetterSidebar from "./LetterSidebar";
import LetterHeader from "./LetterHeader";
import LetterPreview from "./LetterPreview";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import NotFoundState from "./NotFoundState";

export default function EditableLetter() {
  const { templateId } = useParams();
  const { sharedUsers } = useSharedUsers();
  const {
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
    handleNavigateBack,
    getHTML,
    handleShare,
    handleFullScreen,
    isShareModalOpen,
    setIsShareModalOpen,
    shareUrl,
  } = useLetterEditor(templateId);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!template) return <NotFoundState />;

  return (
    <Layout>
      <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-pink to-pink-100 overflow-x-hidden">
        <div
          className={`flex flex-col border-r border-indigo-300 transition-all duration-300 ease-in-out overflow-y-auto ${sidebarOpen ? "w-80" : "w-0"
            }`}
        >
          <LetterSidebar
            sidebarOpen={sidebarOpen}
            template={template}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            hasChanges={hasChanges}
            handleSave={handleSave}
            handleReset={handleReset}
          />
        </div>

        <main className="flex-grow p-6 flex flex-col">
          <LetterHeader
            hasChanges={hasChanges}
            handleNavigateBack={handleNavigateBack}
            sharedUsers={sharedUsers}
            handleShare={handleShare}
            handleFullScreen={handleFullScreen}
            isShareModalOpen={isShareModalOpen}
            setIsShareModalOpen={setIsShareModalOpen}
            shareUrl={shareUrl}
          />


          <LetterPreview getHTML={getHTML} />
        </main>
      </div>
    </Layout>
  );
}
