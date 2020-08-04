const jwt=require('jsonwebtoken');
const secretKey="KashwareBackendTest123";
const cookie 	    = require('cookie');

module.exports={
    login:function(req,res){
        // try {
            console.log("login",req)
            let username=req.body.username;
            let password=req.body.password;
            if(username && password){
                let token = jwt.sign({"username":username}, secretKey, {
                    expiresIn: 18000
                })
                res.cookie('authToken', token);
                res.status(200).json({ status:"success", username:username, authToken: token })
            }else{
                res.status(403).json({ status:"failed", message:"Invalid username or password" })
            }    
        // } catch (error) {
        //     res.status(400).json({ status:"failed", message:"Invalid username or password" })
        // }
        
    },
    authenticate:function(req,res,nxt){
        let token=req.get('authToken');

        if(token){
            try {
                var decodedToken = jwt.verify(token, secretKey);
                if(decodedToken){
                  req.userId = decodedToken.id;
                  req.username = decodedToken.username;
                   nxt();
                }else{
                    console.log(error("Auth token not valid ->" )+req); 
                    res.status(403).json({status:"failed",error:"Unauthorized access"})
                }
             } catch(err) {
                console.log("AUTH error",err); 
                res.status(403).json({status:"failed",error:"Unauthorized access"})
            }
         }else{
            res.status(403).json({status:"failed",error:"Missing authToken in header"})
         } 
        
    }
}