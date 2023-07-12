import { authMiddleware } from "./middlewareAuth";
/**
 * Method - POST
 * @param {*} req 
 * "search": "",
 * "orderby":"",
 * "ProductSection_esMX":""
 * "ProductLocalCategory_esMX":"",
 * "SKUColorFinishCode":"",
 * "ProductNewProduct": "",
 * "TouchlessFaucet_esMX" : "",
 * "BowlShape": "",
 *  "HandleStyle": "",
 * "BidetFunctionality_esMX" : ""
 * "SKUColorFinishName_esMX": ""
 * "ProductInstallationType_esMX":"",
 * "ProductProductType_esMX":"",
 * "ProductOverallWidthMmMin":"",
 * "ProductOverallWidthMmMax":"",
 * "ProductOverallLengthMmMin":"",
 * "ProductOverallLengthMmMax":"",
 * "ProductMaterial_esMX":"",
 * "ProductShape_esMX":"",
 * "ProductLitersPerMinute":"",
 * "SprayType":""
 * "ProductNumberofHandles", 
 * "ProductConfiguration_esMX", 
 * "NightLight_esMX", 
 * "LitersPerFlush", 
 * "NumberOfHoles_esMX"
 * @param {*} res (200 with products data)
 * @returns 
 */

const products = async (req, res) => {
    authMiddleware(req,res, async () => {
        try{
            if (req.method !== 'POST') {
                res.status(405).send({ error: 'Only POST requests allowed' })
                return
            }
            const countPerEachPage = process.env.CountPerEachPage;
            let bodyData = {
                "count": true,
                "top": 1000,
                "skip": 0,
                "search": "*",
                "facets": ["ProductLocalCategory_esMX", "ProductNewProduct", "TouchlessFaucet_esMX","BowlShape", "HandleStyle", "BidetFunctionality_esMX", "SKUColorFinishCode", "ProductProductType_esMX","ProductOverallWidthMm","ProductOverallLengthMm", "ProductMaterial_esMX", "ProductShape_esMX", "ProductInstallationType_esMX", "ProductLitersPerMinute", "SprayType", "ProductNumberofHandles", "ProductConfiguration_esMX", "NightLight_esMX" ,"IntelligentToilet_esMX", "LitersPerFlush", "NumberOfHoles_esMX"],
                "filter": "",
                "searchMode": "all"
            }
            req.body = JSON.parse(req.body);
            if(req.body.search){
                bodyData["search"] = req.body.search;
                if(!isNaN(req.body.search) &&req.body.search.length > 4){
                    bodyData["search"] += "*";
                }
            }

            if(req.body.currentPage){
                bodyData["skip"] = (req.body.currentPage-1) * countPerEachPage;
                bodyData["top"] = countPerEachPage;
            }

            if(req.body.orderby){
                bodyData["orderby"] = req.body.orderby;
            }

            let filterData = "";
            if(req.body.ProductLocalCategory_esMX){
                filterData += `ProductLocalCategory_esMX eq '${req.bodyProductLocalCategory_esMX}' `;
            }

            if(req.body.SKUColorFinishCode){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `SKUColorFinishCode eq '${req.body.SKUColorFinishCode}' `;
            }

            if(req.body.ProductNewProduct){
                filterData += (filterData != '') ? "and ": "";
                filterData += `ProductNewProduct eq'${req.body.ProductNewProduct}'`;
            }
            
            if(req.body.TouchlessFaucet_esMX){
                filterData += (filterData != '') ? "and ": "";
                filterData += `TouchlessFaucet_esMX eq'${req.body.TouchlessFaucet_esMX}'`;
            }

            if(req.body.BowlShape){
                filterData += (filterData != '') ? "and ": "";
                filterData += `BowlShape eq'${req.body.BowlShape}'`;
            }

            if(req.body.HandleStyle){
                filterData += (filterData != '') ? "and ": "";
                filterData += `HandleStyle eq'${req.body.HandleStyle}'`;
            }

            if(req.body.BidetFunctionality_esMX){
                filterData += (filterData != '') ? "and ": "";
                filterData += `BidetFunctionality_esMX eq'${req.body.BidetFunctionality_esMX}'`;
            }

            if(req.body.ProductInstallationType_esMX){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductInstallationType_esMX eq '${req.body.ProductInstallationType_esMX}' `;
            }

            if(req.body.ProductProductType_esMX){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductProductType_esMX eq '${req.body.ProductProductType_esMX}' `;
            }

            if(req.body.ProductOverallWidthMmMin){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductOverallWidthMm ge ${req.body.ProductOverallWidthMmMin} and ProductOverallWidthMm le ${req.body.ProductOverallWidthMmMax}`;
            }

            if(req.body.ProductOverallLengthMmMin){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductOverallLengthMm ge ${req.body.ProductOverallLengthMmMin} and ProductOverallLengthMm le ${req.body.ProductOverallLengthMmMax}`;
            }

            if(req.body.ProductMaterial_esMX){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductMaterial_esMX eq '${req.body.ProductMaterial_esMX}' `;
            }

            if(req.body.ProductShape_esMX){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductShape_esMX eq '${req.body.ProductShape_esMX}' `;
            }

            if(req.body.ProductLitersPerMinute){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductLitersPerMinute eq '${req.body.ProductLitersPerMinute}' `;
            }

            if(req.body.SprayType){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `SprayType eq '${req.body.SprayType}'`;
            }

            if(req.body.ProductNumberofHandles){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductNumberofHandles eq '${req.body.ProductNumberofHandles}'`;
            }

            if(req.body.ProductConfiguration_esMX){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductConfiguration_esMX eq '${req.body.ProductConfiguration_esMX}'`;
            }

            if(req.body.NightLight_esMX){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `NightLight_esMX eq '${req.body.NightLight_esMX}'`;
            }

            if(req.body.LitersPerFlush){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `LitersPerFlush eq '${req.body.LitersPerFlush}'`;
            }

            if(req.body.NumberOfHoles_esMX){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `NumberOfHoles_esMX eq '${req.body.NumberOfHoles_esMX}'`;
            }
            bodyData["filter"] = filterData;


            let response = await apiCalling(bodyData);

            response["paginationData"] = {};
            response["searchResults"] = {};
            if(req.body.search && req.body.search.includes("K-") && response.value && response.value.length == 0){
                response["searchResults"]["suggestions"] = req.body.search.split("K-")[1];
            }

            if(response.value && response.value.length){
                if(response.value.length === 1){
                    // pdp page data
                    const ProductProductNo = response.value[0].ProductProductNo;
                    const ProductDefaultSKU = response.value[0].ProductDefaultSKU;
                    const SkuNumber = response.value[0].SkuNumber;
                    const searchData = req.body.search;

                    if((searchData === SkuNumber || SkuNumber.includes(searchData)) || (searchData === ProductDefaultSKU || ProductDefaultSKU.includes(searchData)) || (searchData === ProductProductNo || ProductProductNo.includes(searchData))){
                        response["searchResults"]["PDP"] = ProductProductNo;
                    }
                }

                let productsCount = response["@odata.count"];

                if(req.body.CurrentPage){
                    let CurrentPage = req.body.CurrentPage
                    const countOfPages = Math.ceil(productsCount / countPerEachPage);
                    response["paginationData"]["CurrentPage"] = CurrentPage;
                    response["paginationData"]["totalNumberOfPages"] = countOfPages;
                    response["paginationData"]["countPerEachPage"] = countPerEachPage;
                }
                if(req.body.search){
                    // here need to fetch specification data
                    const {result, specificationCount} = await getSpecificationCount(bodyData);
                    response["@search.facets"]["SpecATGDefaultCategory_esMX"] = result;
                    response["searchResults"]["productsCount"] = productsCount;
                    response["searchResults"]["specificationCount"] = specificationCount;
                    response["searchResults"]["totalSearchResults"] = productsCount + specificationCount;
                }
                response["@search.facets"]["toilet_type"] = [...response["@search.facets"]["ProductConfiguration_esMX"] , 
               ...response["@search.facets"]["ProductInstallationType_esMX"], 
               response["@search.facets"]["IntelligentToilet_esMX"][1] ]
            }
            return res.status(200).json({ response:response});
        }catch (error) {
            return res.status(500).json({
                error: 'There was an error-'+error.name+":"+error.message
            });
        }
    });
};

async function apiCalling(bodyData){
    let response = await fetch(process.env.ACS_PLP_API_URL,
        {
            body: JSON.stringify(bodyData),
            // withCredentials: true,
            headers: {
                "api-key":process.env.ACS_API_KEY,
                'Content-Type': "application/json;charset=UTF-8",
            },
            method: 'POST'
        }
    );
    response = await response.json();
    if(response.error || response.status >= 400){
        // console.log("response.error", response.error)
        throw response.error
    }
    return response;
}

async function getSpecificationCount(bodyData){
    bodyData["top"] = 2000;
    let response = await apiCalling(bodyData);
    let products = response.value;
    let specificationCount =0;
    const SpecATGDefaultCategory_esMX = {};
    for (const iterator of products) {
        if(iterator.DWGPlanView || iterator.ThreeDDXF){
            specificationCount++;
            if(SpecATGDefaultCategory_esMX[iterator.ProductLocalCategory_esMX]){
                SpecATGDefaultCategory_esMX[iterator.ProductLocalCategory_esMX] = SpecATGDefaultCategory_esMX[iterator.ProductLocalCategory_esMX] + 1;
            }else{
                SpecATGDefaultCategory_esMX[iterator.ProductLocalCategory_esMX] = 1
            }
        }
    }
    let result = Object.keys(SpecATGDefaultCategory_esMX).map((key) => {
        return {"count" : SpecATGDefaultCategory_esMX[key], "value": key}
    });
    return {result,specificationCount};
}

export default products;
