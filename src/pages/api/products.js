
import { authMiddleware } from './middlewareAuth';

/**
 * Method - POST
 * @param {*} req
 * "search": "",
 * "orderby":"",
 * "ProductSection_esMX":""
 * "RegionProductCategoryLocal":"",
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
  authMiddleware(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        res.status(405).send({ error: 'Only POST requests allowed' });
        return;
      }

      if (!req.body.lang || req.body.lang == '' || req.body.lang == null) {
        res.status(405).send({ error: 'lang field is required.' });
      }
      const lang = req.body.lang;
      const facets = process.env.Facets_Common_Fields.split('__');
      const extra_facets = (
        lang === 'en'
          ? process.env.Facets_English_Fields
          : process.env.Facets_Spanish_Fields
      ).split('__');

      const countPerEachPage = process.env.CountPerEachPage;
      let bodyData = {
        count: true,
        top: 1000,
        skip: 0,
        search: '*',
        facets: [...facets, ...extra_facets],
        filter: '',
        select: process.env.Common_Fields,
        searchMode: 'all'
      };
      bodyData['select'] +=
        lang === 'en'
          ? ',' + process.env.English_Fields
          : ',' + process.env.Spanish_Fields;

      if (req.body.search) {
        bodyData['search'] = req.body.search;
        if (!isNaN(req.body.search) && req.body.search.length > 4) {
          bodyData['search'] += '*';
        }
      }

      if (req.body.CurrentPage) {
        bodyData['skip'] = (req.body.CurrentPage - 1) * countPerEachPage;
        bodyData['top'] = countPerEachPage;
      }

      if (req.body.orderby) {
        bodyData['orderby'] = req.body.orderby;
      }

      let filterData = '';
      if (req.body.RegionProductCategoryLocal) {
        filterData += `RegionProductCategoryLocal${
          lang === 'en' ? '' : '_esMX'
        } eq '${req.body.RegionProductCategoryLocal}' `;
      }

      if (req.body.SKUColorFinishCode) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `SKUColorFinishCode eq '${req.body.SKUColorFinishCode}' `;
      }

      if (req.body.ProductNewProduct) {
        req.body.ProductNewProduct = ( req.body.ProductNewProduct === "True"  || req.body.ProductNewProduct ==="Sí") ?  "True" : "";
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductNewProduct eq '${req.body.ProductNewProduct}'`;
      }

      if (req.body.TouchlessFaucet) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `TouchlessFaucet${lang === 'en' ? '' : '_esMX'} eq '${
          req.body.TouchlessFaucet
        }'`;
      }

      if (req.body.BowlShape) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `BowlShape${lang === 'en' ? '' : '_esMX'} eq '${
          req.body.BowlShape
        }'`;
      }

      if (req.body.HandleStyle) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `HandleStyle${lang === 'en' ? '' : '_esMX'} eq '${
          req.body.HandleStyle
        }'`;
      }

      if (req.body.BidetFunctionality) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `BidetFunctionality${lang === 'en' ? '' : '_esMX'} eq '${
          req.body.BidetFunctionality
        }'`;
      }

      if (req.body.ProductInstallationType) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductInstallationType${
          lang === 'en' ? '' : '_esMX'
        } eq '${req.body.ProductInstallationType}'`;
      }

      if (req.body.ProductProductType) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductProductType${lang === 'en' ? '' : '_esMX'} eq '${
          req.body.ProductProductType
        }'`;
      }

      if (req.body.ProductOverallWidthMmMin) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductOverallWidthMm ge '${req.body.ProductOverallWidthMmMin}' and ProductOverallWidthMm le '${req.body.ProductOverallWidthMmMax}'`;
      }

      if (req.body.ProductOverallLengthMmMin) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductOverallLengthMm ge '${req.body.ProductOverallLengthMmMin}' and ProductOverallLengthMm le '${req.body.ProductOverallLengthMmMax}'`;
      }

      if (req.body.ProductMaterial) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductMaterial${lang === 'en' ? '' : '_esMX'} eq '${
          req.body.ProductMaterial
        }'`;
      }

      if (req.body.ProductShape) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductShape${lang === 'en' ? '' : '_esMX'} eq '${
          req.body.ProductShape
        }'`;
      }

      if (req.body.ProductLitersPerMinute) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductLitersPerMinute eq '${req.body.ProductLitersPerMinute}' `;
      }

      if (req.body.SprayType) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `SprayType${lang === 'en' ? '' : '_esMX'} eq '${
          req.body.SprayType
        }'`;
      }

      if (req.body.ProductNumberofHandles) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductNumberofHandles eq '${req.body.ProductNumberofHandles}'`;
      }

      if (req.body.ProductConfiguration) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductConfiguration${
          lang === 'en' ? '' : '_esMX'
        } eq '${req.body.ProductConfiguration}'`;
      }

      if (req.body.LitersPerFlush) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `LitersPerFlush eq '${req.body.LitersPerFlush}'`;
      }

      if (req.body.NightLight) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `NightLight${lang === 'en' ? '' : '_esMX'} eq '${
          req.body.NightLight
        }'`;
      }

      if (req.body.toilet_type) {
        req.body.toilet_type = (req.body.toilet_type=== "Intelligent") ? "Yes" : req.body.toilet_type;
        req.body.toilet_type = (req.body.toilet_type=== "Inteligente") ? "Sí" : req.body.toilet_type;
        
        filterData += filterData != '' ? 'and ' : '';

        filterData += `ProductInstallationType${
          lang === 'en' ? '' : '_esMX'
        } eq '${req.body.toilet_type}' or IntelligentToilet${
          lang === 'en' ? '' : '_esMX'
        } eq '${req.body.toilet_type}' or ProductConfiguration${
          lang === 'en' ? '' : '_esMX'
        } eq '${req.body.toilet_type}' `;
      }

      if (req.body.NumberOfHoles) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `NumberOfHoles${lang === 'en' ? '' : '_esMX'} eq '${
          req.body.NumberOfHoles
        }'`;
      }
      bodyData['filter'] = ((filterData.length) ? `${filterData} and `: '') + `ProductIsDiscontinued ne true and SKUDiscontinuedDate eq null` ;
     // bodyData['filter'] = filterData ;
      let response = await apiCalling(bodyData, process.env.ACS_PLP_API_URL);

      response['paginationData'] = {};
      response['searchResults'] = {};
      if (
        req.body.search &&
        req.body.search.includes('K-') &&
        response.value &&
        response.value.length == 0
      ) {
        response['searchResults']['suggestions'] =
          req.body.search.split('K-')[1];
      }

      if (response.value && response.value.length) {
        if (response.value.length === 1) {
          // pdp page data
          const ProductProductNo = response.value[0].ProductProductNo;
          const ProductDefaultSKU = response.value[0].ProductDefaultSKU;
          const SkuNumber = response.value[0].SkuNumber;
          const searchData = req.body.search;

          if (
            searchData === SkuNumber ||
            SkuNumber.includes(searchData) ||
            searchData === ProductDefaultSKU ||
            ProductDefaultSKU.includes(searchData) ||
            searchData === ProductProductNo ||
            ProductProductNo.includes(searchData)
          ) {
            response['searchResults']['PDP'] = ProductProductNo;
            response['searchResults']['suggestions'] = 'K-' +SkuNumber;
          }
        }

        let productsCount = response['@odata.count'];

        if (req.body.CurrentPage) {
          let CurrentPage = req.body.CurrentPage;
          const countOfPages = Math.ceil(productsCount / countPerEachPage);
          response['paginationData']['CurrentPage'] = CurrentPage;
          response['paginationData']['totalNumberOfPages'] = countOfPages;
          response['paginationData']['countPerEachPage'] = countPerEachPage;
        }

        // conversion of keys
        if (lang !== 'en') {
          response = await conversionKeys(response);
        }
        if (req.body.search) {
          // here need to fetch specification data
          const { result, specificationCount } = await getSpecificationCount(
            bodyData,
            lang
          );
          response['@search.facets']['SpecRegionProductCategoryLocal'] = result;
          response['searchResults']['productsCount'] = productsCount;
          response['searchResults']['specificationCount'] = specificationCount;
          response['searchResults']['totalSearchResults'] =
            productsCount + specificationCount;
        }

        response['@search.facets']['toilet_type'] =[];
        const bathroomSubCategories = (lang==="en") ? process.env.bathroomSubCategories.split(",") : process.env.bathroomSubCategories_esMX.split(",");
        if(!req.body.search && response['@search.facets']['ProductConfiguration'].length && response['@search.facets']['ProductInstallationType'].length && response['@search.facets']['IntelligentToilet'].length && (bathroomSubCategories.includes("Toilets") || bathroomSubCategories.includes("Sanitarios"))){
          response['@search.facets']['IntelligentToilet'] = response[
            '@search.facets'
          ]['IntelligentToilet'].filter(item => {
            if (
              item.value === 'Sí' ||
              item.value === 'Yes'
            ) {
              item.value = (item.value === "Yes") ? "Intelligent" : "Inteligente";
              return item;
            }
          });
          response['@search.facets']['toilet_type'].push(...response['@search.facets']['ProductConfiguration'], ...response['@search.facets']['ProductInstallationType'], ...response['@search.facets']['IntelligentToilet']);
          response['@search.facets']['ProductConfiguration'] = [];
          response['@search.facets']['ProductInstallationType'] = [];
          response['@search.facets']['IntelligentToilet'] = [];
        }
        response['@search.facets']['ProductNewProduct'] = response['@search.facets']['ProductNewProduct'].filter(item => {
          item.value = (lang === "en") ? "True" : "Sí";
          return item;
        })
      }

      return res.status(200).json({ response: response });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        error: 'There was an error-' + error.name + ':' + error.message
      });
    }
  });
};

export async function apiCalling(bodyData, url) {
  let response = await fetch(url, {
    body: JSON.stringify(bodyData),
    headers: {
      'api-key': process.env.ACS_API_KEY,
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'POST'
  });
  response = await response.json();
  if (response.error || response.status >= 400) {
    console.log('response error', response.error);
    throw response.error;
  }
  return response;
}

async function getSpecificationCount(bodyData, lang) {
  bodyData['top'] = 2000;
  let response = await apiCalling(bodyData, process.env.ACS_PLP_API_URL);
  let products = response.value;
  let specificationCount = 0;
  const SpecRegionProductCategoryLocal = {};
  const langsuf = lang === 'en' ? '' : '_esMX';
  for (const iterator of products) {
    if (iterator.DWGPlanView || iterator.ThreeDDXF) {
      specificationCount++;
      const loaclCat = iterator[`RegionProductCategoryLocal${langsuf}`];
      if (SpecRegionProductCategoryLocal[loaclCat]) {
        SpecRegionProductCategoryLocal[loaclCat] =
          SpecRegionProductCategoryLocal[loaclCat] + 1;
      } else {
        SpecRegionProductCategoryLocal[loaclCat] = 1;
      }
    }
  }
  let result = Object.keys(SpecRegionProductCategoryLocal).map(key => {
    return { count: SpecRegionProductCategoryLocal[key], value: key };
  });
  return { result, specificationCount };
}

export async function conversionKeys(response) {
  for (let i = 0; i < response.value.length; i++) {
    const iterator = response.value[i];
    const {
      ProductDescriptionProductShort_esMX,
      ProductLocalCategory_esMX,
      SKUColorFinishName_esMX,
      ProductMaterial_esMX,
      ProductProductType_esMX,
      ProductATGDefaultCategory_esMX,
      ProductSection_esMX,
      ProductInstallationType_esMX,
      ProductShape_esMX,
      SprayType_esMX,
      NightLight_esMX,
      NumberOfHoles_esMX,
      ProductConfiguration_esMX,
      IntelligentToilet_esMX,
      BowlShape_esMX,
      HandleStyle_esMX,
      BidetFunctionality_esMX,
      TouchlessFaucet_esMX,
      RegionProductCategoryLocal_esMX,
      RegionSubCategory_esMX
    } = iterator;

    const modifiedObj = {
      ProductDescriptionProductShort: ProductDescriptionProductShort_esMX,
      ProductLocalCategory: ProductLocalCategory_esMX,
      SKUColorFinishName: SKUColorFinishName_esMX,
      ProductMaterial: ProductMaterial_esMX,
      ProductProductType: ProductProductType_esMX,
      ProductATGDefaultCategory: ProductATGDefaultCategory_esMX,
      ProductSection: ProductSection_esMX,
      ProductInstallationType: ProductInstallationType_esMX,
      ProductShape: ProductShape_esMX,
      SprayType: SprayType_esMX,
      NightLight: NightLight_esMX,
      NumberOfHoles: NumberOfHoles_esMX,
      ProductConfiguration: ProductConfiguration_esMX,
      IntelligentToilet: IntelligentToilet_esMX,
      BowlShape: BowlShape_esMX,
      HandleStyle: HandleStyle_esMX,
      BidetFunctionality: BidetFunctionality_esMX,
      TouchlessFaucet: TouchlessFaucet_esMX,
      RegionProductCategoryLocal: RegionProductCategoryLocal_esMX,
      RegionSubCategory: RegionSubCategory_esMX
    };
    response.value[i] = { ...response.value[i], ...modifiedObj };

    delete response.value[i]['ProductDescriptionProductShort_esMX'];
    delete response.value[i]['ProductLocalCategory_esMX'];
    delete response.value[i]['SKUColorFinishName_esMX'];
    delete response.value[i]['ProductMaterial_esMX'];
    delete response.value[i]['ProductProductType_esMX'];
    delete response.value[i]['ProductATGDefaultCategory_esMX'];
    delete response.value[i]['ProductSection_esMX'];
    delete response.value[i]['ProductInstallationType_esMX'];
    delete response.value[i]['ProductShape_esMX'];
    delete response.value[i]['SprayType_esMX'];
    delete response.value[i]['NightLight_esMX'];
    delete response.value[i]['NumberOfHoles_esMX'];
    delete response.value[i]['ProductConfiguration_esMX'];
    delete response.value[i]['IntelligentToilet_esMX'];
    delete response.value[i]['BowlShape_esMX'];
    delete response.value[i]['HandleStyle_esMX'];
    delete response.value[i]['BidetFunctionality_esMX'];
    delete response.value[i]['TouchlessFaucet_esMX'];
    delete response.value[i]['RegionProductCategoryLocal_esMX'];
    delete response.value[i]['RegionSubCategory_esMX'];
  }

  response['@search.facets']['RegionProductCategoryLocal'] =
    response['@search.facets']['RegionProductCategoryLocal_esMX'];
  delete response['@search.facets']['RegionProductCategoryLocal_esMX'];

  response['@search.facets']['RegionSubCategory'] =
    response['@search.facets']['RegionSubCategory_esMX'];
  delete response['@search.facets']['RegionSubCategory_esMX'];

  response['@search.facets']['TouchlessFaucet'] =
    response['@search.facets']['TouchlessFaucet_esMX'];
  delete response['@search.facets']['TouchlessFaucet_esMX'];

  response['@search.facets']['BowlShape'] =
    response['@search.facets']['BowlShape_esMX'];
  delete response['@search.facets']['BowlShape_esMX'];

  response['@search.facets']['HandleStyle'] =
    response['@search.facets']['HandleStyle_esMX'];
  delete response['@search.facets']['HandleStyle_esMX'];

  response['@search.facets']['BidetFunctionality'] =
    response['@search.facets']['BidetFunctionality_esMX'];
  delete response['@search.facets']['BidetFunctionality_esMX'];

  response['@search.facets']['ProductInstallationType'] =
    response['@search.facets']['ProductInstallationType_esMX'];
  delete response['@search.facets']['ProductInstallationType_esMX'];

  response['@search.facets']['ProductProductType'] =
    response['@search.facets']['ProductProductType_esMX'];
  delete response['@search.facets']['ProductProductType_esMX'];

  response['@search.facets']['ProductMaterial'] =
    response['@search.facets']['ProductMaterial_esMX'];
  delete response['@search.facets']['ProductMaterial_esMX'];

  response['@search.facets']['ProductShape'] =
    response['@search.facets']['ProductShape_esMX'];
  delete response['@search.facets']['ProductShape_esMX'];

  response['@search.facets']['SprayType'] =
    response['@search.facets']['SprayType_esMX'];
  delete response['@search.facets']['SprayType_esMX'];

  response['@search.facets']['ProductConfiguration'] =
    response['@search.facets']['ProductConfiguration_esMX'];
  delete response['@search.facets']['ProductConfiguration_esMX'];

  response['@search.facets']['NightLight'] =
    response['@search.facets']['NightLight_esMX'];
  delete response['@search.facets']['NightLight_esMX'];

  response['@search.facets']['NumberOfHoles'] =
    response['@search.facets']['NumberOfHoles_esMX'];
  delete response['@search.facets']['NumberOfHoles_esMX'];

  response['@search.facets']['IntelligentToilet'] =
    response['@search.facets']['IntelligentToilet_esMX'];
  delete response['@search.facets']['IntelligentToilet_esMX'];

  return response;
}

export default products;
