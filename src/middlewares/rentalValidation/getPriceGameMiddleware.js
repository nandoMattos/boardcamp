import connection from "../../database/db.js";

export default async function getPriceGameMiddleware(req, res, next) {
  const { gameId } = req.rentalInfo;

  try {
    const gamePrice = await connection.query(
      `
      SELECT "pricePerDay"
      FROM games
      WHERE id = $1
    `,
      [gameId]
    );

    req.pricePerDay = gamePrice.rows[0];
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
