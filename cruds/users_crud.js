const fun = require('../utils/functions');

async function usersCreate(req) {
    const user = req.body;
    let data;
    if (user.fullname && user.email && user.pass) {
        let pass = fun.encryptPassLogin(user.pass);
        data = await fun.insupdelDb("INSERT INTO `users` (`date_creation`, `fullname`, `email`, `pass`, `active`) VALUES (NOW(),'" + user.fullname + "', '" + user.email + "',  '" + pass + "', 1);");
        email_send = await fun.sendEmail(user.email, "Welcome To Disney, Looks this example welcome Email")
    } else {
        data = 'Error Payload!';
    }
    return data;
}

module.exports = { usersCreate }