const express = require('express');
const router = express.Router();
const crud = require('../cruds/characters_crud');

router.get('/', async (req, res) => {
    let data = await crud.charactersGet(req);
    res.json(data);
})

router.get('/details', async (req, res) => {
    let data = await crud.charactersDetailsGet(req);
    res.json(data);
})

router.post('/', async (req, res) => {
    let data = await crud.charactersCreate(req);
    res.json(data);
})

router.put('/', async (req, res) => {
    let data = await crud.charactersUpdate(req);
    res.json(data);
})

router.delete('/', async (req, res) => {
    let data = await crud.charactersDelete(req);
    res.json(data);
})

module.exports = router;
