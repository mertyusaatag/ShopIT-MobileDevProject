const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken")

const passwordToHash = (password) =>
{
     return CryptoJS.HmacSHA256(password,CryptoJS.HmacSHA1(password,process.env.PASSWORD_HASH).toString()).toString();
}

const generateAccesToken = (user) => {
    return JWT.sign({name : user.name ,accessLevel : user.accessLevel},process.env.ACCESS_TOKEN_SECRET_KEY,{algorithm:"HS256", expiresIn:"1d"});
}

const verifyToken = (token) => {
    return JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, {algorithm: "HS256"});
}

const generateRefreshToken = (user) => {
    return JWT.sign({name : user.name, ...user},process.env.REFRESH_TOKEN_SECRET_KEY);
}
module.exports = {
    passwordToHash,
    generateAccesToken,
    generateRefreshToken,
    verifyToken
}