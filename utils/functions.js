const db = require('../database/mysql');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtsign = 'FirM4_3j3mpl0_T3xt0!';
const saltRounds = 10;

/* TOKEN FUNCTIONS*/

function signToken(information) {
    let token = jwt.sign(information, jwtsign);
    return token;
}

function verifyToken(token) {
    let verify = jwt.verify(token, jwtsign);
    return verify;
}

async function updateTokenLogin(id_user, token) {
    let data = await insupdelDb("UPDATE `users` SET `token`='" + token + "' WHERE  `id_user`= " + id_user + " and active = '1';");
    return data;
}

async function verifyTokenLogin(token) {
    let data = await selectDb("SELECT id_user FROM users WHERE token = '" + token + "' AND active = '1';");
    return data;
}


/* ENCRYPT FUNCTIONS*/

function encryptPassLogin(passplain) {
    pass = bcrypt.hashSync(passplain, saltRounds);
    return pass;
}

function decryptPassLogin(passplain, encryptpass) {
    pass_status = bcrypt.compareSync(passplain, encryptpass, saltRounds);
    return pass_status;
}


/* DB FUNCTIONS*/
async function selectDb(queryp) {
    let data = "";
    try {
        data = await db.query(queryp, { type: db.QueryTypes.SELECT });
    } catch (error) {
        data = error.errors[0].message
    }
    return data;
}

async function insupdelDb(queryp) {
    let data = "";
    try {
         data = await db.query(queryp);
    } catch (error) {
        data = error.errors[0].message
    }
    return data;
}

/* AXIOS POST*/
async function httpPost(url, payload, token) {
    let res
    let data
    try {
        const config = {
            method: 'POST',
            url: url,
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + token },
            body: payload
        }
    
        res = await axios(config,payload);
        data = res.data;
    } catch (error) {
        console.log('Error HTTP POST: ' + error.code)
    }

    return data
}


/* SendGrid Email Sender*/
async function sendEmail(to, body){
    let token = "TOKEN SEND GRID"
    payload = '{"personalizations":[{"to":[{"email":"' + to +'","name":""}],"subject":"Disney Alkemy!"}],"content": [{"type": "text/plain", "value": "' + body +'"}],"from":{"email":"sam.smith@example.com","name":"Sam Smith"},"reply_to":{"email":"sam.smith@example.com","name":"Sam Smith"}}'
    let response = await httpPost("https://api.sendgrid.com/v3/mail/send",payload,token)
    return response
}

module.exports = {
    updateTokenLogin,
    encryptPassLogin,
    decryptPassLogin,
    signToken,
    verifyToken,
    selectDb,
    insupdelDb,
    verifyTokenLogin,
    sendEmail,
    httpPost
}