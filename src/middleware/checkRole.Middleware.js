import { jwt } from 'jsonwebtoken';

export default (role) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({
          message: 'Не авторизован',
        });
      }
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      if (decode.role !== role) {
        return res.status(403).json({
          message: 'Нет доступа',
        });
      }
      res.user = decode;
      next();
    } catch (e) {
      return res.status(401).json({
        message: 'Не авторизован',
      });
    }
  };
};
