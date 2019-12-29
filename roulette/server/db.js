const mongoose = require('mongoose');
// const config = require('../config');
// const ENV = process.env.DB || 'devDb';

mongoose.connect('mongodb://localhost:27017/goit');
// mongoose.connect(config[ENV]);

mongoose.connection.on('error', (e) => {
    console.log('check your database');
    console.log(e);
});
mongoose.connection.once('open', function() {
    // we're connected!
    console.log('all okay, DB is started!');

});
