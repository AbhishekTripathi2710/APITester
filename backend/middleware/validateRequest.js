

const VALID_METHOD = ["GET","POST","PUT","DELETE","PATCH"];

const validateRequest = (req,res,next) => {
    const {url,method,headers,body,params} = req.body;

    try{
        new URL(url);
    }catch{
        return res.status(400).json({error: "Invalid URL format"});
    }

    if(!VALID_METHOD.includes(method.toUpperCase())){
        return res.status(400).json({error: "Headers must be an object"});
    }

    if(params && typeof params !== "object"){
        return res.status(400).json({error: "P"})
    }
}