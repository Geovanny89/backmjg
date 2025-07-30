const jwt = require("jsonwebtoken")
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET

const tokenSign = async (users) => {
    const sign = jwt.sign(
        {
            _id:users._id,
            role:users.role
        },
        JWT_SECRET,
      
        {
            expiresIn:"1h"
        }
    )
    return sign
}

const verifyToken = async (tokenJwt) => {
    try {
        const decoded = jwt.verify(tokenJwt, JWT_SECRET)
        return { valid: true, data: decoded }
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return { valid: false, message: "Debes volver a iniciar sesión" }
        } else {
            return { valid: false, message: "Token inválido" }
        }
    }
}


module.exports = { tokenSign, verifyToken }