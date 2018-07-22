const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chat');
mongoose.Promise = global.Promise;

module.exports = mongoose;