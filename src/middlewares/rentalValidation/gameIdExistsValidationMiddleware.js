import connection from "../../database/db.js";

export default async function gameIdExistsValidationMiddleware(req, res, next) {
  const { gameId } = req.rentalInfo;

  try {
    const gameExists = await connection.query(
      `
      SELECT "pricePerDay"
      FROM games 
      WHERE id = $1
    `,
      [gameId]
    );

    if (!gameExists.rows[0]) {
      res.status(400).send("Jogo não existente.");
      return;
    }

    req.pricePerDay = gameExists.rows[0].pricePerDay;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
