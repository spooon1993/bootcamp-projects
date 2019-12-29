const Users = require('../models/users');

const controller = {
    readAll(req, res, next){
        Users.find({}).exec()
            .then((vegetables) => {
                req.data = vegetables;
                next()
            })
    },
    readOne(req, res, next){
        Users.findById(req.params.id)
            .then((user) => {
                req.data = user;
                next()
            })
    },
    findOne(req, res,next){
        let login = req.body.login;
        Users.find({login}).exec()
        .then((user) => {
            req.data = user;
            next()
        })
    },
    create(req, res, next){
        Users.create({
            login: req.body.login,
            password: req.body.password,
            email: req.body.email
        })
            .then((user) => {
                req.data = user._doc;
                next()
            })
    },
    update(req, res, next){
        Users.findByIdAndUpdate(req.params.id, {
            login: req.body.login,
            password: req.body.password,
            email: req.body.email
        })
            .then((user) => {
                req.data = req.body;
                next();
            })
    },
    delete(req, res, next){
        Users.findByIdAndRemove(req.params.id)
            .then((user) => {
                req.data = user._doc;
                next();
            })
    }
};

module.exports = controller;