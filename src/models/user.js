const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name : {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    }

});

module.exports = mongoose.model('User', userSchema);