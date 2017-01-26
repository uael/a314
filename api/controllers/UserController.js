/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var path= require('path');

module.exports = {
  perso: function (req, res){
    return res.view('perso');
  },
  moncompte: function (req, res){
    var data ={};

    data.user = req.user;

    data.mesdata ={
      title : "Mon compte",
      content : "Vous trouverez ici les informations de votre compte",
    };

    User.findOne(req.user.id).populate('addresses').exec(function(err,user){
      console.log(user);
      data.user = user;
      return res.view('perso',data);
    });
  },

  /**
   * Upload avatar for currently logged-in user
   *
   * (POST /user/avatar/)
   */
  uploadAvatar: function (req, res) {

    req.file('avatar').upload({
        dirname: resolve(sails.config.appPath, 'assets/images/avatars')
      },

      function (err, uploadedFiles) {
        if (err) return res.negotiate(err);

        return res.json({
          message: uploadedFiles.length + ' file(s) uploaded successfully!'
        });
      });

    // don't allow the total upload size to exceed ~10MB
    function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }


      // Save the "fd" and the url where the avatar for a user can be accessed
      User.update(req.session.me, {

        // Generate a unique URL where the avatar can be downloaded.
        avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.me),

        // Grab the first file and use it's `fd` (file descriptor)
        avatarFd: uploadedFiles[0].fd
      })
        .exec(function (err){
          if (err) return res.negotiate(err);
          return res.ok();
        });
    };


  }

};
