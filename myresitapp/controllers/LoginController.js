const jwt = require('jwt-simple');

//user model
const User = require('../models/user');

//login controller
module.exports.LoginController = (req, res) => {
    let {
        username,
        password,
        is_admin
    } = req.body;

    if (is_admin) {
        if (username == process.env.ADMIN_NAME && password == process.env.ADMIN_PASSWORD) {
            let secret = Buffer.from(process.env.JWT_SECRET, 'hex');
            let token = jwt.encode({
                username: username,
                password: password
            }, secret);
            res.status(200).json({
                message: "Success login!",
                token: token,
                is_admin: true
            });
        } else {
            res.status(401).json({
                error: "Not existing admin!"
            });
        }
    } else {
        User.find({
            username: username,
            password: password
        }, function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                res.status(401).json({
                    error: "Not existing user!"
                });
            } else {
                let secret = Buffer.from(process.env.JWT_SECRET, 'hex');
                let token = jwt.encode({
                    username: username,
                    password: password
                }, secret);
                res.status(200).json({
                    message: "Success login!",
                    token: token,
                    is_admin: false
                });
            }
        });
    }
}