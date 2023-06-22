import { authMiddleware } from './middlewareAuth';
/**
 * Method - POST
 * @param {*} req 
 * "search": "",
 * ProductSection_PT used for filter - bathroom and kitchen
 * @param {*} res (200 with products data)
 * @returns 
 */
const categories = async (req, res) => {
    authMiddleware(req, res, async () => {
        try {
            if (req.method !== 'POST') {
                res.status(405).send({ error: 'Only POST requests allowed' })
                return
            }
            req.body = JSON.parse(req.body);

            let bodyData = {
                "count":true,
                "top":1000,
                "skip":0,
                "search":"*",
                "facets":["ProductATGDefaultCategory_PT,count:25"],
                "filter":""
            }
            const mainCategores = process.env.mainCategores.split(",");
            const bathroomSubCategories = process.env.bathroomSubCategories.split(",");
            const kitchenSubCategories = process.env.kitchenSubCategories.split(",");
            if(req.body.ProductSection_PT){
                if(!mainCategores.includes(req.body.ProductSection_PT)){
                    res.status(405).send({ error: 'Please enter the correct value for ProductSection_PT.' })
                    return    
                }
                let filterSubCategory = kitchenSubCategories;
                if(req.body.ProductSection_PT === mainCategores[0]){
                    filterSubCategory = bathroomSubCategories;
                }

                bodyData["filter"] = `ProductSection_PT eq '${req.body.ProductSection_PT}' and search.in(ProductATGDefaultCategory_PT, '${filterSubCategory.toString()}', ',')`;
            }else{
                res.status(405).send({ error: 'ProductSection_PT field is required.' })
                return
            }
            let response = await fetch(process.env.ACS_PLP_API_URL,
                {
                    body: JSON.stringify(bodyData),
                    withCredentials: true,
                    headers: {
                        "api-key":process.env.ACS_API_KEY,
                        'Content-Type': "application/json;charset=UTF-8",
                    },
                    method: 'POST'
                }
            );
            response = await response.json();
            
            if(response.error){
                return res.status(500).json({
                    error: 'Server Error-'+response.error.message
                });
            }
            
            if (response.status >= 400 ) {
                return res.status(400).json({
                    error: 'There was an error'
                });
            }

            if(response['@search.facets']['ProductATGDefaultCategory_PT']){
                response['SubCategoryCount'] = response['@search.facets']['ProductATGDefaultCategory_PT'].length;
            }
            return res.status(200).json({ response:response });
        } catch (error) {
            return res.status(500).json({
                error: 'There was an error-'+error
            });
        }
    });
};

export default categories;