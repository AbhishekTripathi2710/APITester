const axios = require("axios");

const handleApiRequest = async ({url, method, headers = {}, body = {}, params = {} }) => {
    const start = Date.now();

    try{
        const response = await axios({
            url,
            method: method.toLowerCase(),
            headers,
            data: body,
            params,
            validateStatus: () => true,
            timeout: 10000,
        });

        const end = Date.now();

        return {
            success: true,
            status: response.status,
            statusText: response.statusText,
            responseTime: `${end - start} ms`,
            headers: response.headers,
            data: response.data,
        };
    }catch(error){
        const end = Date.now();

        return {
            success: false,
            error: error.message,
            responseTime: `${end - start} ms`,
        };
    }
};

module.exports ={ handleApiRequest };