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
            //   if(!req.body.lang || req.body.lang=="" || req.body.lang==null){
            //     res.status(405).send({ error: 'lang field is required.'});
            // }
            // const lang = req.body.lang;
            let bodyData = {
                top: 15,
                select: 'ProductBrandName,SkuNumber,RegionProductCategoryLocal,RegionProductCategoryLocal_esMX',
                suggesterName: 'sg-latam',
                orderby: 'ProductDescriptionProductShort'
            }
            // bodyData["select"] += (lang==="en") ? "," + process.env.en_region_local_sugg : "," + es_region_local_sugg;
            if (!req.body || !req.body.search) {
                res.status(405).send({ error: 'Search field is required and it should not be empty' });
                return;
            } else {
                bodyData['search'] = req.body.search;
            }

            let response = await apiCalling(bodyData, process.env.ACS_SUGGESTION_API_URL);
            let suggestions = await findSuggestion(response, req);

            return res
                .status(200)
                .json({
                    suggestionsLength: suggestions.length,
                    lenghth: response.value.length,
                    data: response.value,
                    suggestions,
                });

        } catch (error) {
            return res.status(500).json({
                error: 'There was an error' + error
            });
        }
    });
};

async function findSuggestion(response, req) {
    const suggestions = [];
    for (const iterator of response.value) {
        // const suggestion = [];
        let matchData = "";
        let pageRedirection = "PDP";
        console.log(`ProductBrandName:${iterator.ProductBrandName.includes(req.body.search)}`)

        if (iterator.ProductBrandName && iterator.ProductBrandName.includes(req.body.search)) {
            matchData = iterator.ProductBrandName;
            pageRedirection = "PLP";
            
        }
        else if (iterator.SkuNumber && iterator.SkuNumber.includes(req.body.search)) {
            matchData = iterator.SkuNumber;
            console.log(2)
        }
        else if (iterator.RegionProductCategoryLocal && iterator.RegionProductCategoryLocal.includes(req.body.search)) {
            matchData = iterator.RegionProductCategoryLocal;
            pageRedirection = "PLP";
            console.log(3)

        }
        else if (iterator.RegionProductCategoryLocal_esMX && iterator.RegionProductCategoryLocal_esMX.includes(req.body.search)) {
            matchData = iterator.RegionProductCategoryLocal_esMX;
            pageRedirection = "PLP";
            console.log(4)
        }
        suggestions.push({ matchData: matchData, SkuNumber: iterator.SkuNumber });
        console.log(matchData, pageRedirection);
       // console.log(`ProductBrandName:${iterator.ProductBrandName},SkuNumber:${iterator.SkuNumber},RegionProductCategoryLocal:${iterator.RegionProductCategoryLocal},RegionProductCategoryLocal_esMX:${iterator.RegionProductCategoryLocal_esMX}`)
    }
    return suggestions;
}
export default suggestions;