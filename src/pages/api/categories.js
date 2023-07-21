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
                "filter":"",
                "select":process.env.Common_Fields
            }
            
            bodyData["select"] += (req.body.lang==="en") ? "," + process.env.English_Fields : "," + process.env.Spanish_Fields; 

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
            
            // conversion of keys
            if(req.body.lang !== "en" && response.value.length > 0){
                for (let i = 0; i < response.value.length; i++) {
                    const iterator = response.value[i];
                    const {ProductDescriptionProductShort_esMX,ProductLocalCategory_esMX,SKUColorFinishName_esMX,ProductMaterial_esMX,ProductProductType_esMX,ProductATGDefaultCategory_esMX,ProductSection_esMX,ProductInstallationType_esMX,ProductShape_esMX,SprayType_esMX,NightLight_esMX,NumberOfHoles_esMX,ProductConfiguration_esMX,IntelligentToilet_esMX,BowlShape_esMX,HandleStyle_esMX,BidetFunctionality_esMX,TouchlessFaucet_esMX,RegionProductCategoryLocal_esMX,RegionSubCategory_esMX } = iterator;
                    const modifiedObj = {
                        ProductDescriptionProductShort:ProductDescriptionProductShort_esMX,ProductLocalCategory: ProductLocalCategory_esMX,
                        SKUColorFinishName:SKUColorFinishName_esMX,
                        ProductMaterial:ProductMaterial_esMX,
                        ProductProductType:ProductProductType_esMX,
                        ProductATGDefaultCategory:ProductATGDefaultCategory_esMX,
                        ProductSection:ProductSection_esMX,
                        ProductInstallationType:ProductInstallationType_esMX,
                        ProductShape:ProductShape_esMX,
                        SprayType:SprayType_esMX,
                        NightLight:NightLight_esMX,
                        NumberOfHoles:NumberOfHoles_esMX,
                        ProductConfiguration:ProductConfiguration_esMX,
                        IntelligentToilet:IntelligentToilet_esMX,
                        BowlShape:BowlShape_esMX,
                        HandleStyle:HandleStyle_esMX,
                        BidetFunctionality:BidetFunctionality_esMX,
                        TouchlessFaucet:TouchlessFaucet_esMX,
                        RegionProductCategoryLocal:RegionProductCategoryLocal_esMX,
                        RegionSubCategory:RegionSubCategory_esMX
                    }
                    response.value[i] = {...response.value[i], ...modifiedObj}
                  
                    delete response.value[i]["ProductDescriptionProductShort_esMX"];
                    delete response.value[i]["ProductLocalCategory_esMX"];
                    delete response.value[i]["SKUColorFinishName_esMX"];
                    delete response.value[i]["ProductMaterial_esMX"];
                    delete response.value[i]["ProductProductType_esMX"];
                    delete response.value[i]["ProductATGDefaultCategory_esMX"];
                    delete response.value[i]["ProductSection_esMX"];
                    delete response.value[i]["ProductInstallationType_esMX"];
                    delete response.value[i]["ProductShape_esMX"];
                    delete response.value[i]["SprayType_esMX"];
                    delete response.value[i]["NightLight_esMX"];
                    delete response.value[i]["NumberOfHoles_esMX"];
                    delete response.value[i]["ProductConfiguration_esMX"];
                    delete response.value[i]["IntelligentToilet_esMX"];
                    delete response.value[i]["BowlShape_esMX"];
                    delete response.value[i]["HandleStyle_esMX"];
                    delete response.value[i]["BidetFunctionality_esMX"];
                    delete response.value[i]["TouchlessFaucet_esMX"];
                    delete response.value[i]["RegionProductCategoryLocal_esMX"];
                    delete response.value[i]["RegionSubCategory_esMX"];
                    
                }
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