const fun = require('../utils/functions');

async function charactersGet(req) {
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;
    let name = req.query.name;
    let age = req.query.age;
    let id_movie = req.query.idmovie;
    let query = "SELECT id_character, name, image FROM `character` WHERE ACTIVE = 1"

    if (veriftoken.id_user > 0) {
        if (name) {
            query = + " and name like '%" + name + "%';"
        } else if (age) {
            query = + " and age = '" + age + "';"
        } else if (id_movie) {
            query = "SELECT c.id_character, c.name, c.image FROM `character` AS c , union_movies_characters AS u WHERE c.id_character = u.id_character AND u.id_movie = " + id_movie + ""
        }
        data = await fun.selectDb(query)
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function charactersDetailsGet(req) {
    const character = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;
    if (veriftoken.id_user > 0 && character.id_character) {
        data = await fun.selectDb("SELECT c.date_creation AS 'character_creation', c.image AS 'character_image', c.name AS 'character_name', c.age, c.history, c.active , m.date_creation, m.`type`, m.image,m.title,m.calification,m.active, g.name AS 'gender_name',g.image AS 'image_gender'  FROM `character` AS c , union_movies_characters AS u, movies_series AS m, gender AS g WHERE c.id_character = u.id_character AND u.id_movie = m.id_movie_series AND m.id_gender = g.id_gender AND  c.id_character = " + character.id_character + " AND c.active = 1 AND m.active = 1 AND g.active = 1;")
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function charactersCreate(req) {
    const character = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;

    if (character.image && character.name && character.age && character.history && veriftoken.id_user > 0) {
        data = await fun.insupdelDb("INSERT INTO `character`(date_creation,image,name,age,history,active)  VALUE (NOW(),'" + character.image + "','" + character.name + "'," + character.age + ",'" + character.history + "',1);")
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function charactersUpdate(req) {
    const character = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;

    if (character.image && character.name && character.age && character.history && veriftoken.id_user > 0) {
        data = await fun.insupdelDb("UPDATE `character` SET `image`='" + character.image + "', `name`='" + character.name + "', `age`='" + character.age + "', `history`='" + character.history + "' WHERE  `id_character`=" + character.id_character + ";");
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function charactersDelete(req) {
    const character = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;
    if (veriftoken.id_user > 0 && character.id_character) {
        data = await fun.insupdelDb("UPDATE `character` SET `date_deleted`= NOW(), `active`= 0  WHERE  `id_character`= " + character.id_character + " AND `active`= 1 ;");
    } else {
        data = 'Error Payload!';
    }
    return data;
}

module.exports = {
    charactersGet,
    charactersDetailsGet,
    charactersCreate,
    charactersUpdate,
    charactersDelete

}