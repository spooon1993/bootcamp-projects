const route = require('express').Router();
const controller = require('../controllers/users');
const auth = require('../controllers/auth');

route.get('/', (req, res) => {
    res.json('123');
});

route.post('/', controller.findOne, auth, (req ,res) => {
    res.json(req.data);
});


module.exports = route;