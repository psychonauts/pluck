const { getTagsByPlantId, getPlantFavoriteStatus } = require('../../database/index');

module.exports.tagsForAllPlants = (plants, callback) => {
  let plantsRemaining = plants.length;
  return plants.map(plant => getTagsByPlantId(plant.id, (err, tags) => {
    plantsRemaining -= 1;
    if (err) {
      callback(err);
    }
    plant.tags = tags;
    if (plantsRemaining === 0) callback(null, plants);
  }));
};

module.exports.getPlantsFavoriteStatus = (plants, userId, callback) => {
  let plantsRemaining = plants.length;
  return plants.map((plant) => {
    return getPlantFavoriteStatus(plant, userId, (err, fave) => {
      plantsRemaining -= 1;
      if (err) callback(err);
      else if (fave.length) {
        plant.favorite = true;
      } else {
        plant.favorite = false;
      }
      if (plantsRemaining === 0) callback();
    });
  });
}