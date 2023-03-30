var jwt = require('jsonwebtoken');
const JWT_SECRET= 'WHAT$IS@THIS&';

const fetchUser=(req,res,next)=>{
    // Objective - Get the user from the jwt token and add it to the req object
    const token = req.header('auth-token') // token will store the value of the jwt whose header name will be 'auth-token' when it is sent with the call 
    
    if(!token)
        res.status(401).send({error: "Please authenticate using a valid token"})
    
    try {
        // console.log(token);

        const data = jwt.verify(token, JWT_SECRET);
        // console.log(data);
        req.user = data.user;
        next();        
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})        
    }

}

module.exports = fetchUser