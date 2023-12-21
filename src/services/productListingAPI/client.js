import { removeQuotesFromString } from '@utils/footerUtils';

export async function getProductListing(requestBody) {
  let newObj = {};
  for (let i in requestBody) {
    newObj[i] = removeQuotesFromString(requestBody[i]);
  }
  try {
    const apiBaseURL = process.env.API_BASEURL;
    const res = await fetch(`${apiBaseURL}/api/products`, {
      method: 'POST',
      headers: {
        mode: 'no-cors',
        Authorization: process.env.API_AUTH,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newObj)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getProductCategory(requestBody) {
  try {
    const apiBaseURL = process.env.API_BASEURL;
    const res = await fetch(`${apiBaseURL}/api/categories`, {
      method: 'POST',
      headers: {
        mode: 'no-cors',
        Authorization: process.env.API_AUTH,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
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

export async function getYoutubeMetaData(id) {
  try {
    const apiBaseURL = process.env.API_BASEURL;
    const res = await fetch(`${apiBaseURL}/api/youtube?id=${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getSuggestions(requestBody) {
  try {
    const apiBaseURL = process.env.API_BASEURL;
    const res = await fetch(`${apiBaseURL}/api/suggestions`, {
      method: 'POST',
      headers: {
        mode: 'no-cors',
        Authorization: process.env.API_AUTH,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
