const controllers = require('./controllers');
const mid = require('./middleware');
const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getBookmarks', mid.requiresLogin, controllers.Bookmark.getBookmarks);
  app.get('/getAccountData', mid.requiresLogin, controllers.Bookmark.getAccountData);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/account', mid.requiresSecure, mid.requiresLogin, controllers.Account.accountPage);
    // app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.Bookmark.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Bookmark.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.delete('/deleteBookmark', mid.requiresLogin, controllers.Bookmark.deleteBookmark);
  app.post('/updateBookmark', mid.requiresLogin, controllers.Bookmark.updateBookmark);
  app.get('/updatePassword', mid.requiresSecure, mid.requiresLogin,
            controllers.Account.updatePasswordPage);
  app.post('/updatePassword', mid.requiresSecure, mid.requiresLogin,
             controllers.Account.updatePassword);
  app.get('/pricing', mid.requiresSecure, mid.requiresLogin, controllers.Account.pricingPage);
  app.get('*', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
