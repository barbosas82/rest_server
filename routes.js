module.exports = function(app){
  //Authentication libs
  var passport = require('passport');
  app.use(passport.initialize());
  var oauth2 = require('./libs/oauth2');
  require('./libs/auth');
  app.post('/oauth/token', oauth2.token);


   /**********************************************
   ******    METHODS FOR WANTLIST / ARTIST   *****
   **********************************************/
  var artists = require('./controllers/artists');

  app.post('/wantlist',
          passport.authenticate('bearer', { session: false }),
          artists.add
  );

  app.get('/wantlist',
          passport.authenticate('bearer', { session: false }),
          artists.findAll
  );

  app.put('/wantlist/:id',
          passport.authenticate('bearer', { session: false }),
          artists.update
  );

  app.delete('/wantlist/:id',
          passport.authenticate('bearer', { session: false }),
          artists.delete
  );




  /***********************************************
   ******       TEST AND ADMIN METHODS       *****
   ***********************************************/

  //Test Method for authenticated user
  app.get('/api/userInfo',
      passport.authenticate('bearer', { session: false }),
          function(req, res) {
              // req.authInfo is set using the `info` argument supplied by
              // `BearerStrategy`.  It is typically used to indicate a scope of the token,
              // and used in access control checks.  For illustrative purposes, this
              // example simply returns the scope in the response.
              res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
          }
  );

  //Admin method to add user
  var users = require('./controllers/user');
  app.post('/useradd', passport.authenticate('bearer', { session: false }), users.add);
  app.get('/listuser/:username', users.listOne);

  //Admin method to add client
  var clients = require('./controllers/client');
  app.post('/clientadd', passport.authenticate('bearer', { session: false }), clients.add);
}
