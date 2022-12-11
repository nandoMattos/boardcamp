import connection from "../database/db.js";

export async function getCategories(req, res) {
  const categories = await connection.query(`
    SELECT * 
    FROM categories;
  `);
  res.send(categories.rows);
}

export async function postCategory(req, res) {
  const name = req.name;

  connection.query(
    `
    INSERT INTO categories
    (name)
    VALUES
    ($1);
  `,
    [name]
  );

  res.sendStatus(201);
}
