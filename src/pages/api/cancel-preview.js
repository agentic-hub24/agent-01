export default function handler(req, res) {
  const { redirect } = req.query;
  res.clearPreviewData();
  res.redirect('/es');
  // res.redirect(encodeURI(redirect) || '/en');
}
