const express = require('express');
const router = express.Router();
const crud = require('../cruds/union_mov_char_crud');

router.get('/', async (req, res) => {
    let data = await crud.unionGet(req);
    res.json(data);
})

router.post('/', async (req, res) => {
    let data = await crud.unionCreate(req);
    res.json(data);
})

router.put('/', async (req, res) => {
    let data = await crud.unionUpdate(req);
    res.json(data);
})

router.delete('/', async (req, res) => {
    let data = await crud.unionDelete(req);
    res.json(data);
})

module.exports = router;