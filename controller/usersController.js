const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");

exports.postRegister = (req, res, next) => {
    const {username, password, selectedBandleader} = req.body;
    const {accountType} = req.params;

    UserModel.userExists(username)
            .then(userInfo => {
                if(userInfo.length > 0){
                    return res.status(401).send({
                        errorMessage : "This user has already been registered"
                    });
                }

                return UserModel.register(username, password, accountType, selectedBandleader)
                        .then(userInfoResponse => {
                            const specificUserInfo = userInfoResponse[0];
                            const token = jwt.sign(
                                {
                                    id : specificUserInfo.id,
                                    username : specificUserInfo.username,
                                    accountType : specificUserInfo.accounttype
                                },
                                config.jwtSecret,
                                {expiresIn : 3600000}
                            );
                            return res.status(200).send({
                                isAuthenticated : true,
                                token,
                                username : specificUserInfo.username,
                                accountType : specificUserInfo.accounttype
                            });
                        })
            })
            .catch(err => console.log(err));
};

exports.postLogin = (req, res, next) => {
    const {username, password} = req.body;
    const {accountType} = req.params;

    UserModel.userExists(username)
            .then(userInfo => {
                if(userInfo.length == 0){
                    return res.status(401).send({
                        errorMessage : "This user isn't registered on our site!"
                    });
                }

                const specificUserInfo = userInfo[0];

                if(specificUserInfo.accountType !== accountType){
                    return res.status(401).send({
                        errorMessage : "Wrong account type for this user!"
                    })
                }

                return bcrypt.compare(password, specificUserInfo.password)
                            .then(isMatch => {
                                if(!isMatch){
                                    return res.status(401).send({
                                        errorMessage : "Entered password doesn't match our records"
                                    });
                                }

                                const token = jwt.sign(
                                    {
                                        id : specificUserInfo.id,
                                        username : specificUserInfo.username,
                                        accountType : specificUserInfo.accounttype
                                    },
                                    config.jwtSecret,
                                    {expiresIn : 3600000}
                                );
                
                                return res.status(200).send({
                                    isAuthenticated : true,
                                    token,
                                    username : specificUserInfo.username,
                                    accountType : specificUserInfo.accounttype
                                });


                            });

                
            })
            .catch(err => console.log(err))
};

exports.getCheckToken = (req,res,next) => {
    const token = req.token;
    const {username} = token;

    return UserModel.userExists(username)
            .then(userInfo => {
                const specificUserInfo = userInfo[0];
                const newToken = jwt.sign(
                    {
                        id : specificUserInfo.id,
                        username : specificUserInfo.username,
                        accountType : specificUserInfo.accounttype
                    },
                    config.jwtSecret,
                    {expiresIn : 3600000}
                );

                return res.status(200).send({
                    isAuthenticated : true,
                    token : newToken,
                    username : specificUserInfo.username,
                    accountType : specificUserInfo.accounttype
                });
            })
            .catch(err => {
                req.token = null;
                return res.status(401).send({
                    errorMessage : "Issue with creating a new token, please login again"
                })
            });


};

exports.getBandleaders = (req, res, next) => {
    return UserModel.getAllBandleaders()
                .then(response => {
                    return res.status(200).send({
                        bandLeaders : response
                    })
                })
                .catch(err => console.log(err));
};

exports.getClientsForBandLeader = (req, res, next) => {
    const token = req.token;
    const {username} = token;

    return UserModel.getClientsForBandleader(username)
                    .then(response => {
                        return res.status(200).send({
                            clientsList : response
                        })
                    })
                    .catch(err => console.log(err));
};

exports.getUserInfo = (req, res, next) => {
    const token = req.token;
    const {id} = token;

    return UserModel.getUserInfo(id)
                    .then(response => {
                        return res.status(200).send({
                            userInfo : response
                        })
                    })
                    .catch(err => console.log(err));
};

exports.editUserInfo = (req, res, next) => {
    const {id} = req.token;
    const {newUsername, newPassword} = req.body;

    UserModel.getUserInfo(id)
            .then(async response => {
                const userInfo = response[0];
                bcrypt.compare(newPassword, userInfo.password)
                    .then(isMatch => {
                        
                        if(isMatch){
                            return res.status(401).send({
                                errorMessage : "The new password is presently being used"
                            });
                        }

                    })

                UserModel.editUserInfo(newUsername, newPassword, id)
                        .then(response => {
                            const specificUserInfo = response[0];
                            const newToken = jwt.sign(
                                {
                                    id : specificUserInfo.id,
                                    username : specificUserInfo.username,
                                    accountType : specificUserInfo.accounttype
                                },
                                config.jwtSecret,
                                {expiresIn : 3600000}
                            );

                            return res.status(200).json({
                                isAuthenticated : true,
                                token : newToken,
                                username : specificUserInfo.username,
                                accountType : specificUserInfo.accounttype
                            });
                        })

            })
            .catch(err => console.log(err));

};