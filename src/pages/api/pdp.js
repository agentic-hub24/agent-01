import { authMiddleware } from './middlewareAuth';

const getProduct = async (req, res) => {
    authMiddleware(req, res, async () => {
        try {
            //const value = '1188BR-C1-0'
            const value = req.query.value;
            const lang = req.query.lang;
        
            let API_URL = 
             process.env.PDP_COSMOS_API +
              `lang=${lang}&value=${value}&key=productNo&env=${process.env.PDP_API_ENV}`;
        
            let response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.COSMOS_API_KEY,
                    'Content-Type': 'application/json',
                }
            })
            let data = await response.json();
            if (data.status >= 400) {
                return res.status.status(400).json({
                    error: "error is comming"
        
                });
            }
            return res.status(200).json({ status: "ok", data: data });
        }
        catch (error) {
            return res.status(500).json({
                error: 'there was an error' + error
            });
        }
    });
    
};
export default getProduct;