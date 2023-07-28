export default function handler(req, res) {
  const { redirect } = req.query;
  console.log('redirect hee ', redirect);
  res.clearPreviewData();
  res.redirect('/es');
  // res.redirect(encodeURI(redirect) || '/en');
}
