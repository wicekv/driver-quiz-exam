var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    question: String,
    answears: [
        {
            answear: String,
            isCorrect: Boolean
        }
    ],
    img:
    {
        data: mongoose.SchemaTypes.Buffer,
        contentType: String
    }
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model('Question', questionSchema);