const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let BookmarkModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const BookmarkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  url: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

BookmarkSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  url: doc.url,
});

BookmarkSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return BookmarkModel.find(search).select('name url').exec(callback);
};

BookmarkSchema.statics.deleteBookmark = (ownerId, id, callback) =>
  /*
  const search = {
    owner: convertId(ownerId),
  };
  /*
  */
   BookmarkModel.findByIdAndRemove({ _id: id }, callback)
  // return BookmarkModel.findOneAndRemove(search).remove({ _id: id }).exec(callback);
;

BookmarkSchema.statics.updateBookmark = (ownerId, id, body, callback) => {
  const search = {
    owner: convertId(ownerId),
    _id: id,
  };
  return BookmarkModel.findOneAndUpdate(search, { name: body.name, url: body.url }, callback);
};

BookmarkModel = mongoose.model('Bookmark', BookmarkSchema);

module.exports.BookmarkModel = BookmarkModel;
module.exports.BookmarkSchema = BookmarkSchema;
