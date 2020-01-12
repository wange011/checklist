const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const task = new Schema({
    text: {type: String},
    color: {type: String},
    completed: {type: Boolean}
});

const schema = new Schema({
    lists: [{
        name: String,
        tasks: [
            task
        ],
        id: String,
        color: String
    }]
});

const List = mongoose.model('lists', schema);
module.exports = List;