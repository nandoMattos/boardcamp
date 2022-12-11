import connection from "../database/db.js";
import categorySchema from "../models/categorySchema.js";

export default async function categoryValidationMiddleware(req, res, next) {
  const { name } = req.body;

  const { error } = categorySchema.validate({ name }, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((d) => d.message));
    return;
  }

  try {
    const categoryExists = await connection.query(
      `
      SELECT *
      FROM categories
      WHERE name LIKE $1;
    `,
      [name]
    );

    if (categoryExists.rows[0]) {
      res.status(409).send("Categoria já existe.");
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  req.name = name;
  next();
}
