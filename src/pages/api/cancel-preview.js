export default function handler(req, res) {
  const { redirect } = req.query;
  res.clearPreviewData();
  const url = redirect ? encodeURI(redirect) : '/';
  res.redirect(url);
}
