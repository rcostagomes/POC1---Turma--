import { connection } from "../database/database.js";

async function studantExist(name: string) {
  try {
    const studant = await connection.query(`SELECT * FROM alunos WHERE name = $1`,[name])
  return studant.rows;
  } catch (err) {
    console.log(err);
  }
}
export {studantExist}