const express = require('express');
const router = express.Router();
const crud = require('../cruds/login_crud');

router.post('/', async (req, res) => {
    let data = await crud.login(req);
    res.json(data);
})

module.exports = router;