'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: String
}, {
  timestamps: true
});

const Note = mongoose.model('Note', NotesSchema);

module.exports = { Note };