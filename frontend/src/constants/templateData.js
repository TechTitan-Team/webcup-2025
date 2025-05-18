export const categories = [
    { id: 'all', name: 'Tout' },
    { id: 'professional', name: 'Professionnel' },
    { id: 'creative', name: 'Créatif' },
    { id: 'personal', name: 'Personnel' },
    { id: 'digital', name: 'Numérique' },
];

import image1 from '../../public/image1.png';
import image2 from '../../public/image2.png';
import image3 from '../../public/image3.png';
import image4 from '../../public/image4.png';
import image5 from '../../public/image5.png';
import image6 from '../../public/image6.png';
import image7 from '../../public/image7.png';
import image8 from '../../public/image8.png';
import image9 from '../../public/image9.png';
import image10 from '../../public/image10.png';
import image11 from '../../public/image11.png';
import image12 from '../../public/image12.png';
export const templates = [
    {
        id: 1,
        title: 'Lettre de démission dramatique',
        description: 'Pour quitter votre emploi avec impact et émotion',
        category: 'professional',
        author: 'Figma',
        likes: 1340,
        views: 5400,
        image: image1,
        defaultTitle: 'Ma démission',
        defaultContent:
            "Après mûre réflexion, je dois vous annoncer ma décision de quitter mes fonctions. Ce n'est pas une décision prise à la légère, mais le résultat d'une longue période de réflexion. Je vous remercie pour les opportunités qui m'ont été offertes durant mon parcours au sein de l'entreprise.",
        htmlTemplate: (title, content) => `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Lettre de démission</title>
              <style>
                  body {
                      font-family: 'Merriweather', serif;
                      background: linear-gradient(135deg, #f7f1e1, #e4d0b8);
                      color: #4a403a;
                      margin: 0;
                      padding: 40px 20px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh;
                  }
                  .letter {
                      background: #fffaf0;
                      max-width: 700px;
                      padding: 50px;
                      border-radius: 12px;
                      box-shadow: 0 12px 25px rgba(0,0,0,0.15);
                      border-left: 8px solid #d35400;
                  }
                  .header {
                      text-align: right;
                      font-style: italic;
                      font-size: 14px;
                      margin-bottom: 30px;
                      color: #7d5a3c;
                  }
                  .title {
                      font-size: 36px;
                      font-weight: 700;
                      margin-bottom: 30px;
                      text-align: center;
                      color: #d35400;
                      letter-spacing: 1.2px;
                  }
                  p {
                      font-size: 18px;
                      line-height: 1.8;
                      margin-bottom: 40px;
                      white-space: pre-line;
                      color: #5b4a3c;
                  }
                  .signature {
                      text-align: right;
                      font-weight: 600;
                      font-size: 20px;
                      color: #d35400;
                  }
              </style>
          </head>
          <body>
              <div class="letter">
                  <div class="header">Paris, le ${new Date().toLocaleDateString(
                      'fr-FR'
                  )}</div>
                  <h1 class="title">${title}</h1>
                  <p>${content}</p>
                  <div class="signature">Signature</div>
              </div>
          </body>
          </html>
        `,
    },
    {
        id: 2,
        title: 'Adieu au projet abandonné',
        description: "Dites au revoir à ce projet qui n'a jamais vu le jour",
        category: 'creative',
        author: 'Figma',
        likes: 880,
        views: 2100,
        image: image2,
        defaultTitle: 'Adieu, mon beau projet',
        defaultContent:
            "Tu étais plein de promesses, d'ambitions et de rêves. Mais parfois, la vie nous emmène ailleurs. Ce n'est pas par manque d'amour que je te laisse partir, mais par nécessité. Peut-être nous retrouverons-nous un jour, sous une autre forme, dans un autre temps.",
        htmlTemplate: (title, content) => `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Adieu au projet</title>
              <style>
                  body {
                      font-family: 'Courier New', monospace;
                      color: #1e1e1e;
                      background: #f0f0f0;
                      margin: 0;
                      padding: 0;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh;
                  }
                  .container {
                      background: #fff;
                      box-shadow: 0 0 50px rgba(0,0,0,0.1);
                      max-width: 720px;
                      padding: 50px 60px;
                      border-radius: 15px;
                      border-top: 8px solid #3498db;
                  }
                  .title {
                      font-size: 38px;
                      font-weight: bold;
                      margin-bottom: 40px;
                      color: #3498db;
                      text-align: left;
                      border-bottom: 3px solid #3498db;
                      padding-bottom: 10px;
                      font-family: 'Courier New', monospace;
                  }
                  .content {
                      font-size: 19px;
                      line-height: 1.9;
                      white-space: pre-line;
                      color: #333;
                      letter-spacing: 0.04em;
                  }
                  .footer {
                      margin-top: 50px;
                      font-style: italic;
                      font-size: 14px;
                      color: #777;
                      text-align: right;
                      font-family: 'Courier New', monospace;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1 class="title">${title}</h1>
                  <div class="content">${content}</div>
                  <div class="footer">Écrit le ${new Date().toLocaleDateString(
                      'fr-FR'
                  )}</div>
              </div>
          </body>
          </html>
        `,
    },
    {
        id: 3,
        title: 'Rupture avec classe',
        description: 'Une façon élégante de mettre fin à une relation',
        category: 'personal',
        author: 'Figma',
        likes: 732,
        views: 2100,
        image: image3,
        defaultTitle: 'Il est temps de nous dire au revoir',
        defaultContent:
            "Nos chemins se sont croisés, nous avons partagé des moments précieux, mais aujourd'hui, je sens qu'il est temps pour nous de prendre des directions différentes. Je garderai toujours en moi le souvenir de ce que nous avons vécu ensemble.",
        htmlTemplate: (title, content) => `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Lettre de rupture</title>
              <style>
                  body {
                      margin: 0;
                      padding: 0;
                      font-family: 'Lucida Handwriting', cursive;
                      background: linear-gradient(135deg, #fceabb, #f8b500);
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh;
                      color: #5b3a00;
                  }
                  .letter-container {
                      background: rgba(255, 255, 255, 0.85);
                      padding: 50px 60px;
                      max-width: 650px;
                      border-radius: 25px;
                      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                      position: relative;
                      text-align: center;
                  }
                  .title {
                      font-size: 40px;
                      margin-bottom: 35px;
                      font-style: italic;
                      letter-spacing: 0.1em;
                      text-shadow: 1px 1px 2px #c37d00;
                  }
                  .content {
                      font-size: 18px;
                      line-height: 1.7;
                      color: #4b2c00;
                      white-space: pre-line;
                      margin-bottom: 40px;
                  }
                  .heart {
                      font-size: 60px;
                      color: #e74c3c;
                      position: absolute;
                      bottom: 20px;
                      right: 20px;
                      opacity: 0.7;
                      user-select: none;
                  }
              </style>
          </head>
          <body>
              <div class="letter-container">
                  <h1 class="title">${title}</h1>
                  <p class="content">${content}</p>
                  <div class="heart">❤️</div>
              </div>
          </body>
          </html>
        `,
    },
    {
        id: 4,
        title: 'Au revoir à mon équipe',
        description: 'Un message sincère pour vos anciens collègues',
        category: 'professional',
        author: 'Figma',
        likes: 165,
        views: 725,
        image: image4,
        defaultTitle: 'Merci pour cette aventure',
        defaultContent:
            'Chers collègues, après ces années passées ensemble, il est temps pour moi de partir vers de nouveaux horizons. Je tiens à vous remercier pour votre soutien, votre professionnalisme et tous ces moments partagés qui ont fait de cette expérience une période enrichissante de ma vie.',
        htmlTemplate: (title, content) => `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Message d'adieu</title>
              <style>
                  body {
                      font-family: 'Open Sans', sans-serif;
                      background-color: #f0f4f7;
                      margin: 0;
                      padding: 0;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh;
                      color: #34495e;
                  }
                  .container {
                      background: white;
                      max-width: 750px;
                      padding: 50px 60px;
                      border-radius: 15px;
                      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                      border-top: 6px solid #2980b9;
                  }
                  .header {
                      text-align: center;
                      margin-bottom: 35px;
                  }
                  .title {
                      font-size: 36px;
                      font-weight: 700;
                      color: #2980b9;
                      margin-bottom: 5px;
                  }
                  .date {
                      font-size: 14px;
                      color: #7f8c8d;
                  }
                  .content {
                      font-size: 18px;
                      line-height: 1.7;
                      white-space: pre-line;
                      margin-top: 25px;
                      color: #2c3e50;
                  }
                  .signature {
                      margin-top: 50px;
                      text-align: right;
                      font-style: italic;
                      color: #7f8c8d;
                      font-size: 16px;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1 class="title">${title}</h1>
                      <div class="date">${new Date().toLocaleDateString(
                          'fr-FR'
                      )}</div>
                  </div>
                  <div class="content">${content}</div>
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
        title: 'Quitter les réseaux sociaux',
        description: 'Votre dernier post avant de disparaître',
        category: 'digital',
        author: 'Joey Banks',
        likes: 160,
        views: 477,
        image: image5,
        defaultTitle: 'Déconnexion volontaire',
        defaultContent:
            "Après des années passées sur les réseaux sociaux, j'ai décidé de prendre du recul. Ce n'est pas un au revoir définitif, mais plutôt une pause nécessaire pour me reconnecter avec le monde réel. Merci à tous ceux qui ont partagé ce voyage numérique avec moi.",
        htmlTemplate: (title, content) => `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Départ des réseaux sociaux</title>
              <style>
                  body {
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      background-color: #fafafa;
                      margin: 0;
                      padding: 40px 0;
                      color: #333;
                      display: flex;
                      justify-content: center;
                  }
                  .container {
                      background: white;
                      width: 600px;
                      border-radius: 12px;
                      border: 1px solid #ddd;
                      box-shadow: 0 0 15px rgba(0,0,0,0.05);
                      overflow: hidden;
                  }
                  .header {
                      display: flex;
                      align-items: center;
                      padding: 18px 20px;
                      border-bottom: 1px solid #eee;
                      background-color: #fafafa;
                  }
                  .profile-pic {
                      width: 40px;
                      height: 40px;
                      border-radius: 50%;
                      background: linear-gradient(45deg, #833ab4, #fd1d1d);
                      color: white;
                      font-weight: 700;
                      font-size: 18px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin-right: 15px;
                      user-select: none;
                  }
                  .username {
                      font-weight: 600;
                      font-size: 16px;
                      color: #555;
                  }
                  .image {
                      height: 350px;
                      background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 28px;
                      font-weight: 700;
                      color: white;
                      user-select: none;
                  }
                  .content {
                      padding: 25px 30px;
                  }
                  .title {
                      font-weight: 700;
                      font-size: 18px;
                      margin-bottom: 10px;
                      color: #222;
                  }
                  .caption {
                      font-size: 15px;
                      line-height: 1.5;
                      white-space: pre-line;
                      color: #555;
                  }
                  .footer {
                      padding: 15px 20px;
                      border-top: 1px solid #eee;
                      font-size: 13px;
                      color: #999;
                      text-align: center;
                      background-color: #fafafa;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <div class="profile-pic">U</div>
                      <div class="username">username</div>
                  </div>
                  <div class="image">${title}</div>
                  <div class="content">
                      <div class="title">username</div>
                      <div class="caption">${content}</div>
                  </div>
                  <div class="footer">Publié le ${new Date().toLocaleDateString(
                      'fr-FR'
                  )}</div>
              </div>
          </body>
          </html>
        `,
    },
    {
        id: 6,
        title: "Fin d'une ère",
        description: "Pour marquer la fin d'une période importante",
        category: 'creative',
        author: 'Joey Banks',
        likes: 142,
        views: 379,
        image: image6,
        defaultTitle: "La fin d'un chapitre",
        defaultContent:
            "Toutes les bonnes choses ont une fin. Ce chapitre de ma vie se termine, mais un nouveau commence. Je suis reconnaissant pour les leçons apprises, les personnes rencontrées et les expériences vécues. C'est avec émotion que je tourne cette page, prêt à écrire la suite de mon histoire.",
        htmlTemplate: (title, content) => `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Fin d'une ère</title>
              <style>
                  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
                  body {
                      margin: 0;
                      padding: 0;
                      font-family: 'Playfair Display', serif;
                      background: #111;
                      color: #eee;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh;
                      background-image: url('https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
                      background-size: cover;
                      background-position: center;
                      text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
                  }
                  .container {
                      max-width: 750px;
                      background: rgba(0, 0, 0, 0.75);
                      padding: 70px 60px;
                      border-radius: 15px;
                      border: 2px solid #fff;
                  }
                  .title {
                      font-size: 44px;
                      text-align: center;
                      margin-bottom: 50px;
                      font-weight: 700;
                      letter-spacing: 2px;
                      border-bottom: 3px solid #fff;
                      padding-bottom: 15px;
                  }
                  .content {
                      font-size: 20px;
                      line-height: 2;
                      letter-spacing: 0.8px;
                      text-align: justify;
                      white-space: pre-line;
                      color: #ddd;
                  }
                  .date {
                      margin-top: 60px;
                      text-align: right;
                      font-style: italic;
                      opacity: 0.8;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1 class="title">${title}</h1>
                  <div class="content">${content}</div>
                  <div class="date">${new Date().toLocaleDateString(
                      'fr-FR'
                  )}</div>
              </div>
          </body>
          </html>
        `,
    },
    {
        id: 7,
        title: 'Message passif-agressif',
        description: 'Quand vous partez mais voulez laisser une trace',
        category: 'personal',
        author: 'MUI',
        likes: 92,
        views: 331,
        image: image7,
        defaultTitle: "Puisque c'est comme ça...",
        defaultContent:
            "Je pensais qu'on avait quelque chose de spécial, mais visiblement je me trompais. C'est toujours intéressant de découvrir à quel point on peut se méprendre sur les gens. Bonne continuation avec vos choix, j'espère qu'ils vous mèneront là où vous le souhaitez.",
        htmlTemplate: (title, content) => `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Message</title>
              <style>
                  body {
                      font-family: 'Courier New', Courier, monospace;
                      background-color: #fff3cd;
                      margin: 0;
                      padding: 40px 20px;
                      display: flex;
                      justify-content: center;
                  }
                  .note {
                      max-width: 600px;
                      background-color: #fffbea;
                      border: 2px dashed #f0ad4e;
                      padding: 40px 35px;
                      box-shadow: 0 6px 15px rgba(240, 173, 78, 0.4);
                      transform: rotate(-3deg);
                      position: relative;
                      border-radius: 12px;
                  }
                  .pin {
                      width: 20px;
                      height: 20px;
                      background-color: #d9534f;
                      border-radius: 50%;
                      position: absolute;
                      top: 10px;
                      left: 50%;
                      transform: translateX(-50%);
                      box-shadow: 0 2px 2px rgba(0,0,0,0.25);
                  }
                  .title {
                      font-size: 28px;
                      margin: 20px 0 30px;
                      text-align: center;
                      font-weight: 700;
                      color: #d9534f;
                      text-transform: uppercase;
                      letter-spacing: 0.1em;
                  }
                  .content {
                      font-size: 17px;
                      line-height: 1.7;
                      white-space: pre-line;
                      color: #8a4b43;
                  }
                  .signature {
                      margin-top: 40px;
                      text-align: right;
                      font-style: italic;
                      color: #a94442;
                      font-weight: 600;
                  }
              </style>
          </head>
          <body>
              <div class="note">
                  <div class="pin"></div>
                  <h1 class="title">${title}</h1>
                  <div class="content">${content}</div>
                  <div class="signature">Au revoir.</div>
              </div>
          </body>
          </html>
        `,
    },
    {
        id: 8,
        title: 'Claquement de porte virtuel',
        description: 'Faites du bruit même en ligne',
        category: 'digital',
        author: 'Toni Gemayel',
        likes: 52,
        views: 298,
        image: image8,
        defaultTitle: 'DÉCONNEXION',
        defaultContent:
            "J'ai donné suffisamment de mon temps et de mon énergie à cet espace numérique. Il est temps pour moi de me concentrer sur le monde réel, sur des connexions authentiques plutôt que ces interactions superficielles. Ne cherchez pas à me contacter ici, je ne reviendrai pas.",
        htmlTemplate: (title, content) => `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Déconnexion</title>
              <style>
                  body {
                      background-color: #121212;
                      color: #39ff14;
                      font-family: 'Lucida Console', Monaco, monospace;
                      margin: 0;
                      height: 100vh;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      overflow: hidden;
                  }
                  .terminal {
                      width: 85%;
                      max-width: 900px;
                      background-color: #000;
                      border: 3px solid #39ff14;
                      border-radius: 10px;
                      padding: 30px 40px;
                      box-shadow: 0 0 30px #39ff14;
                      overflow-y: auto;
                      height: 80vh;
                      line-height: 1.5;
                  }
                  .title {
                      font-size: 28px;
                      font-weight: 700;
                      text-align: center;
                      margin-bottom: 30px;
                      text-transform: uppercase;
                      animation: flicker 1.5s infinite alternate;
                      letter-spacing: 3px;
                  }
                  .content {
                      font-size: 16px;
                      white-space: pre-line;
                      margin-bottom: 50px;
                  }
                  .cursor {
                      display: inline-block;
                      width: 10px;
                      height: 22px;
                      background-color: #39ff14;
                      animation: blink 1s steps(2, start) infinite;
                      margin-left: 5px;
                      vertical-align: bottom;
                  }
                  .timestamp {
                      font-size: 12px;
                      position: absolute;
                      bottom: 20px;
                      right: 30px;
                      color: #39ff14;
                      opacity: 0.7;
                      font-family: monospace;
                  }
                  @keyframes blink {
                      0%, 100% { opacity: 1; }
                      50% { opacity: 0; }
                  }
                  @keyframes flicker {
                      0%, 100% { opacity: 1; text-shadow: 0 0 8px #39ff14; }
                      50% { opacity: 0.7; text-shadow: none; }
                  }
              </style>
          </head>
          <body>
              <div class="terminal">
                  <div class="title">${title}</div>
                  <div class="content">
                      &gt; Initialisation de la déconnexion...<br />
                      &gt; Suppression des données en cours...<br />
                      &gt; Message final:<br /><br />
                      ${content}<br /><br />
                      &gt; Déconnexion complète dans 3... 2... 1...<br />
                      &gt; DÉCONNECTÉ<span class="cursor"></span>
                  </div>
                  <div class="timestamp">${new Date().toLocaleTimeString(
                      'fr-FR'
                  )} - ${new Date().toLocaleDateString('fr-FR')}</div>
              </div>
          </body>
          </html>
        `,
    },
    {
        id: 9,
        title: 'Annonce de départ en retraite',
        description: 'Un message chaleureux pour annoncer votre retraite',
        category: 'professional',
        author: 'Figma',
        likes: 500,
        views: 1200,
        image: image9,
        defaultTitle: 'Mon départ à la retraite',
        defaultContent:
            'Après de nombreuses années de travail, il est temps pour moi de tourner une page importante de ma vie. Je tiens à remercier tous mes collègues pour leur soutien et leur amitié tout au long de cette aventure professionnelle.',
        htmlTemplate: (title, content) => `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Annonce de retraite</title>
          <style>
              body {
                  font-family: 'Trebuchet MS', sans-serif;
                  background-color: #f0f4f8;
                  color: #2c3e50;
                  max-width: 700px;
                  margin: 40px auto;
                  padding: 30px;
                  border-radius: 8px;
                  box-shadow: 0 0 15px rgba(0,0,0,0.1);
              }
              h1 {
                  text-align: center;
                  font-size: 36px;
                  margin-bottom: 20px;
                  color: #27ae60;
              }
              p {
                  font-size: 18px;
                  line-height: 1.6;
                  white-space: pre-line;
              }
              .footer {
                  margin-top: 40px;
                  text-align: right;
                  font-style: italic;
                  color: #7f8c8d;
              }
          </style>
      </head>
      <body>
          <h1>${title}</h1>
          <p>${content}</p>
          <div class="footer">${new Date().toLocaleDateString('fr-FR')}</div>
      </body>
      </html>
    `,
    },
    {
        id: 10,
        title: "Fin d'une collaboration artistique",
        description:
            "Exprimer la fin d'une collaboration créative avec élégance",
        category: 'creative',
        author: 'Figma',
        likes: 320,
        views: 900,
        price: 5000,
        image: image10,
        defaultTitle: 'Clôture de notre collaboration',
        defaultContent:
            "Notre collaboration a été une source d'inspiration et de croissance. Bien que nos chemins se séparent aujourd'hui, je reste fier de ce que nous avons accompli ensemble et je vous souhaite le meilleur pour vos projets futurs.",
        htmlTemplate: (title, content) => `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Fin de collaboration artistique</title>
          <style>
              body {
                  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
                  background: #fff8f0;
                  max-width: 720px;
                  margin: 40px auto;
                  padding: 40px;
                  border: 2px solid #e67e22;
                  border-radius: 10px;
                  color: #d35400;
              }
              h1 {
                  font-size: 34px;
                  margin-bottom: 25px;
                  border-bottom: 2px solid #d35400;
                  padding-bottom: 10px;
              }
              p {
                  font-size: 18px;
                  line-height: 1.6;
                  white-space: pre-line;
              }
              .footer {
                  margin-top: 50px;
                  text-align: right;
                  font-style: italic;
                  color: #a04000;
              }
          </style>
      </head>
      <body>
          <h1>${title}</h1>
          <p>${content}</p>
          <div class="footer">${new Date().toLocaleDateString('fr-FR')}</div>
      </body>
      </html>
    `,
    },
    {
        id: 11,
        title: "Lettre d'excuses personnelle",
        description: 'Une lettre sincère pour demander pardon',
        category: 'personal',
        author: 'Figma',
        likes: 450,
        views: 1150,
        price: 15000,
        image: image11,
        defaultTitle: 'Je suis désolé(e)',
        defaultContent:
            "Je tiens à te présenter mes excuses les plus sincères. Je regrette profondément mes actions et les conséquences qu'elles ont pu avoir. J'espère que tu pourras me pardonner et que nous pourrons avancer ensemble.",
        htmlTemplate: (title, content) => `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Lettre d'excuses</title>
          <style>
              body {
                  font-family: 'Georgia', serif;
                  background-color: #f9f9f9;
                  max-width: 650px;
                  margin: 50px auto;
                  padding: 30px;
                  border: 1px solid #ccc;
                  border-radius: 10px;
                  color: #555;
              }
              h1 {
                  font-size: 30px;
                  margin-bottom: 25px;
                  text-align: center;
                  color: #7f8c8d;
              }
              p {
                  font-size: 16px;
                  line-height: 1.7;
                  white-space: pre-line;
              }
              .signature {
                  margin-top: 40px;
                  text-align: right;
                  font-style: italic;
                  color: #999;
              }
          </style>
      </head>
      <body>
          <h1>${title}</h1>
          <p>${content}</p>
          <div class="signature">Avec toute ma sincérité,</div>
      </body>
      </html>
    `,
    },
    {
        id: 12,
        title: 'Annonce de fermeture de blog',
        description:
            'Un message pour informer vos lecteurs de la fin de votre blog',
        category: 'digital',
        author: 'Joey Banks',
        likes: 200,
        views: 580,
        image: image12,
        price: 10000,
        defaultTitle: 'Merci et au revoir',
        defaultContent:
            "Après mûre réflexion, j'ai décidé de fermer ce blog. Ce fut une aventure incroyable, pleine de partage et d'apprentissages. Je remercie tous mes lecteurs pour leur fidélité et leur soutien. Ce n'est qu'un au revoir, peut-être à bientôt dans un autre espace.",
        htmlTemplate: (title, content) => `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Fermeture du blog</title>
          <style>
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background-color: #eeeeee;
                  max-width: 700px;
                  margin: 60px auto;
                  padding: 40px;
                  color: #333;
                  border-radius: 8px;
                  box-shadow: 0 0 20px rgba(0,0,0,0.1);
                  background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=20&w=1470&auto=format&fit=crop');
                  background-size: cover;
                  background-position: center;
              }
              .overlay {
                  background-color: rgba(255, 255, 255, 0.9);
                  padding: 30px;
                  border-radius: 8px;
              }
              h1 {
                  font-size: 36px;
                  color: #2c3e50;
                  margin-bottom: 20px;
                  text-align: center;
              }
              p {
                  font-size: 18px;
                  line-height: 1.6;
                  white-space: pre-line;
              }
              .footer {
                  margin-top: 40px;
                  font-style: italic;
                  color: #7f8c8d;
                  text-align: right;
              }
          </style>
      </head>
      <body>
          <div class="overlay">
              <h1>${title}</h1>
              <p>${content}</p>
              <div class="footer">${new Date().toLocaleDateString(
                  'fr-FR'
              )}</div>
          </div>
      </body>
      </html>
    `,
    },
];
