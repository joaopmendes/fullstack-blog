const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const {createAccessToken} = require("../Helpers/Auth");
module.exports = {
    async register(req, res) {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({code: 400, errorMessage: "Bad format."})
        }
        User.findOne({email})
            .then(user => {
                if(user && user.email) {
                    return res.status(400).json({code: 400, errorMessage: "Email already in use"})
                }
                bcrypt.hash(password, 10)
                    .then(hashedPassword => {
                        const  user = new User({name, email, password: hashedPassword});
                        const token = createAccessToken(email);
                        user.accessToken = token;
                        user.save();
                        return res.status(200).json({code: 200, data: token});

                    })
                    .catch(err => {
                        return res.status(400).json({code: 400, errorMessage: "Error trying to encrypt password."});
                    })
            })
            .catch(err => {
                return res.status(400).json({code: 400, errorMessage: "A error ocurred. We're sorry."})
            });


    }
}