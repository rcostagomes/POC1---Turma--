import client from "../database/database.js";
import { Grades } from "../protocols/grades.js";

async function GradeStudantId(id: number) {
  const aluno = await client.notas.findFirst({ where: { alunoId: id } });
  return aluno.id;
}

async function gradesDelete(id: number) {
  await client.notas.delete({
    where: { id: id },
  });
  return;
}

async function UpdateGrades(id: number, studantGrades: Grades) {
  await client.notas.update({
    where: { id },
    data: studantGrades,
  });
}

async function statusStudant(id: number) {
    let totalGrades:number;
const grades =  await client.alunos.findUnique({
    where: { id },
    select: {
      name: true,
      turma: true,
      notas: {
        select: {
          nota1:true,
          nota2:true,
          nota3:true,
          nota4:true
        },
      },
    },
  });
  const notas = grades.notas;
notas.map((nota)=> {
    const total = nota.nota1 + nota.nota2 + nota.nota3 + nota.nota4;
    totalGrades = total
} )

return totalGrades;
}

export { UpdateGrades, gradesDelete, GradeStudantId, statusStudant };
