import connection from "../../database/db.js";

export default async function gameIsAvailableValidationMiddleware(
  req,
  res,
  next
) {
  const { gameId } = req.rentalInfo;
  try {
    const gamesRented = await connection.query(
      `
      SELECT g."stockTotal"
      FROM games g
      JOIN rentals r ON r."gameId" = g.id
      WHERE g.id = $1 AND r."returnDate" IS NULL; 
    `,
      [gameId]
    );

    if (
      gamesRented.rowCount != 0 &&
      gamesRented.rows[0].stockTotal <= gamesRented.rowCount
    ) {
      res.status(400).send("Sem estoque.");
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
