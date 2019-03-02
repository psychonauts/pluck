const { getTagsByPlantId } = require('../../database/index');

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
