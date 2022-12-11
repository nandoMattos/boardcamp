import connection from "../../database/db.js";

export default async function categoryExistsValidationMiddleware(
  req,
  res,
  next
) {
  const name = req.name;

  try {
    const categoryExists = await connection.query(
      `
      SELECT *
      FROM categories
      WHERE name LIKE $1;
    `,
      [name.replace("ã", "_")]
    );

    if (categoryExists.rows[0]) {
      res.status(409).send("Categoria já existe.");
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
