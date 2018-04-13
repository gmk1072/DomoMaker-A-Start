const models = require('../models');

const Bookmark = models.Bookmark;

const makeBookmark = (req, res) => {
  if (!req.body.name || !req.body.url) {
    return res.status(400).json({ error: 'Both name and url are required' });
  }

  const BookmarkData = {
    name: req.body.name,
    url: req.body.url,
    owner: req.session.account._id,
  };

  const newBookmark = new Bookmark.BookmarkModel(BookmarkData);

  const BookmarkPromise = newBookmark.save();

  BookmarkPromise.then(() => res.json({ redirect: '/maker' }));

  BookmarkPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Bookmark already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return BookmarkPromise;
};

const makerPage = (req, res) => {
  Bookmark.BookmarkModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), bookmarks: docs });
  });
};

const getBookmarks = (request, response) => {
  const req = request;
  const res = response;
  return Bookmark.BookmarkModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred' });
    }
    return res.json({ bookmarks: docs });
  });
};
const getAccountData = (request, response) => {
  const req = request;
  const res = response;


  let len;
  return Bookmark.BookmarkModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);

      return res.status(400).json({ error: 'An error occurred' });
    }
    len = Object.keys(docs).length;
    return res.json({ username: req.session.account.username, numBookmarks: len });
  });


    /*
    return Bookmark.BookmarkModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'an error occurred' });
        }
        const len = Object.keys(docs).length;
        return res.json({username: req.session.account.username, numBookmarks: len});
    });
    */
};

const updateBookmark = (request, response) => {
  const req = request;
  const res = response;
  if (!req.body.name || !req.body.url) {
    return res.status(400).json({ error: 'Both name and url are required' });
  }
  const body = {
    name: req.body.name,
    url: req.body.url,
  };
  Bookmark.BookmarkModel.updateBookmark(req.session.account._id, req.body.id, body, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred' });
    }
    return res.json({ bookmarks: docs });
  });

  return false;
    /*
    const BookmarkData = {
        name: req.body.name,
        url: req.body.url,
        owner: req.session.account._id,
    };
    const newBookmark = new Bookmark.BookmarkModel(BookmarkData);
    const BookmarkPromise = newBookmark.save();
    BookmarkPromise.then(() => res.json({ redirect: '/maker' }));
    BookmarkPromise.catch((err) => {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Bookmark already exists.' });
        }
        return res.status(400).json({ error: 'An error occurred' });
    });
    return BookmarkPromise;*/
};

const deleteBookmark = (request, response) => {
  const req = request;
  const res = response;
  Bookmark.BookmarkModel.deleteBookmark(req.session.account._id, req.body.id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred' });
    }
    return res.json({ bookmarks: docs });
  });
};
module.exports.makerPage = makerPage;
module.exports.make = makeBookmark;
module.exports.getBookmarks = getBookmarks;
module.exports.deleteBookmark = deleteBookmark;
module.exports.updateBookmark = updateBookmark;
module.exports.getAccountData = getAccountData;
