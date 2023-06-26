// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { redirect: pageUrl } = req.query;
  res.setPreviewData({ preview: true });
  let redirectPath = '';
  if (pageUrl) {
    if (pageUrl === '//') {
      redirectPath = '/';
    } else {
      redirectPath = pageUrl.replace('/', '');
    }
  } else {
    redirectPath = '/not-found';
  }
  res.redirect(307, encodeURI(redirectPath));
}
