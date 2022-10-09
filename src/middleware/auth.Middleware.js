import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    if (
      !!req.headers.bot_token &&
      process.env.BOT_TOKEN === req.headers.bot_token
    ) {
      return next();
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Не авторизован',
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (e) {
    res.status(401).json({
      message: 'Не авторизован',
    });
  }
};
