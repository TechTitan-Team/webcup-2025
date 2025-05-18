import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sendData from "../../hooks/sendHTML";
import useAIGeneration from "../../hooks/useAIGeneration";
import { motion } from "framer-motion";
import LetterSidebar from "../TemplateContent/LetterSidebar";
import LetterHeader from "../TemplateContent/LetterHeader";
import LetterPreview from "../TemplateContent/LetterPreview";
import Header from "../Layout/Header/Header";

export default function ContentGenerator() {
  const navigate = useNavigate();
  const { sendHtml } = sendData();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tone, setTone] = useState("");
  const [description, setDescription] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const {
    generatedHtml,
    title,
    content,
    loading,
    isModif,
    generateContentByAI,
    handleModifyTitle,
    handleModifyContent,
  } = useAIGeneration();

  const sendTheHtml = () => {
    sendHtml("type", generatedHtml);
  };

  const handleNavigateBack = () => {
    navigate("/dashboard");
  };

  const handleFullScreen = () => {
    const element = document.documentElement;

    if (!isFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(
        document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange
      );
    };
  }, []);

  const toneOptions = [
    {
      id: "dramatic",
      name: "Dramatique",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    },
    {
      id: "ironic",
      name: "Ironique",
      icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      id: "ultra_cringe",
      name: "Ultra Cringe",
      icon: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      id: "cringe",
      name: "Cringe",
      icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      id: "classy",
      name: "Élégant",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      id: "touching",
      name: "Émouvant",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
    {
      id: "absurd",
      name: "Absurde",
      icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      id: "passive_aggressive",
      name: "Passif-agressif",
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    },
    {
      id: "honest",
      name: "Honnête",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  const LoadingSkeleton = () => (
    <div className="w-full max-w-4xl">
      <div className="relative p-8 border border-gray-200 rounded-lg bg-white">
        <div className="animate-pulse space-y-8">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-200 mr-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent shimmer"></div>
            </div>
            <div className="h-6 bg-blue-200 rounded w-3/4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent shimmer"></div>
            </div>
          </div>

          <div className="magic-stars">
            <span className="star">✨</span>
            <span className="star delay-1">✨</span>
            <span className="star delay-2">✨</span>
            <span className="star delay-3">✨</span>
          </div>

          <div className="space-y-4">
            <div className="h-4 bg-blue-200 rounded w-5/6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent shimmer"></div>
            </div>
            <div className="h-4 bg-blue-200 rounded w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent shimmer"></div>
            </div>
            <div className="h-4 bg-blue-200 rounded w-4/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent shimmer"></div>
            </div>
          </div>

          <div className="magic-wand">
            <span className="wand">🪄</span>
            <div className="magic-trail"></div>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-lg font-semibold text-indigo-600">
            Création en cours avec l'IA...
          </p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-grow justify-center items-center w-full">
          <LoadingSkeleton />
        </div>
      );
    }

    if (isModif) {
      return (
        <div className="flex h-screen bg-gradient-to-br from-indigo-200 via-pink to-pink-200 w-screen overflow-x-hidden">
          <div
            className={`flex flex-col border-r border-indigo-300 transition-all duration-300 ease-in-out overflow-y-auto ${
              sidebarOpen ? "w-80" : "w-0"
            }`}
          >
            <LetterSidebar
              sidebarOpen={sidebarOpen}
              template={{
                id: "temp-" + Date.now(),
                title: title || "",
                content: content || "",
                type: "letter",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                owner: "current-user",
                author: "Utilisateur",
                description: "Contenu généré par IA",
              }}
              title={title || ""}
              setTitle={handleModifyTitle}
              content={content || ""}
              setContent={handleModifyContent}
              hasChanges={true}
              handleSave={sendTheHtml}
              handleReset={() => {}}
            />
          </div>

          <main className="flex-grow p-6 flex flex-col">
            <LetterHeader
              hasChanges={true}
              handleNavigateBack={handleNavigateBack}
              sharedUsers={[]}
              handleShare={() => {}}
              handleFullScreen={handleFullScreen}
            />

            <LetterPreview getHTML={() => generatedHtml} />
          </main>
        </div>
      );
    }

    return (
      <main className="flex-grow p-6 flex flex-col justify-center items-center relative">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Générer
            </motion.h1>
          </div>

          <motion.div
            className="max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
              initial={{ boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
              whileHover={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
              animate={{
                boxShadow: description
                  ? "0 0 15px rgba(59, 130, 246, 0.7), 0 0 30px rgba(147, 51, 234, 0.3)"
                  : "0 0 0 rgba(0, 0, 0, 0)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white rounded-2xl overflow-hidden flex items-start p-3"
                animate={{
                  height: description ? "120px" : "100px",
                }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-6 h-6 text-blue-500 ml-2 mr-3 mt-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <textarea
                  placeholder="Décrivez ce que vous voulez générer..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full py-2 px-2 outline-none text-gray-700 bg-transparent resize-none"
                  rows="3"
                ></textarea>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {toneOptions.map((toneOption) => (
              <div
                key={toneOption.id}
                onClick={() => setTone(toneOption.id)}
                className="relative cursor-pointer transition-all"
              >
                <div
                  className={`relative p-[1px] rounded-lg overflow-hidden ${
                    tone === toneOption.id
                      ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-lg"
                      : "bg-gray-200 hover:bg-gradient-to-r hover:from-cyan-400/70 hover:via-blue-500/70 hover:to-purple-600/70"
                  }`}
                >
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center justify-center mb-2">
                      <svg
                        className={`w-5 h-5 ${
                          tone === toneOption.id
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={toneOption.icon}
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p
                        className={`font-medium ${
                          tone === toneOption.id
                            ? "text-gray-800"
                            : "text-gray-700"
                        }`}
                      >
                        {toneOption.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => generateContentByAI(description, tone)}
              disabled={loading || !description.trim() || !tone}
              className={`px-8 py-3 rounded-md text-white font-semibold transition ${
                loading || !description.trim() || !tone
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-90"
              }`}
            >
              Générer avec l'IA
            </button>
          </div>
        </motion.div>
      </main>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-200 via-pink to-pink-200">
      <div className="fixed w-full top-0 z-10">
        <Header />
      </div>
      {renderContent()}
    </div>
  );
}
