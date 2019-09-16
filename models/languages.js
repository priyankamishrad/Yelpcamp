//eshint jsversion 6

const mongoose = require('mongoose');

//schema set up
const langSchema = new mongoose.Schema({
    name: String,
    image: String,
    author: String,
    desc : String,
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

//set up model
module.exports = mongoose.model("Language",langSchema);