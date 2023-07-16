import JWT from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } else {
        req.body.userId = decode.userId;
        console.log(decode.userId);
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      success: false,
      message: "Auth Failed",
      err,
    });
  }
};
