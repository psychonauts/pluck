const algoliasearch = require('algoliasearch');
const { getAllTags } = require('../../database/index');

const client = algoliasearch('S218GIN4YW', process.env.ALGOLIA_ADMIN_KEY);
const index = client.initIndex('tags');

module.exports.sendTags = (callback) => {
  getAllTags((err, tags) => {
    if (err) {
      return callback(err);
    }
    return index.addObjects(tags, callback);
  });
};
