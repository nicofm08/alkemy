const express = require('express');
const router = express.Router();
const crud = require('../cruds/movies_crud');

router.get('/', async (req, res) => {
    let data = await crud.moviesGet(req);
    res.json(data);
})

router.get('/details', async (req, res) => {
    let data = await crud.moviesDetailsGet(req);
    res.json(data);
})

router.post('/', async (req, res) => {
    let data = await crud.moviesCreate(req);
    res.json(data);
})

router.put('/', async (req, res) => {
    let data = await crud.moviesUpdate(req);
    res.json(data);
})

router.delete('/', async (req, res) => {
    let data = await crud.moviesDelete(req);
    res.json(data);
})

module.exports = router;