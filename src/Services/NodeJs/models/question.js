var Mongoose   = require('mongoose');
var Schema     = Mongoose.Schema;

var questionSchema = new Schema({
  text : { type: String, required: true},
  category : {type: String, required: true},
  questions : [{ type : Mongoose.Schema.ObjectId, ref : 'questions' }]
});

var question = Mongoose.model('question', questionSchema, 'question');

module.exports = {
  Question: question
};

