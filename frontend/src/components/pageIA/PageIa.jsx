import { useState } from "react";
import sendData from "../../hooks/sendHTML";

export default function PageIA() {
  const { sendHtml } = sendData();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [tone, setTone] = useState("");
  const [description, setDescription] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState("");

  const [loading, setLoading] = useState(false);

  // Génère le document HTML complet (simulateur IA)
  async function generateContentByAI() {
    setLoading(true);
    try {
      // Simule un appel API IA qui retourne un document HTML complet
      await new Promise((r) => setTimeout(r, 1500));

      // Construis un titre et contenu basés sur le ton et la description
      const titleText = tone ? `Titre en mode ${tone}` : "Titre généré";
      const contentText = description
        ? `Contenu généré pour la description : ${description}`
        : "Contenu généré par IA.";

      // Génère tout le HTML complet
      const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${titleText}</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #e8d3c5;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .letter-container {
            max-width: 600px;
            background: rgba(255 255 255 / 0.3);
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0 0 20px rgba(0 0 0 / 0.05);
            text-align: center;
          }
          h1 {
            font-family: 'Times New Roman', serif;
            font-style: italic;
            font-size: 28px;
            margin-bottom: 25px;
          }
          p {
            font-size: 16px;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <div class="letter-container">
          <h1>${titleText}</h1>
          <p>${contentText}</p>
        </div>
      </body>
      </html>
      `;

      setGeneratedHtml(html);
    } catch (e) {
      alert("Erreur génération IA");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`flex flex-col bg-gray-100 border-r border-gray-300 transition-all duration-300 ease-in-out overflow-y-auto ${
          sidebarOpen ? "w-96" : "w-0"
        }`}
      >
        <div className="p-6 space-y-8">
          <div className="flex items-center space-x-2 text-gray-700 font-semibold text-lg">
            <span>Génération IA</span>
          </div>

          {/* Select Ton */}
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
              <option value="formel">Formel</option>
              <option value="amical">Amical</option>
              <option value="persuasif">Persuasif</option>
              <option value="inspirant">Inspirant</option>
              <option value="humoristique">Humoristique</option>
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
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              loading || !description.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Génération en cours..." : "Générer par IA"}
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-1/2 left-96 -ml-4 z-20 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition"
        aria-label="Toggle Sidebar"
      >
        <svg
          className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${
            sidebarOpen ? "" : "rotate-180"
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
          <button
            onClick={async () => {
              if (!generatedHtml) {
                alert("Générer le contenu avant d'envoyer !");
                return;
              }
              await sendHtml("Document généré", generatedHtml);
              alert("Contenu envoyé !");
            }}
            className="absolute bottom-4 right-4 bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Envoyer
          </button>
        </div>
      </main>
    </div>
  );
}