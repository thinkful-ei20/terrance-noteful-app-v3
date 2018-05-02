// 'use strict';

// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// const { MONGODB_URI } = require('../config');

// const { Note } = require('../models/note');

// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     const searchTerm = 'lady gaga';
//     let filter = {};

//     if (searchTerm) {
//       const re = new RegExp(searchTerm, 'i');
//       filter.title = { $regex: re };
//       filter.content = { $regex: re };
//     }

//     return Note.find({ $or: [{title: filter.title}, {content: filter.content}]})
//       .sort('created')
//       .then(results => {
//         console.log(results);
//       })
//       .catch(console.error);
//   })
//   .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });

// Get notes by ID
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     const id = '000000000000000000000005';

//     return Note.find({_id: id})
//       .then(results => {
//         console.log(results);
//       })
//       .catch(console.error);
//   })
//   .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });

// Create new note
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     return Note.create({
//       title: 'Test Title',
//       content: 'Test Content'
//     })
//       .then(results => {
//         console.log(results);
//       })
//       .catch(console.error);
//   })
//   .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });

// Find note by ID and update note
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     const objectId = '000000000000000000000005';
//     return Note.findByIdAndUpdate(objectId,
//       {title: 'New New Title'},
//       {upsert: true, new: true}
//     )
//       .then(results => {
//         console.log(results);
//       })
//       .catch(console.error);
//   })
//   .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });

// Delete note by ID
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     const objectId = '000000000000000000000005';

//     return Note.findByIdAndRemove(objectId, {select: 'title'})
//       .then((results) => {
//         console.log(results);
//       })
//       .catch(console.error);
//   })
//   .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });