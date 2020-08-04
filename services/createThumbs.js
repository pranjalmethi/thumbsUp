const imageThumbnail = require('image-thumbnail');
const validator      = require('validator');
module.exports={
    createThumbnail:async function(req,res,err){
        if(req.query.uri){
            if (!validator.isURL(req.query.uri)) {
                res.status(400).json({"message":"Invalid image URL"})
                return;
            }
            try {
                let opt={width:50,height:50};
                const thumbnail = await imageThumbnail({ uri: req.query.uri},opt);
                console.log(thumbnail);
                res.status(200).set({'Content-type':"image/jpeg","Content-Disposition":"attachment;filename=thumb.jpeg"}).send(thumbnail)
            } catch (err) {
                res.status(500).json({"message":"Server Error:"+err})
                console.error(err);
            }
        
        } 
    }
}
