export const categories = [
  { id: "all", name: "Tout" },
  { id: "professional", name: "Professionnel" },
  { id: "creative", name: "Créatif" },
  { id: "personal", name: "Personnel" },
  { id: "digital", name: "Numérique" },
];

export const templates = [
  {
    id: 1,
    title: "Lettre de démission dramatique",
    description: "Pour quitter votre emploi avec impact et émotion",
    category: "professional",
    author: "Figma",
    likes: 1340,
    views: 5400,
    image:
      "https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=1470&auto=format&fit=crop",
    defaultTitle: "Ma démission",
    defaultContent:
      "Après mûre réflexion, je dois vous annoncer ma décision de quitter mes fonctions. Ce n'est pas une décision prise à la légère, mais le résultat d'une longue période de réflexion. Je vous remercie pour les opportunités qui m'ont été offertes durant mon parcours au sein de l'entreprise.",
    htmlTemplate: (title, content) => `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lettre de démission</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 40px;
                    color: #333;
                    background-color: #f9f9f9;
                }
                .letter {
                    background-color: white;
                    padding: 30px;
                    border: 1px solid #ddd;
                    box-shadow: 0 0 20px rgba(0,0,0,0.05);
                }
                .header {
                    text-align: right;
                    margin-bottom: 40px;
                }
                .title {
                    font-size: 24px;
                    font-weight: bold;
                    margin: 20px 0;
                    text-align: center;
                }
                .signature {
                    margin-top: 40px;
                    text-align: right;
                }
            </style>
        </head>
        <body>
            <div class="letter">
                <div class="header">
                    <p>Paris, le ${new Date().toLocaleDateString("fr-FR")}</p>
                </div>
                
                <h1 class="title">${title}</h1>
                
                <p>${content}</p>
                
                <div class="signature">
                    <p>Signature</p>
                </div>
            </div>
        </body>
        </html>
      `,
  },
  {
    id: 2,
    title: "Adieu au projet abandonné",
    description: "Dites au revoir à ce projet qui n'a jamais vu le jour",
    category: "creative",
    author: "Figma",
    likes: 880,
    views: 2100,
    image:
      "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=959&auto=format&fit=crop",
    defaultTitle: "Adieu, mon beau projet",
    defaultContent:
      "Tu étais plein de promesses, d'ambitions et de rêves. Mais parfois, la vie nous emmène ailleurs. Ce n'est pas par manque d'amour que je te laisse partir, mais par nécessité. Peut-être nous retrouverons-nous un jour, sous une autre forme, dans un autre temps.",
    htmlTemplate: (title, content) => `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Adieu au projet</title>
            <style>
                body {
                    font-family: 'Georgia', serif;
                    line-height: 1.8;
                    background-color: #f0f0f0;
                    color: #333;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    min-height: 100vh;
                    justify-content: center;
                    align-items: center;
                }
                .container {
                    max-width: 700px;
                    padding: 40px;
                    background: white;
                    box-shadow: 0 0 30px rgba(0,0,0,0.1);
                    border-radius: 8px;
                }
                .title {
                    font-size: 32px;
                    margin-bottom: 30px;
                    color: #444;
                    text-align: center;
                    font-style: italic;
                }
                .content {
                    font-size: 18px;
                    color: #555;
                    white-space: pre-line;
                }
                .footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 14px;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1 class="title">${title}</h1>
                <div class="content">${content}</div>
                <div class="footer">Écrit le ${new Date().toLocaleDateString(
                  "fr-FR"
                )}</div>
            </div>
        </body>
        </html>
      `,
  },
  {
    id: 3,
    title: "Rupture avec classe",
    description: "Une façon élégante de mettre fin à une relation",
    category: "personal",
    author: "Figma",
    likes: 732,
    views: 2100,
    image:
      "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=1528&auto=format&fit=crop",
    defaultTitle: "Il est temps de nous dire au revoir",
    defaultContent:
      "Nos chemins se sont croisés, nous avons partagé des moments précieux, mais aujourd'hui, je sens qu'il est temps pour nous de prendre des directions différentes. Je garderai toujours en moi le souvenir de ce que nous avons vécu ensemble.",
    htmlTemplate: (title, content) => `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lettre de rupture</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #e8d3c5;
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
      `,
  },
  {
    id: 4,
    title: "Au revoir à mon équipe",
    description: "Un message sincère pour vos anciens collègues",
    category: "professional",
    author: "Figma",
    likes: 165,
    views: 725,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1484&auto=format&fit=crop",
    defaultTitle: "Merci pour cette aventure",
    defaultContent:
      "Chers collègues, après ces années passées ensemble, il est temps pour moi de partir vers de nouveaux horizons. Je tiens à vous remercier pour votre soutien, votre professionnalisme et tous ces moments partagés qui ont fait de cette expérience une période enrichissante de ma vie.",
    htmlTemplate: (title, content) => `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Message d'adieu</title>
            <style>
                body {
                    font-family: 'Helvetica', sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f7f9fc;
                }
                .container {
                    background-color: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.05);
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #eee;
                }
                .title {
                    color: #2c3e50;
                    font-size: 28px;
                    margin-bottom: 10px;
                }
                .date {
                    color: #7f8c8d;
                    font-size: 14px;
                }
                .content {
                    font-size: 16px;
                    color: #34495e;
                    white-space: pre-line;
                }
                .signature {
                    margin-top: 40px;
                    text-align: right;
                    font-style: italic;
                    color: #7f8c8d;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 class="title">${title}</h1>
                    <div class="date">${new Date().toLocaleDateString(
                      "fr-FR"
                    )}</div>
                </div>
                
                <div class="content">
                    ${content}
                </div>
                
                <div class="signature">
                    <p>Cordialement,</p>
                    <p>Votre nom</p>
                </div>
            </div>
        </body>
        </html>
      `,
  },
  {
    id: 5,
    title: "Quitter les réseaux sociaux",
    description: "Votre dernier post avant de disparaître",
    category: "digital",
    author: "Joey Banks",
    likes: 160,
    views: 477,
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1374&auto=format&fit=crop",
    defaultTitle: "Déconnexion volontaire",
    defaultContent:
      "Après des années passées sur les réseaux sociaux, j'ai décidé de prendre du recul. Ce n'est pas un au revoir définitif, mais plutôt une pause nécessaire pour me reconnecter avec le monde réel. Merci à tous ceux qui ont partagé ce voyage numérique avec moi.",
    htmlTemplate: (title, content) => `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Départ des réseaux sociaux</title>
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #fafafa;
                    color: #262626;
                }
                .container {
                    max-width: 600px;
                    margin: 40px auto;
                    background: white;
                    border-radius: 3px;
                    border: 1px solid #dbdbdb;
                    overflow: hidden;
                }
                .header {
                    padding: 16px;
                    border-bottom: 1px solid #efefef;
                    display: flex;
                    align-items: center;
                }
                .profile-pic {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #8a3ab9;
                    margin-right: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                }
                .username {
                    font-weight: 600;
                    font-size: 14px;
                }
                .image {
                    width: 100%;
                    height: 375px;
                    background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 24px;
                    font-weight: bold;
                }
                .content {
                    padding: 16px;
                }
                .title {
                    font-weight: 600;
                    margin-bottom: 8px;
                }
                .caption {
                    font-size: 14px;
                    line-height: 1.5;
                    white-space: pre-line;
                }
                .footer {
                    padding: 16px;
                    border-top: 1px solid #efefef;
                    font-size: 12px;
                    color: #8e8e8e;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="profile-pic">U</div>
                    <div class="username">username</div>
                </div>
                
                <div class="image">
                    ${title}
                </div>
                
                <div class="content">
                    <div class="title">username</div>
                    <div class="caption">${content}</div>
                </div>
                
                <div class="footer">
                    Publié le ${new Date().toLocaleDateString("fr-FR")}
                </div>
            </div>
        </body>
        </html>
      `,
  },
  {
    id: 6,
    title: "Fin d'une ère",
    description: "Pour marquer la fin d'une période importante",
    category: "creative",
    author: "Joey Banks",
    likes: 142,
    views: 379,
    image:
      "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1470&auto=format&fit=crop",
    defaultTitle: "La fin d'un chapitre",
    defaultContent:
      "Toutes les bonnes choses ont une fin. Ce chapitre de ma vie se termine, mais un nouveau commence. Je suis reconnaissant pour les leçons apprises, les personnes rencontrées et les expériences vécues. C'est avec émotion que je tourne cette page, prêt à écrire la suite de mon histoire.",
    htmlTemplate: (title, content) => `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Fin d'une ère</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Playfair Display', serif;
                    background-color: #000;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                
                .container {
                    max-width: 800px;
                    padding: 60px;
                    background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
                    background-size: cover;
                    background-position: center;
                    border: 1px solid rgba(255,255,255,0.2);
                }
                
                .title {
                    font-size: 42px;
                    text-align: center;
                    margin-bottom: 40px;
                    line-height: 1.2;
                    font-weight: normal;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    padding-bottom: 20px;
                }
                
                .content {
                    font-size: 18px;
                    line-height: 1.8;
                    letter-spacing: 0.5px;
                    text-align: justify;
                    white-space: pre-line;
                }
                
                .date {
                    margin-top: 40px;
                    text-align: right;
                    font-style: italic;
                    opacity: 0.7;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1 class="title">${title}</h1>
                
                <div class="content">
                    ${content}
                </div>
                
                <div class="date">
                    ${new Date().toLocaleDateString("fr-FR")}
                </div>
            </div>
        </body>
        </html>
      `,
  },
  {
    id: 7,
    title: "Message passif-agressif",
    description: "Quand vous partez mais voulez laisser une trace",
    category: "personal",
    author: "MUI",
    likes: 92,
    views: 331,
    image:
      "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1374&auto=format&fit=crop",
    defaultTitle: "Puisque c'est comme ça...",
    defaultContent:
      "Je pensais qu'on avait quelque chose de spécial, mais visiblement je me trompais. C'est toujours intéressant de découvrir à quel point on peut se méprendre sur les gens. Bonne continuation avec vos choix, j'espère qu'ils vous mèneront là où vous le souhaitez.",
    htmlTemplate: (title, content) => `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Message</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 20px;
                    color: #333;
                }
                
                .note {
                    max-width: 600px;
                    margin: 40px auto;
                    background-color: #fff9c4;
                    padding: 30px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    transform: rotate(-1deg);
                    position: relative;
                }
                
                .pin {
                    width: 20px;
                    height: 20px;
                    background-color: #f44336;
                    border-radius: 50%;
                    position: absolute;
                    top: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    box-shadow: 0 2px 2px rgba(0,0,0,0.2);
                }
                
                .title {
                    font-size: 24px;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    text-align: center;
                    font-weight: bold;
                    color: #d32f2f;
                }
                
                .content {
                    font-size: 16px;
                    line-height: 1.6;
                    white-space: pre-line;
                }
                
                .signature {
                    margin-top: 30px;
                    text-align: right;
                    font-style: italic;
                }
            </style>
        </head>
        <body>
            <div class="note">
                <div class="pin"></div>
                <h1 class="title">${title}</h1>
                
                <div class="content">
                    ${content}
                </div>
                
                <div class="signature">
                    Au revoir.
                </div>
            </div>
        </body>
        </html>
      `,
  },
  {
    id: 8,
    title: "Claquement de porte virtuel",
    description: "Faites du bruit même en ligne",
    category: "digital",
    author: "Toni Gemayel",
    likes: 52,
    views: 298,
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1470&auto=format&fit=crop",
    defaultTitle: "DÉCONNEXION",
    defaultContent:
      "J'ai donné suffisamment de mon temps et de mon énergie à cet espace numérique. Il est temps pour moi de me concentrer sur le monde réel, sur des connexions authentiques plutôt que ces interactions superficielles. Ne cherchez pas à me contacter ici, je ne reviendrai pas.",
    htmlTemplate: (title, content) => `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Déconnexion</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Courier New', monospace;
                    background-color: #000;
                    color: #0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    overflow: hidden;
                }
                
                .terminal {
                    width: 80%;
                    max-width: 800px;
                    height: 80vh;
                    background-color: #000;
                    border: 1px solid #0f0;
                    padding: 20px;
                    overflow-y: auto;
                    position: relative;
                }
                
                .title {
                    color: #0f0;
                    font-size: 24px;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    text-align: center;
                    animation: glitch 1s infinite;
                }
                
                .content {
                    font-size: 16px;
                    line-height: 1.6;
                    white-space: pre-line;
                }
                
                .cursor {
                    display: inline-block;
                    width: 10px;
                    height: 20px;
                    background-color: #0f0;
                    animation: blink 1s infinite;
                    margin-left: 5px;
                }
                
                .timestamp {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    font-size: 12px;
                    color: #0f0;
                    opacity: 0.7;
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                
                @keyframes glitch {
                    0%, 100% { transform: none; opacity: 1; }
                    7% { transform: skew(-0.5deg, -0.9deg); opacity: 0.75; }
                    10% { transform: none; opacity: 1; }
                    27% { transform: none; opacity: 1; }
                    30% { transform: skew(0.8deg, -0.1deg); opacity: 0.75; }
                    35% { transform: none; opacity: 1; }
                    52% { transform: none; opacity: 1; }
                    55% { transform: skew(-1deg, 0.2deg); opacity: 0.75; }
                    50% { transform: none; opacity: 1; }
                    72% { transform: none; opacity: 1; }
                    75% { transform: skew(0.4deg, 1deg); opacity: 0.75; }
                    80% { transform: none; opacity: 1; }
                    100% { transform: none; opacity: 1; }
                }
            </style>
        </head>
        <body>
            <div class="terminal">
                <div class="title">${title}</div>
                
                <div class="content">
                    > Initialisation de la déconnexion...
                    > Suppression des données en cours...
                    > Message final:
                    
                    ${content}
                    
                    > Déconnexion complète dans 3... 2... 1...
                    > DÉCONNECTÉ<span class="cursor"></span>
                </div>
                
                <div class="timestamp">${new Date().toLocaleTimeString(
                  "fr-FR"
                )} - ${new Date().toLocaleDateString("fr-FR")}</div>
            </div>
        </body>
        </html>
      `,
  },
];
