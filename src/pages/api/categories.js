import { authMiddleware } from './middlewareAuth';
import { apiCalling } from './products';
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
            
            if(!req.body.lang || req.body.lang=="" || req.body.lang==null){
                res.status(405).send({ error: 'lang field is required.'});
            }

            if(!req.body.category || req.body.category=="" || req.body.category==null){
                res.status(405).send({ error: 'lang field is required.'});
            }

            let bodyData = {
                "count":true,
                "top":1000,
                "skip":0,
                "search":"*",
                "filter":"",
                "select":process.env.Common_Fields
            }
            
            const {lang, category} = req.body;

            bodyData["select"] += (lang==="en") ? "," + process.env.English_Fields : "," + process.env.Spanish_Fields;

            let regionMainCategory = "RegionSubCategory" + ((lang==="en") ? "" : "_esMX");
            let regionProductCategory = "RegionProductCategoryLocal"+ ((lang==="en") ? "" : "_esMX");

            bodyData["facets"] = [`${regionProductCategory},count:100`];

            const categores = (lang==="en") ? process.env.mainCategores.split(",") : process.env.mainCategores_esMX.split(",");

            const bathroomSubCategories = (lang==="en") ? process.env.bathroomSubCategories.split(",") : process.env.bathroomSubCategories_esMX.split(",");

            const kitchenSubCategories = (lang==="en") ? process.env.kitchenSubCategories.split(",") : process.env.kitchenSubCategories_esMX.split(",");

            const commercialSubCategories = (lang==="en") ? process.env.commercialSubCategories.split(",") : process.env.commercialSubCategories_esMX.split(",");

            const showerSubCategories = (lang==="en") ? process.env.showerSubCategories.split(",") : process.env.showerSubCategories_esMX.split(",");

            
            if(!categores.includes(category)){
                res.status(405).send({error: 'Please enter the correct value for category'})
                return
            }
            let filterSubCategory = commercialSubCategories;
            if(category === categores[0]){
                filterSubCategory = bathroomSubCategories;
            }else if(category === categores[1]){
                filterSubCategory = kitchenSubCategories;
            } else if(category === categores[2]){
                filterSubCategory = showerSubCategories;
            }  

            bodyData["filter"] = `ProductIsDiscontinued ne true and SKUDiscontinuedDate eq null and ${regionMainCategory} eq '${category}' and search.in(${regionProductCategory}, '${filterSubCategory.toString()}', ',')`;
            
            let response = await apiCalling(bodyData, process.env.ACS_PLP_API_URL);
            
            // conversion of keys
            if(lang !== "en" && response.value.length > 0){
                response = await conversionKeys(response);
            }
            return res.status(200).json({ response:response });
        }catch(error){
            return res.status(500).json({
                error: 'There was an error-'+error
            });
        }
    });
};

export async function conversionKeys(response){
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

    response["@search.facets"]["RegionProductCategoryLocal"] = response["@search.facets"]["RegionProductCategoryLocal_esMX"];
    response["@search.facets"]["RegionSubCategory"] = response["@search.facets"]["RegionSubCategory_esMX"];
    delete response["@search.facets"]["RegionProductCategoryLocal_esMX"];
    delete response["@search.facets"]["RegionSubCategory_esMX"];
    return response;
}
export default categories;