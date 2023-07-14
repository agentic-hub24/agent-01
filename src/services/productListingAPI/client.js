import { removeQuotesFromString } from '@utils/footerUtils';

export async function getProductListing(requestBody) {
  var newObj = {};
  for (var i in requestBody) {
    newObj[i] = removeQuotesFromString(requestBody[i]);
  }
  try {
    console.log('process.env.API_AUTH ', process.env.API_AUTH);
    const apiBaseURL = process.env.API_BASEURL;
    const res = await fetch(`${apiBaseURL}/api/products`, {
      method: 'POST',
      headers: {
        mode: 'no-cors',
        Authorization: process.env.API_AUTH,
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(newObj)
    });
    const data = await res.json();
    console.log('fron end getting res ');
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getProductCategory(slug) {
  try {
    const apiBaseURL = process.env.API_BASEURL;
    const res = await fetch(`${apiBaseURL}/api/categories`, {
      method: 'POST',
      headers: {
        mode: 'no-cors',
        Authorization: process.env.API_AUTH,
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ ProductSection_PT: slug })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getProductDetails(lang, value) {
  try {
    const apiBaseURL = process.env.API_BASEURL;
    const res = await fetch(
      `${apiBaseURL}/api/pdp?lang=${lang}&value=${value}`,
      {
        method: 'GET',
        headers: {
          mode: 'no-cors',
          Authorization: process.env.API_AUTH,
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
