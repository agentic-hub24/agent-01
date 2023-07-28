// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { redirect } = req.query;
  res.setPreviewData({ preview: true });
  res.redirect(encodeURI(redirect) || 'en');
}
