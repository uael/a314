module.exports = {

  attributes: {
    ligne1: {
      type: 'string',
    },

    ligne2: {
      type: 'string',
    },

    ville: {
      type: 'string',
    },

    pays: {
      type: 'string',
    },

    codePostal: {
      type: 'int',
    },

    owner: {
      model: 'user'
    },
  },
};
