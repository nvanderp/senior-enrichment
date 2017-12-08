'use strict';

const express = require('express');
const router = new express.Router();
const Campus = require('../db/models/Campus');
module.exports = router;

router.get('/', (req, res, next) => {
    Campus.findAll()
        .then(campuses => res.json(campuses))
        .catch(next);
});

router.get('/:campusId', (req, res, next) => {
    Campus.findById(req.params.campusId)
        .then(campus => res.json(campus))
        .catch(next);
});

router.post('/', (req, res, next) => {
    Campus.create({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.desc
    })
        .then(campus => res.json(campus))
        .catch(next);
});

router.put('/:campusId', (req, res, next) => {
    console.log(req.body)
    Campus.update({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.desc
    }, {
        where: {
            id: req.params.campusId
        },
        returning: true,
        plain: true
    })
        .then(updatedCampus => res.json(updatedCampus))
        .catch(next);
});

router.delete('/:campusId', (req, res, next) => {
    Campus.destroy({
        where: {
            id: req.params.campusId
        }
    })
        .then(() => res.status(204).end())
        .catch(next);
});