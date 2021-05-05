var mongoose = require('mongoose');
 
var questionSchema = new mongoose.Schema({
    question: String,
    answear1: String,
    answear2: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Question', questionSchema);