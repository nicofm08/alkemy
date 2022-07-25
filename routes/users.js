const express = require('express');
const router = express.Router();
const crud = require('../cruds/users_crud');

router.post('/', async (req, res) => {
    let data = await crud.usersCreate(req);
    res.json(data);
})

module.exports = router;