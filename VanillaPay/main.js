const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const utils = require('./vanillapay-modules/utils');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9002;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route principale
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API Vanilla Pay' });
});

app.get('/api/notification', (req, res) => {
    console.log("Req notif ");
    console.log(JSON.stringify(req));
    res.json({ message: 'Vanilla Pay Notification' });
});

// Route pour initialiser un paiement
app.post('/api/init-payment', async (req, res) => {
    try {
        // Récupérer les paramètres du corps de la requête
        const {
            unitemonetaire,
            adresseip,
            idpanier,
            montant,
            nom,
            email,
            reference
        } = req.body;

        // Vérifier que tous les paramètres requis sont présents
        if (!unitemonetaire || !adresseip || !idpanier || !montant || !nom || !email || !reference) {
            return res.status(400).json({ 
                success: false, 
                message: 'Tous les paramètres sont requis: unitemonetaire, adresseip, idpanier, montant, nom, email, reference' 
            });
        }

        // Préparer les paramètres pour l'initialisation du paiement
        const paymentParams = {
            unitemonetaire,
            adresseip,
            idpanier,
            montant,
            nom,
            email,
            reference
        };

        // Envoyer la requête à Vanilla Pay
        const paymentId = await utils.send('https://pro.ariarynet.com/api/paiements', paymentParams);

        if(paymentId) {
            // Construire l'URL de redirection
            const redirectUrl = `https://moncompte.ariarynet.com/payer/${paymentId}`;

            // Renvoyer la réponse
            return res.json({
                success: true,
                paymentId,
                redirectUrl
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Une erreur s\'est produite lors de la création du paiement',
                error: error.message
            });
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du paiement:');
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de l\'initialisation du paiement',
            error: error.message
        });
    }
});

// Route pour recevoir les notifications de paiement
app.post('/api/payment-notification', (req, res) => {
    try {
        const encryptedData = req.body;
        
        // Décrypter les données reçues
        const decryptedData = utils.decrypt3DES(encryptedData, process.env.PRIVATE_KEY);
        const paymentResult = JSON.parse(decryptedData);
        
        // Traiter le résultat du paiement
        console.log('Résultat du paiement:', paymentResult);
        
        // Vérifier le succès du paiement
        if (paymentResult.resultat === 'success') {
            // Mettre à jour votre base de données ou effectuer d'autres opérations
            console.log('Paiement réussi pour la référence:', paymentResult.ref_int);
        } else {
            console.log('Échec du paiement pour la référence:', paymentResult.ref_int);
        }
        
        // Répondre à Vanilla Pay
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Erreur lors du traitement de la notification de paiement:', error);
        return res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors du traitement de la notification',
            error: error.message
        });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port http://localhost:${PORT}`);
});
