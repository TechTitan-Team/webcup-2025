import { useState } from "react";
import sendData from "../../hooks/sendHTML";

export default function PageIA() {
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
    const { sendHtml } = sendData();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [tone, setTone] = useState("");
    const [description, setDescription] = useState("");
    const [generatedHtml, setGeneratedHtml] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModif, setIsModif] = useState(false);

    const callSwiftaskWithFetch = async (
        input,
        messageHistory = [],
        category_type
    ) => {
        try {
            const category = {
                dramatic: {
                    prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be visually stunning and elegant, with a dark, moody, and dramatic aesthetic. Use rich colors, smooth typography, and subtle animations or effects to enhance the emotional impact.
              
              The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
              
              "${input}"
              
              Make sure the design and style reflect the dramatic tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.
              
              `
                },
                ironic: {
                    prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be visually appealing, playful, and stylish, with bright or contrasting colors and fun typography. Use creative and quirky elements or animations to emphasize the ironic tone.
              
              The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
              
              "${input}"
              
              Make sure the design and style reflect the ironic tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.
              
              `
                },
                ultra_cringe: {
                    prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be colorful, exaggerated, and over-the-top with bold fonts, bright clashing colors, and cheesy animations or effects to amplify the ultra-cringe vibe.
              
              The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
              
              "${input}"
              
              Make sure the design and style reflect the ultra-cringe tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.
              
              `
                },
                cringe: {
                    prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be somewhat awkwardly charming with slightly cheesy fonts, pastel or muted colors, and subtle quirky animations or effects to give a cringe yet endearing feel.
              
              The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
              
              "${input}"
              
              Make sure the design and style reflect the cringe tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.
              
              `
                },
                classy: {
                    prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be elegant, sophisticated, and minimalist with refined typography, a neutral color palette (such as black, white, and gold or silver accents), and subtle animations or effects that convey grace and dignity.
              
              The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
              
              "${input}"
              
              Make sure the design and style reflect the classy tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.
              
              `
                },
                touching: {
                    prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be warm, heartfelt, and emotionally evocative with soft colors (such as pastel tones), gentle typography, and subtle animations or effects that enhance the sentimentality.
              
              The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
              
              "${input}"
              
              Make sure the design and style reflect the touching tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.
              
              `
                },
                absurd: {
                    prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be quirky, unconventional, and whimsical with unexpected colors, playful fonts, and bizarre animations or effects to emphasize the absurdity.
              
              The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
              
              "${input}"
              
              Make sure the design and style reflect the absurd tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.
              
              `
                },
                passive_aggressive: {
                    prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be sleek and modern with a minimalist style, using muted colors and sharp typography. Incorporate subtle visual cues or animations that hint at irony or sarcasm to convey the passive-aggressive tone.
              
              The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
              
              "${input}"
              
              Make sure the design and style reflect the passive-aggressive tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.
              
              `
                },
                honest: {
                    prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be simple, clear, and sincere with clean typography, a neutral color palette, and straightforward layout. Use subtle styling to convey honesty and transparency without any exaggeration.
              
              The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
              
              "${input}"
              
              Make sure the design and style reflect the honest tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.
              
              `
                }
            };

            const prompt = category[category_type]?.prompt
            console.log(prompt);
            const BASE_URL = "https://graphql.swiftask.ai/api/ai";
            const apiKeys =
                "b956b180cb5434fb735158d891b279fa8d08ec04be633e413a70197a9d2b13ee";
            const response = await fetch(`${BASE_URL}/claude35sonnet`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKeys}`,
                },
                body: JSON.stringify({
                    input: prompt,
                    documentAnalysisMode: "SIMPLE",
                    files: [],
                    messageHistory: [
                        ...messageHistory,
                        {
                            role: "user",
                            content: input,
                        },
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const responseData = await response.json();
console.log(responseData);

if (responseData?.text) {
    const htmlMatch = responseData.text.match(/```html\n([\s\S]*?)```/);
    if (htmlMatch && htmlMatch[1]) {
        const fullHtml = htmlMatch[1];

        // Extraction du <h1>
        const h1Match = fullHtml.match(/<h1>(.*?)<\/h1>/i);
        const originalTitle = h1Match?.[1]?.trim() || "";

        // Extraction du <p> (excluant les classes potentielles)
        const pMatch = fullHtml.match(/<p(?:\s+[^>]*)?>([\s\S]*?)<\/p>/i);
        const originalContent = pMatch?.[1]?.trim() || "";

        // Créer le template HTML avec des marqueurs spécifiques
        let templateHtml = fullHtml;
        
        // Remplacer le contenu du h1 par un marqueur
        templateHtml = templateHtml.replace(/<h1>.*?<\/h1>/i, `<h1>__TITLE__</h1>`);
        
        // Remplacer le contenu du p par un marqueur
        templateHtml = templateHtml.replace(/<p(?:\s+[^>]*)?>([\s\S]*?)<\/p>/i, `<p>__CONTENT__</p>`);

        // Mettre à jour les states
        setTitle(originalTitle);
        setContent(originalContent);
        setGeneratedHtml(templateHtml); // Stocke le template avec des marqueurs
        
        // Fonction pour générer le HTML final
        const generateFinalHtml = (template, title, content) => {
            return template
                .replace('__TITLE__', title)
                .replace('__CONTENT__', content);
        };
        
        // Stockez cette fonction également dans un state ou une référence
        setGeneratedHtml(generateFinalHtml);
    }
}



            return responseData;
        } catch (error) {
            console.error("Error calling Swiftask API with fetch:", error);
            throw error;
        }
    };

    // Génère le document HTML complet (simulateur IA)
    async function generateContentByAI() {
        setLoading(true);
        try {
            await callSwiftaskWithFetch(description, [], tone)
        } catch (e) {
            alert("Erreur génération IA");
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`flex flex-col bg-gray-100 border-r border-gray-300 transition-all duration-300 ease-in-out overflow-y-auto ${sidebarOpen ? "w-96" : "w-0"
                    }`}
            >
                {
                    isModif ? <div className="p-4 space-y-6">
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

                    </div> : <div className="p-6 space-y-8">

                        <div className="flex items-center space-x-2 text-gray-700 font-semibold text-lg">
                            <span>Génération IA</span>
                        </div>
                        <div>
                            <label htmlFor="tone" className="block mb-1 font-semibold text-gray-700">
                                Sélectionnez le ton
                            </label>
                            <select
                                id="tone"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                            >
                                <option value="">-- Choisir un ton --</option>
                                <option value="dramatic">Dramatique</option>
                                <option value="ironic">Ionique</option>
                                <option value="ultra_cringe">Ultra cringe</option>
                                <option value="cringe">Cringe</option>
                                <option value="classy">Classe</option>
                                <option value="touching">Touchant</option>
                                <option value="absurd">Absurde</option>
                                <option value="absurd">Absurde</option>
                                <option value="passive_aggressive">Passif-agressif</option>
                                <option value="honest">Honnête</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block mb-1 font-semibold text-gray-700">
                                Description du texte
                            </label>
                            <textarea
                                id="description"
                                rows={5}
                                className="w-full border border-gray-300 rounded-md p-2 resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Décrivez ici ce que vous souhaitez générer..."
                            />
                        </div>

                        {/* Bouton Générer */}
                        <button
                            onClick={generateContentByAI}
                            disabled={loading || !description.trim()}
                            className={`w-full py-2 rounded-md text-white font-semibold transition ${loading || !description.trim()
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {loading ? "Génération en cours..." : "Générer par IA"}
                        </button>
                    </div>
                }

            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="absolute top-1/2 left-96 -ml-4 z-20 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition"
                aria-label="Toggle Sidebar"
            >
                <svg
                    className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${sidebarOpen ? "" : "rotate-180"
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
            </button>

            {/* Main Content */}
            <main className="flex-grow p-6 bg-white flex justify-center items-center relative">
                <div className="relative w-full max-w-4xl h-[600px] border border-gray-300 rounded-md">
                    <iframe
                        title="Aperçu HTML"
                        srcDoc={generatedHtml}
                        className="w-full h-full rounded-md"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />

                    {/* Bouton Envoyer */}
                    {/* <button
                        onClick={async () => {
                            console.log(generatedHtml);
                            console.log(title);
                            console.log(content);
                        }}
                        className="absolute bottom-4 right-4 bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                    >
                        Envoyer
                    </button> */}
                    <button
                        onClick={() => {
                            console.log("test");
                            setIsModif(true)
                        }} 
                        className="absolute bottom-4 right-4 bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                    >
                        Modifier
                    </button>
                </div>
            </main>
        </div>
    );
}