const jwt = require('jsonwebtoken');
const jwt_secret = "this is a secret";
const fetchUser = (req, res, next) => {

    //get the user from the jwt token 
    const token = req.header('auth-token')
    if (!token) {
        res.send(401).send({ error: "Please authentication using a valid token " })
    }
    try {
        const data = jwt.verify(token, jwt_secret)
        req.user = data.user;
        next();
    } catch (error) {
        res.send(401).send({ error: "Please authentication using a valid token " })
    }


}



module.exports = fetchUser;