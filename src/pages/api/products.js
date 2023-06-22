import { authMiddleware } from "./middlewareAuth";
/**
 * Method - POST
 * @param {*} req 
 * "search": "",
 * "orderby":"ProductBrandName desc",
 * "ProductSection_PT":""
 * "ProductATGDefaultCategory_PT":"Válvulas para chuveiros",
 * "SKUColorFinishCode":"RGD",
 * "SKUColorFinishName_PT"
 * "ProductInstallationType_PT":"",
 * "ProductProductType_PT":"Válvula de chuveiro",
 * "ProductOverallWidthMmMin":"",
 * "ProductOverallWidthMmMax":"",
 * "ProductOverallLengthMmMin":"",
 * "ProductOverallLengthMmMax":"",
 * "ProductMaterial_PT":"Metal",
 * "ProductShape_PT":"",
 * "ProductLitersPerMinute":"",
 * "SprayType":""
 * "ProductNumberofHandles", 
 * "ProductConfiguration_PT", 
 * "NightLight_PT", 
 * "LitersPerFlush", 
 * "NumberOfHoles"
 * @param {*} res (200 with products data)
 * @returns 
 */
const products = async (req, res) => {
    authMiddleware(req, res, async () => {
        try {
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
                "facets": ["ProductATGDefaultCategory_PT", "SKUColorFinishCode", "ProductInstallationType_PT", "ProductProductType_PT","ProductOverallWidthMm","ProductOverallLengthMm", "ProductMaterial_PT", "ProductShape_PT", "ProductLitersPerMinute", "SprayType", "ProductNumberofHandles", "ProductConfiguration_PT", "NightLight_PT", "LitersPerFlush", "NumberOfHoles"],
                "filter": "",
                "searchMode": "all"
            }
            req.body = JSON.parse(req.body);
            if(req.body.search){
                bodyData["search"] = req.body.search;
                if(!isNaN(req.body.search) && req.body.search.length > 4){
                    bodyData["search"] += "*";
                }
            }

            if(req.body.CurrentPage){
                bodyData["skip"] = (req.body.CurrentPage-1) * countPerEachPage;
                bodyData["top"] = countPerEachPage;
            }

            // it can come as query paramas bcs frmtend will use reactjs, SPA, so, page will not reload 
            if(req.body.orderby){
                bodyData["orderby"] = req.body.orderby;
            }

            let filterData = "";
            if(req.body.ProductATGDefaultCategory_PT){
                filterData += `ProductATGDefaultCategory_PT eq '${req.body.ProductATGDefaultCategory_PT}' `;
            }

            if(req.body.SKUColorFinishCode){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `SKUColorFinishCode eq '${req.body.SKUColorFinishCode}' `;
            }

            if(req.body.ProductInstallationType_PT){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductInstallationType_PT eq '${req.body.ProductInstallationType_PT}' `;
            }

            if(req.body.ProductProductType_PT){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductProductType_PT eq '${req.body.ProductProductType_PT}' `;
            }

            if(req.body.ProductOverallWidthMmMin){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductOverallWidthMm ge ${req.body.ProductOverallWidthMmMin} and ProductOverallWidthMm le ${req.body.ProductOverallWidthMmMax}`;
            }

            if(req.body.ProductOverallLengthMmMin){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductOverallLengthMm ge ${req.body.ProductOverallLengthMmMin} and ProductOverallLengthMm le ${req.body.ProductOverallLengthMmMax}`;
            }

            if(req.body.ProductMaterial_PT){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductMaterial_PT eq '${req.body.ProductMaterial_PT}' `;
            }

            if(req.body.ProductShape_PT){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductShape_PT eq '${req.body.ProductShape_PT}' `;
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

            if(req.body.ProductConfiguration_PT){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `ProductConfiguration_PT eq '${req.body.ProductConfiguration_PT}'`;
            }

            if(req.body.NightLight_PT){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `NightLight_PT eq '${req.body.NightLight_PT}'`;
            }

            if(req.body.LitersPerFlush){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `LitersPerFlush eq '${req.body.LitersPerFlush}'`;
            }

            if(req.body.NumberOfHoles){
                filterData += (filterData != '') ? "and ": ""; 
                filterData += `NumberOfHoles eq '${req.body.NumberOfHoles}'`;
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
                    response["@search.facets"]["SpecATGDefaultCategory_PT"] = result;
                    response["searchResults"]["productsCount"] = productsCount;
                    response["searchResults"]["specificationCount"] = specificationCount;
                    response["searchResults"]["totalSearchResults"] = productsCount + specificationCount;
                }
            }
            return res.status(200).json({ response:response});
        } catch (error) {
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
    const SpecATGDefaultCategory_PT = {};
    for (const iterator of products) {
        if(iterator.DWGPlanView || iterator.ThreeDDXF){
            specificationCount++;
            if(SpecATGDefaultCategory_PT[iterator.ProductATGDefaultCategory_PT]){
                SpecATGDefaultCategory_PT[iterator.ProductATGDefaultCategory_PT] = SpecATGDefaultCategory_PT[iterator.ProductATGDefaultCategory_PT] + 1;
            }else{
                SpecATGDefaultCategory_PT[iterator.ProductATGDefaultCategory_PT] = 1
            }
        }
    }
    let result = Object.keys(SpecATGDefaultCategory_PT).map((key) => {
        return {"count":SpecATGDefaultCategory_PT[key], "value": key}
    });
    return {result,specificationCount};
}


export default products;