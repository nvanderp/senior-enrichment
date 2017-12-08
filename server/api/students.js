'use strict';

const express = require('express');
const router = new express.Router();
const Student = require('../db/models/Student');
module.exports = router;

router.get('/', (req, res, next) => {
    Student.findAll()
        .then(students => res.json(students))
        .catch(next);
});

router.get('/:studentId', (req, res, next) => {
    Student.findById(req.params.studentId)
        .then(student => res.json(student))
        .catch(next);
});

router.post('/', (req, res, next) => {
    Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gpa: req.body.gpa,
        campusId: req.body.campusId
    })
        .then(student => res.json(student))
        .catch(next);
});

router.put('/:studentId', (req, res, next) => {
    Student.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gpa: req.body.gpa,
        campusId: req.body.campusId
    }, {
        where: {
            id: req.params.studentId
        },
        returning: true,
        plain: true
    })
        .then(updatedStudent => res.json(updatedStudent))
        .catch(next);
});

router.delete('/:studentId', (req, res, next) => {
    Student.destroy({
        where: {
            id: req.params.studentId
        }
    })
        .then(() => res.status(204).end())
        .catch(next);
});