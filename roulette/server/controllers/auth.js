const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const KEY = 'secret';
const auth = (req, res, next) => {
    const {login, password} = req.body;
    Users.findOne({ login }).exec()
        .then((user) => {
            if (user === null){
                let e = new Error('User not found');
                e.status = 404;
                next(e);
            }
            if (user.password === password){
                jwt.sign({
                    login: user.login
                }, KEY, (err, token) => {
                    res.json({token});
                })
            }
            else {
                let e = new Error('Invalid password');
                e.status = 400;
                next(e);
            }
        })
        .catch((e) => {
            e.status = 400;
            next(e);
        })
};
module.exports = auth;