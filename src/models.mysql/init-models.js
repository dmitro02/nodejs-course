var DataTypes = require("sequelize").DataTypes;
var _Event = require("./Event");
var _Participant = require("./Participant");
var _User = require("./User");

function initModels(sequelize) {
  var Event = _Event(sequelize, DataTypes);
  var Participant = _Participant(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  Event.belongsTo(User, { foreignKey: "creator_id"});
  User.hasMany(Event, { foreignKey: "creator_id"});
  Participant.belongsTo(User, { foreignKey: "user_id"});
  User.hasMany(Participant, { foreignKey: "user_id"});
  Participant.belongsTo(Event, { foreignKey: "event_id"});
  Event.hasMany(Participant, { foreignKey: "event_id"});

  return {
    Event,
    Participant,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
