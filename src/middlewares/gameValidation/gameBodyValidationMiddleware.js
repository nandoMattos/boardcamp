import connection from "../../database/db.js";
import gameSchema from "../../models/gameSchema.js";

export default function gameBodyValidationMiddleware(req, res, next) {
  const { error } = gameSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((d) => d.message));
    return;
  }

  req.game = req.body;
  next();
}
