const fun = require('../utils/functions');

async function genderGet(req) {
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;

    if (veriftoken.id_user > 0) {
        data = await fun.selectDb("SELECT * FROM gender WHERE active = 1 ORDER BY id_gender ASC;");
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function genderCreate(req) {
    const gender = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;

    if (gender.name && gender.image && veriftoken.id_user > 0) {
        data = await fun.insupdelDb("INSERT INTO `gender` (`name`, `image`, `active`) VALUES ('" + gender.name + "', '" + gender.image + "', '1');")
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function genderUpdate(req) {
    const gender = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;

    if (gender.id_gender && gender.name && gender.image && veriftoken.id_user > 0) {
        data = await fun.insupdelDb("UPDATE `gender` SET `name`='" + gender.name + "', `image`='" + gender.image + "' WHERE  `id_gender`= " + gender.id_gender + ";");
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function genderDelete(req) {
    const gender = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;
    if (veriftoken.id_user > 0 && gender.id_gender) {
        data = await fun.insupdelDb("UPDATE `gender` SET `active`='0' WHERE  `id_gender`= " + gender.id_gender + ";");
    } else {
        data = 'Error Payload!';
    }
    return data;
}

module.exports = {
    genderGet,
    genderCreate,
    genderUpdate,
    genderDelete
}