import { authMiddleware } from './middlewareAuth';
/**
 * Method - POST
 * @param {*} req 
 * "search": "",
 * ProductSection_esMX used for filter - bathroom and kitchen
 * @param {*} res (200 with products data)
 * @returns 
 */
const categories = async (req, res) => {
    authMiddleware(req, res, async () => {
        try {
            if (req.method !== 'POST') {
                res.status(405).send({ error: 'Only POST requests allowed'})
                return
            }
            
            let bodyData = {
                "count":true,
                "top":1000,
                "skip":0,
                "search":"*",
                "filter":""
            }
            let regionMainCategory = (req.body.lang==="en") ? "RegionSubCategory" : "RegionSubCategory_esMX";
            let regionProductCategory = (req.body.lang==="en") ? "RegionProductCategoryLocal" : "RegionProductCategoryLocal_esMX";


            bodyData["facets"] = [`${regionProductCategory},count:100`, `${regionMainCategory},count:100`];

            const categores = (req.body.lang==="en") ? process.env.mainCategores.split(",") : process.env.mainCategores_esMX.split(",");

            const bathroomSubCategories = (req.body.lang==="en") ? process.env.bathroomSubCategories.split(",") : process.env.bathroomSubCategories_esMX.split(",");

            const kitchenSubCategories = (req.body.lang==="en") ? process.env.kitchenSubCategories.split(",") : process.env.kitchenSubCategories_esMX.split(",");


            const commercialSubCategories = (req.body.lang==="en") ? process.env.commercialSubCategories.split(",") : process.env.commercialSubCategories_esMX.split(",");

            const showerSubCategories = (req.body.lang==="en") ? process.env.showerSubCategories.split(",") : process.env.showerSubCategories_esMX.split(",");
            
            if(req.body.category){
                if(!categores.includes(req.body.category)){
                    res.status(405).send({error: 'Please enter the correct value for category'})
                    return
                }
                let filterSubCategory = commercialSubCategories;
                if(req.body.category === categores[0]){
                    filterSubCategory = bathroomSubCategories;
                }else if(req.body.category === categores[1]){
                    filterSubCategory = kitchenSubCategories;
                } else if(req.body.category === categores[2]){
                    filterSubCategory = showerSubCategories;
                }  

                bodyData["filter"] = `${regionMainCategory} eq '${req.body.category}' and search.in(${regionProductCategory}, '${filterSubCategory.toString()}', ',')`;
            }else{
                res.status(405).send({ error: 'category field is required.'})
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

            if(response['@search.facets']['ProductLocalCategory_esMX']){
                response['subCategoryCount'] = response['@search.facets']['ProductLocalCategory_esMX'].length;
            }
            return res.status(200).json({ response:response });
        }catch(error){
            return res.status(500).json({
                error: 'There was an error-'+error
            });
        }
    });
};

export default categories;