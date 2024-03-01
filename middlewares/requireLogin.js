const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    // Check if the request is for the public endpoint (e.g., /allposts)
    if (req.originalUrl === "/allposts") {
        // Skip authentication for public endpoint
        return next();
    }

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, Jwt_secret, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in" });
        }
        const { _id } = payload;
        USER.findById(_id).then(userData => {
            req.user = userData;
            next();
        });
    });
};
