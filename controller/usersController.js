const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.postRegister = (req, res, next) => {
    const {username, password, duplicatePassword} = req.body;
    const {accountType} = req.params;
    UserModel.userExists(username)
            .then(userInfo => {
                if(userInfo.length > 0){
                    return res.status(401).send({
                        errorMessage : "This user has already been registered"
                    });
                }

                if(password !== duplicatePassword){
                    return res.status(401).send({
                        errorMessage : "Passwords don't match"
                    });
                }

                return UserModel.register(username, password, accountType)
                        .then(userInfo => {
                            const specificUserInfo = userInfo[0];
                            const token = jwt.sign(
                                {id : specificUserInfo.id},
                                config.jwtSecret,
                                {expiresIn : 36000}
                            );
                            return res.status(200).json({
                                isAuthenticated : true,
                                token,
                                username : specificUserInfo.username,
                            });
                        })
            })
            .catch(err => console.log(err));
};

exports.postLogin = (req, res, next) => {
    const {username, password} = req.body;

};