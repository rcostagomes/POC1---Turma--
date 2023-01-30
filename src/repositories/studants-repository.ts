import client from "../database/database.js";

async function insertStudant(name: string, turma: string) {
  await client.alunos.create({
    data: {
      name: name,
      turma: turma,
    },
  });

  const studantId = await client.alunos.findFirst({
    where: {
      name: name,
    },
  });
  await client.notas.create({
    data: {
      alunoId: studantId.id,
    },
  });
  return;
}

async function findStudants() {
  return await client.alunos.findMany();
}

async function studantGrades(id: number) {
  const grade = await client.alunos.findUnique({
    where: { id },
    select: {
      name: true,
      turma: true,
      notas: {
        select: {
          nota1: true,
          nota2: true,
          nota3: true,
          nota4: true,
        },
      },
    },
  });
  return grade;
}

async function studantDelete(id: number) {
  console.log("AQUI", id);
  await client.alunos.deleteMany({
    where: {
      id: id,
    },
  });
  return;
}

export { findStudants, studantGrades, insertStudant, studantDelete };
