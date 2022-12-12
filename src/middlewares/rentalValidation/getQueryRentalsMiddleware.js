import connection from "../../database/db.js";

async function getQueryRentals(req, id, label) {
  try {
    return await connection.query(
      `
      SELECT 
        r.*, c.id as "cId", c.name as "customerName", g.id as "gameId",
        g.name as "gameName" , g."categoryId", cat.name
      FROM rentals r
      JOIN customers c ON r."customerId" = c.id
      JOIN games g ON r."gameId" = g.id
      JOIN categories cat ON g."categoryId" = cat.id
      WHERE ${label} = $1;
      `,
      [id]
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export default async function getQueryRentalsMiddleware(req, res, next) {
  let rentals = undefined;
  if (req.query.customerId) {
    rentals = await getQueryRentals(res, req.query.customerId, "c.id");
  }

  if (req.query.gameId) {
    rentals = await getQueryRentals(res, req.query.gameId, "g.id");
  }

  req.rentals = rentals;
  next();
}
