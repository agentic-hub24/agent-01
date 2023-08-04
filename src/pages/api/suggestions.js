import { authMiddleware } from './middlewareAuth';
import { apiCalling } from './products';
/**
 * Method - POST
 * @param {*} req
 * "search": "",

 * @param {*} res (200 with products data suggestions)
 * @returns
 */

const suggestions = async (req, res) => {
    authMiddleware(req, res, async () => {
        try {
            if (req.method !== 'POST') {
                res.status(405).send({ error: 'Only POST requests allowed' });
                return;
            }
            
            let bodyData = {
                top: 100,
                select: 'ProductBrandName,SkuNumber,RegionProductCategoryLocal,RegionProductCategoryLocal_esMX',
                suggesterName: 'sg-latam',
                orderby: 'ProductBrandName'
            }
            
            if (req.body && !req.body.search) {
                res.status(405).send({ error: 'Search field is required and it should not be empty' });
                return;
            } else {
                bodyData['search'] = req.body.search;
            }

            let response = await apiCalling(bodyData, process.env.ACS_SUGGESTION_API_URL);
            let {suggestionsData, pageRedirection} = await findSuggestion(response, req);

            return res
                .status(200)
                .json({
                    pageRedirection,
                    suggestionsLength: suggestionsData.length,
                    suggestionsData,
                });

        } catch (error) {
            console.log("error", error)
            return res.status(500).json({
                error: 'There was an error' + error.message
            });
        }
    });
};

async function findSuggestion(response, req) {
    let suggestionsData = [];
    let pageRedirection = "";
    for (const iterator of response.value) {
     
        let suggestion = "";
        let search = req.body.search.charAt(0).toUpperCase() + req.body.search.slice(1);
        
        if (iterator.ProductBrandName?.includes(search)) {
            suggestion = iterator.ProductBrandName;
            pageRedirection = "PLP";
        }
        else if (iterator.SkuNumber?.includes(req.body.search)) {
            suggestion = iterator.SkuNumber;
            pageRedirection = "PDP"
        }
        else if (iterator.RegionProductCategoryLocal?.includes(search)) {
            suggestion = iterator.RegionProductCategoryLocal;
            pageRedirection = "PLP";
        }
        else if (iterator.RegionProductCategoryLocal_esMX?.includes(search)) {
            suggestion = iterator.RegionProductCategoryLocal_esMX;
            pageRedirection = "PLP";
        }
        
        if(suggestion !== "" && !suggestionsData.includes(suggestion)){
            suggestionsData.push(suggestion);
        }
    }
    return {suggestionsData, pageRedirection};
}
export default suggestions;