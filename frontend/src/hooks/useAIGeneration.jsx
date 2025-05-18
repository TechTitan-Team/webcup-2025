import { useState } from "react";

const useAIGeneration = () => {
  const [generatedHtml, setGeneratedHtml] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModif, setIsModif] = useState(false);

  const tonePrompts = {
    dramatic: {
      prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be visually stunning and elegant, with a dark, moody, and dramatic aesthetic. Use rich colors, smooth typography, and subtle animations or effects to enhance the emotional impact.
        
        The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
        
        "\${input}"
        
        Make sure the design and style reflect the dramatic tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.`
    },
    ironic: {
      prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be visually appealing, playful, and stylish, with bright or contrasting colors and fun typography. Use creative and quirky elements or animations to emphasize the ironic tone.
        
        The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
        
        "\${input}"
        
        Make sure the design and style reflect the ironic tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.`
    },
    ultra_cringe: {
      prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be colorful, exaggerated, and over-the-top with bold fonts, bright clashing colors, and cheesy animations or effects to amplify the ultra-cringe vibe.
        
        The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
        
        "\${input}"
        
        Make sure the design and style reflect the ultra-cringe tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.`
    },
    cringe: {
      prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be somewhat awkwardly charming with slightly cheesy fonts, pastel or muted colors, and subtle quirky animations or effects to give a cringe yet endearing feel.
        
        The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
        
        "\${input}"
        
        Make sure the design and style reflect the cringe tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.`
    },
    classy: {
      prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be elegant, sophisticated, and minimalist with refined typography, a neutral color palette (such as black, white, and gold or silver accents), and subtle animations or effects that convey grace and dignity.
        
        The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
        
        "\${input}"
        
        Make sure the design and style reflect the classy tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.`
    },
    touching: {
      prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be warm, heartfelt, and emotionally evocative with soft colors (such as pastel tones), gentle typography, and subtle animations or effects that enhance the sentimentality.
        
        The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
        
        "\${input}"
        
        Make sure the design and style reflect the touching tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.`
    },
    absurd: {
      prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be quirky, unconventional, and whimsical with unexpected colors, playful fonts, and bizarre animations or effects to emphasize the absurdity.
        
        The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
        
        "\${input}"
        
        Make sure the design and style reflect the absurd tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.`
    },
    passive_aggressive: {
      prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be sleek and modern with a minimalist style, using muted colors and sharp typography. Incorporate subtle visual cues or animations that hint at irony or sarcasm to convey the passive-aggressive tone.
        
        The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
        
        "\${input}"
        
        Make sure the design and style reflect the passive-aggressive tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.`
    },
    honest: {
      prompt: `Create a single \`.html\` file that includes both HTML and CSS. The design should be simple, clear, and sincere with clean typography, a neutral color palette, and straightforward layout. Use subtle styling to convey honesty and transparency without any exaggeration.
        
        The page should have EXACTLY ONE <h1> element for the title (for example, "Pour mon amour" or "Pour mon ancien patron") and EXACTLY ONE <p> element containing the entire farewell message. The farewell message should convey a sense of ending in order to allow a new beginning, inspired by the following French text:
        
        "\${input}"
        
        Make sure the design and style reflect the honest tone of this farewell message. DO NOT include any HTML tags inside the <p> element - keep it as plain text only. The HTML structure should be simple with just one heading and one paragraph in the body.`
    }
  };

  const callSwiftaskWithFetch = async (input, messageHistory = [], toneType) => {
    try {
      const prompt = tonePrompts[toneType]?.prompt.replace("${input}", input);
      console.log(prompt);
      
      const BASE_URL = "https://graphql.swiftask.ai/api/ai";
      const apiKeys = "b956b180cb5434fb735158d891b279fa8d08ec04be633e413a70197a9d2b13ee";
      
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
          templateHtml = templateHtml.replace(/<h1>.*?<\/h1>/i, `<h1 id='title-to-modify'>${originalTitle}</h1>`);
          
          // Remplacer le contenu du p par un marqueur
          templateHtml = templateHtml.replace(/<p(?:\s+[^>]*)?>([\s\S]*?)<\/p>/i, `<p id='content-to-modify'>${originalContent}</p>`);

          // Mettre à jour les states
          setTitle(originalTitle);
          setContent(originalContent);
          setGeneratedHtml(templateHtml); // Stocke le template avec des marqueurs
          setIsModif(true);
        }
      }

      return responseData;
    } catch (error) {
      console.error("Error calling Swiftask API with fetch:", error);
      throw error;
    }
  };

  const generateContentByAI = async (description, tone) => {
    setLoading(true);
    try {
      await callSwiftaskWithFetch(description, [], tone);
    } catch (e) {
      alert("Erreur génération IA");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleModifyTitle = (newTitle) => {
    setTitle(newTitle);
    let frame = document.getElementById('iframe-to-modify');
    if (frame && frame.contentWindow && frame.contentWindow.document) {
      let titleElement = frame.contentWindow.document.getElementById('title-to-modify');
      if (titleElement) {
        titleElement.innerHTML = newTitle;
      }
    }
    
    const newGeneratedHtml = generatedHtml.replace(
      /<h1 id='title-to-modify'>.*?<\/h1>/i, 
      `<h1 id='title-to-modify'>${newTitle}</h1>`
    );
    setGeneratedHtml(newGeneratedHtml);
  };

  const handleModifyContent = (newContent) => {
    setContent(newContent);
    let frame = document.getElementById('iframe-to-modify');
    if (frame && frame.contentWindow && frame.contentWindow.document) {
      let contentElement = frame.contentWindow.document.getElementById('content-to-modify');
      if (contentElement) {
        contentElement.innerHTML = newContent;
      }
    }
    
    const newGeneratedHtml = generatedHtml.replace(
      /<p id='content-to-modify'>.*?<\/p>/i, 
      `<p id='content-to-modify'>${newContent}</p>`
    );
    setGeneratedHtml(newGeneratedHtml);
  };

  return {
    generatedHtml,
    title,
    content,
    loading,
    isModif,
    setIsModif,
    generateContentByAI,
    handleModifyTitle,
    handleModifyContent
  };
};

export default useAIGeneration; 