import connection from "../../database/db.js";

export default async function gameExistsValidationMiddleware(req, res, next) {
  const { name } = req.game;
  try {
    const gameExists = await connection.query(
      `
      SELECT *
      FROM games 
      WHERE name LIKE $1;
    `,
      [name.replace("ç", "_").replace("ã", "_")]
    );

    if (gameExists.rows[0]) {
      res.status(409).send("Jogo já existente.");
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
