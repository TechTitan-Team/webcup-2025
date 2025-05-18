const crypto = require("crypto"); //npm install crypto
const axios = require('axios'); // npm install axios

function encrypt3DES(data, key) {
    try {
        let des_iv = Buffer.from("0000000000000000", 'hex');
        let cipher = crypto.createCipheriv('des-ede3-cbc', Buffer.from(key.substr(0, 24)), des_iv);
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    } catch (e) {
        console.log(e)
    }
}

function decrypt3DES(data, key) {
    try {
        let des_iv = Buffer.from("0000000000000000", 'hex');
        let encryptedText = Buffer.from(data, 'hex');
        let decipher = crypto.createDecipheriv('des-ede3-cbc', Buffer.from(key.substr(0, 24)),
            des_iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (e) {
    }
}

//recuperation du token
async function getAccess() {
    let client_id = process.env.CLIENT_ID;
    let client_secret = process.env.CLIENT_SECRET;
    let param = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'client_credentials'
    };

    return await axios({
        method: 'post',
        url: "https://pro.ariarynet.com/oauth/v2/token",
        data: param
    }).then(response => {
        return response.data.access_token;
    }).catch(error => {
    });
}

module.exports = {
    decrypt3DES(data, key) {
        try {
            let des_iv = Buffer.from("0000000000000000", 'hex');
            let encryptedText = Buffer.from(data, 'hex');
            let decipher = crypto.createDecipheriv('des-ede3-cbc', Buffer.from(key.substr(0, 24)),
                des_iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        } catch (e) {
        }
    },

    //initialisation du paiement
    async send(url, params_to_send) {
        let publicKey = process.env.PUBLIC_KEY;
        let privateKey = process.env.PRIVATE_KEY;

        let params_crypt = encrypt3DES(JSON.stringify(params_to_send), publicKey);
        let site_url = process.env.SITE_URL;

        let params = {
            "site_url": site_url,
            "params": params_crypt
        };

        let headers = {
            "Authorization": "Bearer " + await getAccess(),
            "Access-Control-Allow-Origin": "*"
        }
        return await axios({
            method: 'post',
            url: url,
            data: params,
            headers: headers
        }).then(response => {
            let id_encrypted = response.data;
            let id_decrypted = decrypt3DES(id_encrypted, privateKey);
            return id_decrypted;
            //redirection vers "https://moncompte.ariarynet.com/payer/{id_decrypted}"
        }).catch(error => {
            console.log(error)
        });
    }
}