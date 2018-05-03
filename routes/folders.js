'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const { Folder } = require('../models/folder');
const { Note } = require('../models/note');

/* ========== GET/READ ALL FOLDERS ========== */
router.get('/', (req, res, next) => {
  const searchTerm = req.query.searchTerm;
  let filter = {};

  if (searchTerm) {
    const re = new RegExp(searchTerm, 'i');
    filter.name = { $regex: re };
  }

  Folder.find(filter)
    .sort('name')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== GET/READ A SINGLE FOLDER ========== */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('Not a valid id');
    err.status = 400;
    return next(err);
  }

  Folder.findById(id)
    .then(results => {
      if (results) {
        res.json(results);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = {
    name
  };

  Folder.create(newItem)
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The folder name already exists');
        err.status = 400;
      }
      next(err);
    });
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  Folder.findByIdAndUpdate(id, updateObj, { new: true })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The folder name aleady exists');
        err.status = 400;
      }
      next(err);
    });
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  Folder.findByIdAndRemove(id)
    .then(() => {
      Note.remove({ folder: id }, function(err) {
        if (err) return next(err);
      });
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => next(err));
});

module.exports = router;
