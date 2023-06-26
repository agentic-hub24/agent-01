// Secret key used to sign the JWT tokens
const secretKey = process.env.API_SECRET_KEY;

// Middleware function to verify the JWT token from the request headers
export function authMiddleware(req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    console.log('token is here ', secretKey, token);
    if (token === secretKey) {
      next();
    } else {
      throw "Invalid token";
    }
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}
