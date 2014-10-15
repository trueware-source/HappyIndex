var Mongoose   = require('mongoose');
var Schema     = Mongoose.Schema;

var pollingStationScehma = new Schema({
  Name : { type: String, required: true, trim: true }
});

var pollingStation = Mongoose.model('pollingStation', pollingStationScehma, 'pollingStation');

module.exports = {
  PollingStation: pollingStation
};