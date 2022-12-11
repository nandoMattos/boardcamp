import connection from "../../database/db.js";
import categorySchema from "../../models/categorySchema.js";

export default async function categoryBodyValidationMiddleware(req, res, next) {
  const { name } = req.body;

  const { error } = categorySchema.validate({ name }, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((d) => d.message));
    return;
  }

  req.name = name;
  next();
}
