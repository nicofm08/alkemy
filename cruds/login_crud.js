const fun = require('../utils/functions');

async function login(req) {
    const username = req.body.username;
    const password = req.body.password;
    let result;
    let data = await fun.selectDb("SELECT * FROM users WHERE email = '" + username + "' AND active = 1;");
    let resultlenght = Object.getOwnPropertyNames(data);
    if (resultlenght.length > 1) {
        let id_userp = data[0].id_user;
        let fullnamep = data[0].fullname;
        let emailp = data[0].email;
        let passp = data[0].pass;
        const passdecrypt = fun.decryptPassLogin(password, passp);
        if (passdecrypt) {
            let token = fun.signToken({ id_user: id_userp, fullname: fullnamep, email: emailp });
            
            //This function update the token to prevent multiple sessions
            fun.updateTokenLogin(id_userp, token);
            
            result = { login_token: token };
        } else {
            result = { error: "Incorrect Password" };
        }
    } else {
        result = { error: "Incorrect User" };
    }
    return result;
}

module.exports = { login }