import express from "express";
import { studantAproved,updateGrade } from "./controllers/grades-controllers.js";
import { deletStudant, getAllStudants, getStudantGrades, insertStudants } from "./controllers/studants-controllers.js";
const server = express();
server.use(express.json());

server.post("/studant",insertStudants)

server.put("/notas/:name",updateGrade)

server.get("/notas/:id",getStudantGrades)

server.delete("/studant/:id",deletStudant)

server.get("/studants", getAllStudants);

server.get("/status/:name",studantAproved)

server.listen(4000, () => {
  console.log("server runing in port 4000");
});
