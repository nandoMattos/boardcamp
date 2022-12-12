import connection from "../../database/db.js";

export default async function gameIsAvailableValidationMiddleware(
  req,
  res,
  next
) {
  try {
    const gameSchedule = connection.query(`
      SELECT g.id, g."inStock", r."returnDate"
      FROM games g
      JOIN rentals r ON r."gameId" = g.id;
    `);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
