import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sendData from "../../hooks/sendHTML";
import Layout from "../Layout/Layout";
import useHttps from "../../hooks/useHttps";
import useToken from "../../hooks/useToken";

export default function EditableClash() {
    const { templateId } = useParams();
    const navigate = useNavigate();
    const {http} = useHttps()
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const {token} = useToken()
    // États pour remplacer useGetOneTemplate
    const [template, setTemplate] = useState(null);
    const [title, setTitle] = useState("Cher personne que vous clasher");
    const [content, setContent] = useState("Votre texte..");
    const [originalTitle, setOriginalTitle] = useState("");
    const [originalContent, setOriginalContent] = useState("");
    const [hasChanges, setHasChanges] = useState(false);
    const nav = useNavigate()

    // Template fournie comme variable dans le composant (exemple)
    const templateData = {
        id: templateId,
        title: "Cher personne que vous clasher",
        description: "Votre texte..",
        author: "Admin",
        htmlContent: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Clash Respectueux</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,700;1,400&family=Open+Sans&display=swap');
          body {
            background-color: #f5f5f7;
            font-family: 'Open Sans', sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #333;
          }
          .container {
            background: white;
            max-width: 600px;
            padding: 40px 50px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.1);
            text-align: center;
          }
          h1 {
            font-family: 'Merriweather', serif;
            font-weight: 400;
            font-size: 1.8rem;
            margin-bottom: 25px;
            color: #2c3e50;
            border-bottom: 2px solid #bdc3c7;
            padding-bottom: 12px;
            letter-spacing: 2px;
          }
          p {
            font-family: 'Open Sans', sans-serif;
            font-size: 1.125rem;
            line-height: 1.7;
            color: #555;
            font-weight: 400;
          }
        </style>
        </head>
        <body>
          <div class="container">
            <h1>{{title}}</h1>
            <p>
            {{content}}
            </p>
          </div>
        </body>
        </html>
    `
    };

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

    // Effet pour initialiser les données
    useEffect(() => {
        setLoading(true);

        // Simulation du chargement de la template
        setTimeout(() => {
            setTemplate(templateData);
            setTitle(templateData.title);
            setContent("Contenu de la lettre par défaut. Vous pouvez modifier ce texte selon vos besoins.");
            setOriginalTitle(templateData.title);
            setOriginalContent("Contenu de la lettre par défaut. Vous pouvez modifier ce texte selon vos besoins.");
            setLoading(false);
        }, 800);
    }, [templateId]);

    // Effet pour vérifier les changements
    useEffect(() => {
        if (title !== originalTitle || content !== originalContent) {
            setHasChanges(true);
        } else {
            setHasChanges(false);
        }
    }, [title, content, originalTitle, originalContent]);

    // Fonctions qui étaient dans useGetOneTemplate
    const saveChanges = async() => {
        const htmlContent = getHTML();
        // Logique pour sauvegarder les changements
        setOriginalTitle(title);
        setOriginalContent(content);
        setHasChanges(false);
        await http.post('/clash/addFile',{
            id: parseInt(templateId),
            content: htmlContent,
            id_user: token.id
        })
        return true;
    };

    const resetToDefault = () => {
        setTitle(originalTitle);
        setContent(originalContent);
        setHasChanges(false);
    };

    const discardChanges = () => {
        setTitle(originalTitle);
        setContent(originalContent);
        setHasChanges(false);
    };

    const getHTML = () => {
        if (!template) return "";

        // Remplacer les variables dans le template HTML
        let html = template.htmlContent;
        html = html.replace("{{title}}", title);
        html = html.replace("{{content}}", content);

        return html;
    };

    const handleSave = () => {
        if (saveChanges()) {
            nav(-1)
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
                    className={`flex flex-col border-r border-indigo-300 transition-all duration-300 ease-in-out overflow-y-auto ${sidebarOpen ? "w-80" : "w-0"
                        }`}
                >
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

                        {/* Content Field */}
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
                                className={`flex-1 px-4 py-2 rounded-md transition ${hasChanges
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

                <main className="flex-grow p-6 flex flex-col">
                    <div className="flex-grow flex justify-center items-center">
                        <div className="relative w-full h-full border rounded-md">
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