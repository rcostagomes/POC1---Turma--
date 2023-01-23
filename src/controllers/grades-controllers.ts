import { connection } from "../database/database.js";
import { Request, Response } from "express";
import { studantExist } from "../middlewares/studant-middlewares.js";
import { Grades } from "../protocols/grades.js";
async function updateGrade(req: Request, res: Response) {
  const { name } = req.params;
  const { nota1, nota2, nota3, nota4 } = req.body;

  const studant = await studantExist(name);
  if (!studant[0]) {
    return res.status(404).send({ message: "Aluno não encontrado" });
  }

  const studantGrades: Grades = {
    nota1: nota1,
    nota2: nota2,
    nota3: nota3,
    nota4: nota4,
  };

  await connection.query(
    `UPDATE notas SET nota1 =  ${studantGrades.nota1},
    nota2 = ${studantGrades.nota2}, 
    nota3 = ${studantGrades.nota3},
    nota4 = ${studantGrades.nota4}
    WHERE "alunoId" = $1`,
    [studant[0].id]
  );

  res.sendStatus(200)
}

async function studantAproved(req:Request, res:Response) {
    const {name} = req.params;
    const studant = await studantExist(name);
    if (!studant[0]) {
      return res.status(404).send({ message: "Aluno não encontrado" });
    }
    const grades = await connection.query(`SELECT  nota1 + nota2 + nota3 + nota4 as total FROM notas  WHERE "alunoId" = $1`,[studant[0].id])
    if(grades.rows[0].total / 4 >= 7){
        return res.status(200).send({message:`${name} está aprovado `})
    }

    return res.status(200).send({message:`${name} está reprovado `})

}


export { updateGrade, studantAproved };
