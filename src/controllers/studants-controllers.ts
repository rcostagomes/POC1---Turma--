import { Request, Response } from "express";
import { Studant } from "../protocols/studants.js";
import { StudantSchema } from "../schemas/studants-schemas.js";
import { connection } from "../database/database.js";
import {
  findStudants,
  studantGrades,
} from "../repositories/studants-repository.js";
import { studantExist } from "../middlewares/studant-middlewares.js";

async function insertStudant(req: Request, res: Response) {
  const newStudant = req.body as Studant;
  const { error } = StudantSchema.validate(newStudant);
  if (error) {
    return res.status(400).send({
      message: error.message,
    });
  }

 

  try {
    const exist = await studantExist(newStudant.name);
    if (exist[0]) {
      return res.status(409).send({ message: "aluno já está cadastrado" });
    }

    await connection.query(`INSERT INTO alunos (name,turma) VALUES ($1,$2)`, [
      newStudant.name,
      newStudant.turma,
    ]);
    const studantId = await connection.query(
      `SELECT id FROM alunos WHERE name = $1`,
      [newStudant.name]
    );
    await connection.query(`INSERT INTO notas ("alunoId") VALUES ($1)`, [
      studantId.rows[0].id,
    ]);

    res.status(200).send({ message: "Aluno Cadastrado" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

async function deletStudant(req: Request, res: Response) {
  const { name } = req.params;

  const studant = await studantExist(name)
  if(!studant[0]){
    return res.status(404).send({message:"Aluno não encontrado"})
  }
 
  try {
    await connection.query(`DELETE FROM notas WHERE "alunoId" = $1`,[studant[0].id])
    await connection.query(`DELETE FROM alunos WHERE name= $1`, [name]);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

async function getStudantGrades(req: Request, res: Response) {
  const { id } = req.params;
  const result = await studantGrades(id);
  res.status(200).send(result);
}

async function getAllStudants(req: Request, res: Response) {
  const result = await findStudants();
  res.status(200).send(result);
}

export { getAllStudants, insertStudant, deletStudant, getStudantGrades };
