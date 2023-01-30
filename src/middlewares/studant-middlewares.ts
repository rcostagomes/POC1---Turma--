import client from "../database/database.js";

async function studantExist(name: string) {
  
     return client.alunos.findFirst({
      where: {
        name: name
      }
     })
  } 

  async function studantExistId(id:number) {
  
    return client.alunos.findFirst({
     where: {
       id
     }
    })
 } 


async function studantGrade(alunoId:number) {
return client.notas.findFirst({
  where:{alunoId}
})
}
export {studantExist,studantGrade,studantExistId}