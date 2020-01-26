const User = require("../Models/User");
const {validateAccessToken} = require("../Helpers/Auth");

module.exports = async (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    if(!bearerToken) {
        return res.status(500).json({code: 500, errorMessage: "Token Not Found"})
    }
    const accessToken = bearerToken.split(" ")[1];
    const tokenData = await validateAccessToken(accessToken);
    if (tokenData) {
        User.findOne({email: tokenData.email})
            .then(user => {
                if (!user) {
                    return res.status(403).json({code: 403, errorMessage: "Not Authorized to come in"})
                }
                req.user = user;
                next();
            })
            .catch(e => {
                return res.status(500).json({code: 500, errorMessage: "A error ocurred. We're sorry.", err: e})
            });
    } else {
        return res.status(503).json({code: 503, errorMessage: "Not Authorized to come in"})
    }
}
