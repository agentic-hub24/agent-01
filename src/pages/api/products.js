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
      const countPerEachPage = process.env.CountPerEachPage;
      let bodyData = {
        count: true,
        top: 1000,
        skip: 0,
        search: '*',
        facets: [
          'RegionProductCategoryLocal_esMX,count:100',
          'RegionProductCategoryLocal,count:100',
          'ProductNewProduct,count:100',
          'TouchlessFaucet,count:100',
          'TouchlessFaucet_esMX,count:100',
          'BowlShape,count:100',
          'BowlShape_esMX,count:100',
          'HandleStyle,count:100',
          'HandleStyle_esMX,count:100',
          'BidetFunctionality,count:100',
          'BidetFunctionality_esMX,count:100',
          'SKUColorFinishCode,count:100',
          'ProductProductType,count:100',
          'ProductProductType_esMX,count:100',
          'ProductOverallWidthMm,count:100',
          'ProductOverallLengthMm,count:100',
          'ProductMaterial,count:100',
          'ProductMaterial_esMX,count:100',
          'ProductShape,count:100',
          'ProductShape_esMX,count:100',
          'ProductInstallationType,count:100',
          'ProductInstallationType_esMX,count:100',
          'ProductLitersPerMinute,count:100',
          'SprayType,count:100',
          'SprayType_esMX,count:100',
          'ProductNumberofHandles,count:100',
          'ProductConfiguration,count:100',
          'ProductConfiguration_esMX,count:100',
          'NightLight,count:100',
          'NightLight_esMX,count:100',
          'IntelligentToilet,count:100',
          'IntelligentToilet_esMX,count:100',
          'LitersPerFlush,count:100',
          'NumberOfHoles,count:100'
        ],
        filter: ''
      };
      // req.body = JSON.parse(req.body);
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
      if (req.body.RegionProductCategoryLocal_esMX) {
        filterData += `RegionProductCategoryLocal_esMX eq '${req.body.RegionProductCategoryLocal_esMX}' `;
      }

      if (req.body.RegionProductCategoryLocal) {
        filterData += `RegionProductCategoryLocal eq '${req.body.RegionProductCategoryLocal}' `;
      }

      if (req.body.SKUColorFinishCode) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `SKUColorFinishCode eq '${req.body.SKUColorFinishCode}' `;
      }

      if (req.body.ProductNewProduct) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductNewProduct eq '${req.body.ProductNewProduct}'`;
      }

      if (req.body.TouchlessFaucet_esMX) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `TouchlessFaucet_esMX eq '${req.body.TouchlessFaucet_esMX}'`;
      }

      if (req.body.TouchlessFaucet) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `TouchlessFaucet eq '${req.body.TouchlessFaucet}'`;
      }

      if (req.body.BowlShape) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `BowlShape eq '${req.body.BowlShape}'`;
      }

      if (req.body.BowlShape_esMX) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `BowlShape_esMX eq '${req.body.BowlShape_esMX}'`;
      }

      if (req.body.HandleStyle) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `HandleStyle eq '${req.body.HandleStyle}'`;
      }
      if (req.body.HandleStyle_esMX) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `HandleStyle_esMX eq '${req.body.HandleStyle_esMX}'`;
      }

      if (req.body.BidetFunctionality) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `BidetFunctionality eq '${req.body.BidetFunctionality}'`;
      }

      if (req.body.BidetFunctionality_esMX) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `BidetFunctionality_esMX eq '${req.body.BidetFunctionality_esMX}'`;
      }

      if (req.body.ProductInstallationType) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductInstallationType eq '${req.body.ProductInstallationType}' `;
      }

      if (req.body.ProductInstallationType_esMX) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductInstallationType_esMX eq '${req.body.ProductInstallationType_esMX}' `;
      }

      if (req.body.ProductProductType) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductProductType eq '${req.body.ProductProductType}' `;
      }

      if (req.body.ProductProductType_esMX) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductProductType_esMX eq '${req.body.ProductProductType_esMX}' `;
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
        filterData += `ProductMaterial eq '${req.body.ProductMaterial}' `;
      }

      if (req.body.ProductMaterial_esMX) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductMaterial_esMX eq '${req.body.ProductMaterial_esMX}' `;
      }

      if (req.body.ProductShape) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductShape eq '${req.body.ProductShape}' `;
      }

      if (req.body.ProductShape_esMX) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductShape_esMX eq '${req.body.ProductShape_esMX}' `;
      }

      if (req.body.ProductLitersPerMinute) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductLitersPerMinute eq '${req.body.ProductLitersPerMinute}' `;
      }

      if (req.body.SprayType) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `SprayType eq '${req.body.SprayType}'`;
      }

      if (req.body.SprayType_esMX) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `SprayType_esMX eq '${req.body.SprayType_esMX}'`;
      }

      if (req.body.ProductNumberofHandles) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductNumberofHandles eq '${req.body.ProductNumberofHandles}'`;
      }

      if (req.body.ProductConfiguration) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductConfiguration eq '${req.body.ProductConfiguration}'`;
      }

      if (req.body.ProductConfiguration_esMX) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `ProductConfiguration_esMX eq '${req.body.ProductConfiguration_esMX}'`;
      }

      if (req.body.NightLight) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `NightLight eq '${req.body.NightLight}'`;
      }

      if (req.body.NightLight_esMX) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `NightLight_esMX eq '${req.body.NightLight_esMX}'`;
      }

      if (req.body.LitersPerFlush) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `LitersPerFlush eq '${req.body.LitersPerFlush}'`;
      }

      if (req.body.toilet_type) {
        filterData += filterData != '' ? 'and ' : '';

        filterData += `ProductInstallationType eq '${req.body.toilet_type}' or IntelligentToilet eq '${req.body.toilet_type}' or ProductConfiguration eq '${req.body.toilet_type}' `;
      }

      if (req.body.toilet_type_esMX) {
        filterData += filterData != '' ? 'and ' : '';

        filterData += `ProductInstallationType_esMX eq '${req.body.toilet_type_esMX}' or IntelligentToilet_esMX eq '${req.body.toilet_type_esMX}' or ProductConfiguration_esMX eq '${req.body.toilet_type_esMX}' `;
      }

      if (req.body.NumberOfHoles) {
        filterData += filterData != '' ? 'and ' : '';
        filterData += `NumberOfHoles eq '${req.body.NumberOfHoles}'`;
      }
      bodyData['filter'] = filterData;

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
        if (req.body.search) {
          // here need to fetch specification data
          const { result, specificationCount } = await getSpecificationCount(
            bodyData
          );
          response['@search.facets']['SpecATGDefaultCategory_esMX'] = result;
          response['searchResults']['productsCount'] = productsCount;
          response['searchResults']['specificationCount'] = specificationCount;
          response['searchResults']['totalSearchResults'] =
            productsCount + specificationCount;
        }

        if (response['@search.facets']['IntelligentToilet'].length) {
          response['@search.facets']['IntelligentToilet'] = response[
            '@search.facets'
          ]['IntelligentToilet'].filter(item => {
            if (
              item.value === 'Sí' ||
              item.value === 'Yes' ||
              item.value === 'Yeah'
            ) {
              return item;
            }
          });
        }
        response['@search.facets']['toilet_type'] = [
          ...response['@search.facets']['ProductConfiguration'],
          ...response['@search.facets']['ProductInstallationType'],
          ...response['@search.facets']['IntelligentToilet']
        ];

        if (response['@search.facets']['IntelligentToilet_esMX'].length) {
          response['@search.facets']['IntelligentToilet_esMX'] = response[
            '@search.facets'
          ]['IntelligentToilet_esMX'].filter(item => {
            if (
              item.value === 'Sí' ||
              item.value === 'Yes' ||
              item.value === 'Yeah'
            ) {
              return item;
            }
          });
        }
        response['@search.facets']['toilet_type_esMX'] = [
          ...response['@search.facets']['ProductConfiguration_esMX'],
          ...response['@search.facets']['ProductInstallationType_esMX'],
          ...response['@search.facets']['IntelligentToilet_esMX']
        ];
      }
      return res.status(200).json({ response: response });
    } catch (error) {
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

async function getSpecificationCount(bodyData) {
  bodyData['top'] = 2000;
  let response = await apiCalling(bodyData, process.env.ACS_PLP_API_URL);
  let products = response.value;
  let specificationCount = 0;
  const SpecATGDefaultCategory_esMX = {};
  for (const iterator of products) {
    if (iterator.DWGPlanView || iterator.ThreeDDXF) {
      specificationCount++;
      if (SpecATGDefaultCategory_esMX[iterator.RegionProductCategoryLocal]) {
        SpecATGDefaultCategory_esMX[iterator.RegionProductCategoryLocal] =
          SpecATGDefaultCategory_esMX[iterator.RegionProductCategoryLocal] + 1;
      } else {
        SpecATGDefaultCategory_esMX[iterator.RegionProductCategoryLocal] = 1;
      }
    }
  }
  let result = Object.keys(SpecATGDefaultCategory_esMX).map(key => {
    return { count: SpecATGDefaultCategory_esMX[key], value: key };
  });
  return { result, specificationCount };
}

export default products;
