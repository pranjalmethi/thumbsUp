const jsonPatch=require('json-patch');
module.exports={
    patchJSON:function(req,res){
        try {
            console.log(req.body)
            res.status(200).json(jsonPatch.apply(req.body.jsonObject, req.body.jsonPatch));
        } catch (error) {
            res.status(400).json({"message":"Error in processing request, please check input"+error})
        }
    }
}