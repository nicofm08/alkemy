const express = require('express');
const router = express.Router();
const crud = require('../cruds/gender_crud');

router.get('/', async (req, res) => {
    let data = await crud.genderGet(req);
    res.json(data);
})

router.post('/', async (req, res) => {
    let data = await crud.genderCreate(req);
    res.json(data);
})

router.put('/', async (req, res) => {
    let data = await crud.genderUpdate(req);
    res.json(data);
})

router.delete('/', async (req, res) => {
    let data = await crud.genderDelete(req);
    res.json(data);
})

module.exports = router;