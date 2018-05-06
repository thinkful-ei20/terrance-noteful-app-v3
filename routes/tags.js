'use strict';

// import express
const express = require('express');
// import router from express
const router = express.Router();

// import mongoose
const mongoose = require('mongoose');

// import notes, and tags
const { Note } = require('../models/note');
const { Tag } = require('../models/tag');

// get all tags
router.get('/', (req, res, next) => {
  Tag.find()
    .sort('name')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// get a single tag
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('Not a valid id');
    err.status = 400;
    return next(err);
  }

  Tag.findById(id)
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// create a single tag
router.post('/', (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const err = new Error('Missing `name` in the request body');
    err.status = 400;
    return next(err);
  }

  const newObj = {
    name
  };

  Tag.create(newObj)
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('Tag `name` already exists');
        err.status = 400;
      }
      next(err);
    });
});

// update a single tag
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  const updateTag = { name };

  Tag.findByIdAndUpdate(id, updateTag, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('Tag name already exists');
        err.status = 400;
      }
      next(err);
    });
});

// delete a single tag
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  Tag.findByIdAndRemove(id)
    .then(() => {
      Note.remove({ tags: id }, function(err) {
        if (err) return next(err);
      });
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => next(err));
});

// export tags
module.exports = router;
