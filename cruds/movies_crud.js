const fun = require('../utils/functions');

async function moviesGet(req) {
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;
    let query;
    let name = req.query.name;
    let genre = req.query.genre;
    let order = req.query.order;

    if (veriftoken.id_user > 0) {

        if (order != "ASC") {
            order = "DESC"
        } else {
            order = "ASC"
        }

        if (name) {
            query = "SELECT m.id_movie_series, m.date_creation, m.image, m.title FROM movies_series AS m, gender AS g  WHERE m.active = 1 AND m.id_gender= g.id_gender AND m.title LIKE '%" + name + "%' ORDER BY id_movie_series " + order
        } else if (genre) {
            query = "SELECT m.id_movie_series, m.date_creation, m.image, m.title FROM movies_series AS m, gender AS g  WHERE m.active = 1 AND m.id_gender= g.id_gender AND  g.id_gender = " + genre + " ORDER BY id_movie_series " + order
        } else {
            query = "SELECT id_movie_series, date_creation, image, title FROM movies_series WHERE ACTIVE = 1 ORDER BY id_movie_series " + order
        }
        data = await fun.selectDb(query);
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function moviesDetailsGet(req) {
    const movies = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;

    if (veriftoken.id_user > 0 && movies.id_movie) {
        data = await fun.selectDb("SELECT c.date_creation AS 'character_creation', c.image AS 'character_image', c.name AS 'character_name', c.age, c.history, c.active , m.date_creation, m.`type`, m.image,m.title,m.calification,m.active, g.name AS 'gender_name',g.image AS 'image_gender'  FROM `character` AS c , union_movies_characters AS u, movies_series AS m, gender AS g WHERE c.id_character = u.id_character AND u.id_movie = m.id_movie_series AND m.id_gender = g.id_gender AND  m.id_movie_series = " + movies.id_movie + " AND c.active = 1 AND m.active = 1 AND g.active = 1;");
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function moviesCreate(req) {
    const movies = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;

    if (movies.type && movies.id_gender && movies.image && movies.title && movies.calification && veriftoken.id_user > 0) {
        data = await fun.insupdelDb("INSERT INTO movies_series (date_creation,`type`,id_gender,image,title,calification,active) VALUE (NOW(),'" + movies.type + "'," + movies.id_gender + ",'" + movies.image + "','" + movies.title + "'," + movies.calification + ",1);")
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function moviesUpdate(req) {
    const movies = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;

    if (movies.id_movie_Series && movies.title && movies.image && movies.type && movies.id_gender && veriftoken.id_user > 0) {
        data = await fun.insupdelDb("UPDATE `movies_series` SET `type`='" + movies.type + "', `id_gender`='" + movies.id_gender + "', `image`='" + movies.image + "', `title`='" + movies.title + "', `calification`='" + movies.calification + "' WHERE  `id_movie_Series`=" + movies.id_movie_Series + ";");
    } else {
        data = 'Error Payload!';
    }
    return data;
}

async function moviesDelete(req) {
    const movies = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;
    if (veriftoken.id_user > 0 && movies.id_movie_series) {
        data = await fun.insupdelDb("UPDATE `movies_series` SET `date_deleted`= NOW(), `active`= 0  WHERE  `id_movie_series`= " + movies.id_movie_series + " AND `active`= 1;");
    } else {
        data = 'Error Payload!';
    }
    return data;
}

module.exports = {
    moviesGet,
    moviesDetailsGet,
    moviesCreate,
    moviesUpdate,
    moviesDelete

}