'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

const Folder = mongoose.model('Folder', folderSchema);

folderSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = { Folder };
