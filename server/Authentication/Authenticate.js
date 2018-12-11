var jwt = require("jsonwebtoken");


auth = (req,res,next) =>{
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    jwt.verify(token, 'shhhhh', function(err, decoded) {
        if(err)
        {
            res.status(400);
        }
        else next();
        
      });
     
};
module.exports = auth; 