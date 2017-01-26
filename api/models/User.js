var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    nom: {
      type: 'string',
      required: false
    },
    prenom: {
      type: 'string',
      required: false
    },
    addresses: {
      collection: 'address',
      type: 'string',
      required: false,
      via: 'owner'
    },
    avatarUrl: {
      type: 'string',
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  }
};
