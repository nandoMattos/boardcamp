import connection from "../../database/db.js";

export default async function idCategoryExistsValidationMiddleware(
  req,
  res,
  next
) {
  const { categoryId } = req.game;
  try {
    const categoryExists = await connection.query(
      `
      SELECT *
      FROM categories
      WHERE id = $1;
    `,
      [categoryId]
    );

    if (!categoryExists.rows[0]) {
      res.status(400).send("Categoria não encontrada.");
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
