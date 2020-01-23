const User = require("../Models/User");
const {validateAccessToken} = require("../Helpers/Auth");

module.exports = (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    try {
        const accessToken = bearerToken.split(" ")[1];
        console.log(validateAccessToken(accessToken))
        if (validateAccessToken(accessToken)) {
            User.findOne({email: validateAccessToken(accessToken).email})
                .then(user => {
                    if (user) {
                        req.user = user;
                        next()
                    }
                    return res.status(503).json({code: 503, errorMessage: "Not Authorized to come in"})

                })
                .catch(e => {
                    return res.status(500).json({code: 500, errorMessage: "A error ocurred. We're sorry.", err: e})
                })
        } else {
            return res.status(503).json({code: 503, errorMessage: "Not Authorized to come in"})
        }

    } catch (e) {
        return res.status(500).json({code: 500, errorMessage: "A error ocurred. We're sorry.", err: e})
    }
}
