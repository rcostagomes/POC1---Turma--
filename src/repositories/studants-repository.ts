import { connection } from "../database/database.js";

async function findStudants() {
  try {
    const allStudants = await connection.query(`SELECT * FROM alunos`);
    return allStudants.rows;
  } catch (err) {
    console.log(err);
  }
}



async function studantGrades(id: string) {
  try {
  const grades = await connection.query(
      `SELECT alunos.name, alunos.turma,notas.nota1, notas.nota2 , notas.nota3, notas.nota4 FROM notas JOIN alunos ON alunos.id = notas."alunoId" WHERE "alunoId" = $1`,
      [id]
    );
    return grades.rows
  } catch (err) {
    console.log(err);
  }
}

export { findStudants, studantGrades };
