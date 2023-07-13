export async function getProductListing(requestBody) {
  try {
    const apiBaseURL = process.env.API_BASEURL;
    const res = await fetch(`${apiBaseURL}/api/products`, {
      method: 'POST',
      headers: {
        mode: 'no-cors',
        Authorization: process.env.API_AUTH,
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(requestBody)
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

export async function getYoutubeMetaData(id) {
  try {
    const key = process.env.YOUTUBE_API_KEY;
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${key}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
