  import { Request, Response } from "express";
  import { StudantSchema } from "../schemas/studants-schemas.js";
  import {
    findStudants,
    insertStudant,
    studantDelete,
    studantGrades,
  } from "../repositories/studants-repository.js";
  import {
    studantExist,
    studantExistId,
  } from "../middlewares/studant-middlewares.js";
import { gradesDelete, GradeStudantId } from "../repositories/grades-repositorys.js";

  async function insertStudants(req: Request, res: Response) {
    const newStudant = req.body;
    const name = newStudant.name;
    const turma = newStudant.turma;
    const { error } = StudantSchema.validate(newStudant);
    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }

    try {
      const exist = await studantExist(newStudant.name);

      if (exist) {
        return res.status(409).send({ message: "aluno já está cadastrado" });
      }
      await insertStudant(name, turma);

      res.status(200).send({ message: "Aluno Cadastrado" });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }

  async function deletStudant(req: Request, res: Response) {
    const { id } = req.params;
    const numberId = parseInt(id);

    const studant = await studantExistId(numberId);
    if (!studant.name) {
      return res.status(404).send({ message: "Aluno não encontrado" });
    }

    try {
      const getGradeStudantId = await GradeStudantId(numberId)
      await gradesDelete(getGradeStudantId);
      await studantDelete(numberId);
      
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }

  async function getStudantGrades(req: Request, res: Response) {
    const { id } = req.params as any;
    const numberId = parseInt(id);
    const result = await studantGrades(numberId);
    res.status(200).send(result);
  }

  async function getAllStudants(req: Request, res: Response) {
    const result = await findStudants();
    res.status(200).send(result);
  }

  export { getAllStudants, insertStudants, deletStudant, getStudantGrades };
