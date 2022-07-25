const fun = require('../utils/functions');

async function unionGet(req) {
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;

    if (veriftoken.id_user > 0) {
        data = await fun.selectDb("SELECT * FROM union_movies_characters WHERE active = 1 ORDER BY id_union ASC;");
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function unionCreate(req) {
    const union = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;

    if (union.id_movie && union.id_character && veriftoken.id_user > 0) {
        data = await fun.insupdelDb("INSERT INTO `union_movies_characters` (`id_movie`, `id_character`, `active`) VALUES (" + union.id_movie + ", " + union.id_character + ", '1');")
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function unionUpdate(req) {
    const union = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;

    if (union.id_union && union.id_movie && union.id_character && veriftoken.id_user > 0) {
        data = await fun.insupdelDb("UPDATE `union_movies_characters` SET `id_movie`=" + union.id_movie + ", `id_character`=" + union.id_character + " WHERE  `id_union`=" + union.id_union + ";");
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function unionDelete(req) {
    const union = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;
    if (veriftoken.id_user > 0 && union.id_union) {
        data = await fun.insupdelDb("UPDATE `union_movies_characters` SET `active`='0' WHERE  `id_union`=" + union.id_union + ";");
    } else {
        data = 'Error Payload!';
    }
    return data;
}


module.exports = {
    unionGet,
    unionCreate,
    unionUpdate,
    unionDelete
}