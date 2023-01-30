import { Request, Response } from "express";
import { studantExist, studantGrade } from "../middlewares/studant-middlewares.js";
import { Grades } from "../protocols/grades.js";
import { statusStudant, UpdateGrades } from "../repositories/grades-repositorys.js";
async function updateGrade(req: Request, res: Response) {
  const { name } = req.params;
  const { nota1, nota2, nota3, nota4 } = req.body;

  const studant = await studantExist(name);
  if (!studant.name) {
    return res.status(404).send({ message: "Aluno não encontrado" });
  }

  const studantGrades:Grades = {
    nota1: nota1,
    nota2: nota2,
    nota3: nota3,
    nota4: nota4,
  };

  const alunoId = studant.id
  const getId = await studantGrade(alunoId)
  const id = getId.id
  await UpdateGrades(id,studantGrades)
  res.sendStatus(200)
}

async function studantAproved(req:Request, res:Response) {
    const {name} = req.params;
    const studant = await studantExist(name);
    if (!studant.name) {
      return res.status(404).send({ message: "Aluno não encontrado" });
    }
    const totalGrades:any = await statusStudant(studant.id)
    if(totalGrades / 4 >= 7){
        return res.status(200).send({message:`${name} está aprovado `})
    }

   return res.status(200).send({message:`${name} está reprovado `})
}

export { studantAproved,updateGrade};
