const {sign, verify} = require("jsonwebtoken")

module.exports = {
    createAccessToken (email) {
        return sign({email}, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1h' });
    },
    validateAccessToken (token) {
        try {
            return verify(token, process.env.JWT_ACCESS_TOKEN);
        } catch {
            return null;
        }

    }
}