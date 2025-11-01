const express = require("express");
const router = express.Router();
const {handleApiRequest} = require("../utils/requestHandler");
const validateRequest = require("../middleware/validateRequest");

router.post("/test",validateRequest, async (req,res) => {
    try{
        const {url, method, headers, body , params} = req.body;

        if(!url || !method){
            return res.status(400).json({error: "URL and method are required"});
        }

        const response = await handleApiRequest({url, method, headers, body, params});
        res.json(response);
    }catch(error){
        console.error("Error:", error.message);
        res.status(500).json({error: error.message || "Internal server Error"});
    }
})

module.exports = router;