'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagsSchema = new Schema(
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

const Tag = mongoose.model('Tag', tagsSchema);

tagsSchema.set('toObject', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = { Tag };
