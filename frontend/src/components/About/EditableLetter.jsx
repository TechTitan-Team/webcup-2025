import { useState } from "react";
import useHttps from "../../hooks/useHttps";
import sendData from "../../hooks/sendHTML";

export default function BrandTemplates() {
    const {sendHtml} = sendData()
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // SVG icons as React components
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

    const IconCrown = () => (
        <svg
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="M2 17l4-10 5 9 5-9 4 10H2z" />
        </svg>
    );

    const IconToggle = ({ open }) => (
        <svg
            className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${open ? "" : "rotate-180"
                }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
    );

    const [title, setTitle] = useState('Bonjour');
    const [content, setContent] = useState("Je crois tellement en nous. Depuis que je t'ai rencontré, tout me semble possible. Avant, j'avais le sensation que je devais me cantonner à ce que je savais, à ce que l'on m'avait appris. Et toi, tu m'as ouvert le champ des possibles, tu m'as redonné confiance en moi, en l'amour et en la vie. Tu as fait tomber toutes mes peurs, toutes mes barrières et ces croyances limitantes qui détruisaient ma vie. Alors merci, merci mon amour.");

    const createHTMLDocument = () => {
        return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lettre d'Amour</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background-color: #e8d3c5; /* Beige background color */
                font-family: Arial, sans-serif;
            }
    
            .letter-container {
                position: relative;
                width: 100%;
                max-width: 600px;
                padding: 40px;
            }
    
            .letter {
                position: relative;
                background-color: rgba(255, 255, 255, 0.3);
                padding: 30px;
                border-radius: 5px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
            }
    
            .tape {
                position: absolute;
                top: -10px;
                left: 40px;
                width: 120px;
                height: 30px;
                background-color: rgba(255, 255, 255, 0.8);
                transform: rotate(-2deg);
                z-index: 10;
            }
    
            .title {
                font-family: 'Times New Roman', Times, serif;
                font-style: italic;
                font-size: 28px;
                margin-bottom: 25px;
                color: #333;
            }
    
            .content {
                font-size: 16px;
                line-height: 1.6;
                color: #333;
                margin-bottom: 20px;
                text-align: center;
            }
    
            .heart {
                position: absolute;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
            }
    
            .heart:before, 
            .heart:after {
                content: "";
                position: absolute;
                width: 30px;
                height: 50px;
                border-radius: 50px 50px 0 0;
                background: #ff8a9e;
            }
    
            .heart:before {
                left: 10px;
                transform: rotate(-45deg);
                transform-origin: 0 100%;
            }
    
            .heart:after {
                left: 0;
                transform: rotate(45deg);
                transform-origin: 100% 100%;
            }
    
            /* Scribbled heart effect */
            .scribble-heart {
                position: absolute;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M30,35 C10,20 15,85 50,65 C85,85 90,20 70,35 C60,15 40,15 30,35" stroke="%23ff8a9e" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>');
                background-size: contain;
                background-repeat: no-repeat;
                opacity: 0.8;
            }
    
            @media (max-width: 600px) {
                .letter-container {
                    padding: 20px;
                }
                
                .letter {
                    padding: 20px;
                }
                
                .title {
                    font-size: 24px;
                }
                
                .content {
                    font-size: 14px;
                }
            }
        </style>
    </head>
    <body>
        <div class="letter-container">
            <div class="tape"></div>
            <div class="letter">
                <h1 class="title">${title}</h1>
                
                <p class="content">
                ${content}
                </p>
                
                <div class="scribble-heart"></div>
            </div>
        </div>
    </body>
    </html>
    `;
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`flex flex-col bg-gray-100 border-r border-gray-300 transition-all duration-300 ease-in-out overflow-y-auto ${sidebarOpen ? "w-80" : "w-0"
                    }`}
            >
                <div className="p-4 space-y-6">
                    {/* Brand Templates Header */}
                    <div className="flex items-center space-x-2 text-gray-700 font-semibold text-sm">
                        <IconBrandTemplates />
                        <span>Titre</span>
                    </div>

                    {/* Info Box */}
                    <div className="bg-white border border-gray-200 rounded-md p-4 text-center text-gray-700 text-sm leading-relaxed">
                        <textarea value={title} onChange={(e) => setTitle(e.target.value)} id="story" name="story" rows="5" cols="30">

                        </textarea>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-900 font-semibold text-sm cursor-pointer">
                        <IconVisualIdentity />
                        <span>Contenu</span>
                    </div>

                    {/* Logos */}
                    <div className="bg-white border border-gray-200 rounded-md p-4 text-center text-gray-700 text-sm leading-relaxed">
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} id="story" name="story" rows="5" cols="30">

                        </textarea>
                    </div>
                    
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => console.log(createHTMLDocument())}
                className="absolute top-1/2 left-80 -ml-4 z-20 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition"
                aria-label="Toggle Sidebar"
            >
                <IconToggle open={sidebarOpen} />
            </button>

            {/* Main Content */}
            <main className="flex-grow p-6 bg-white flex justify-center items-center">
                <div className="relative w-full max-w-4xl h-[600px] border border-gray-300 rounded-md">
                    <iframe
                        title="Aperçu HTML"
                        srcDoc={createHTMLDocument()}
                        className="w-full h-full rounded-md"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />

                </div>
                <button
                    onClick={async() => {
                        await sendHtml("test", createHTMLDocument())
                        // Action d'envoi ici, par exemple console.log
                        console.log(createHTMLDocument());
                    }}
                    className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                >
                    Envoyer
                </button>
            </main>
        </div>
    );
}