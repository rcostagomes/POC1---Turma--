import express from "express";
import { studantAproved, updateGrade } from "./controllers/grades-controllers.js";
import { deletStudant, getAllStudants, getStudantGrades, insertStudant } from "./controllers/studants-controllers.js";
const server = express();
server.use(express.json());

server.post("/studant",insertStudant)

server.put("/notas/:name",updateGrade)

server.get("/notas/:id",getStudantGrades)

server.delete("/studant/:name",deletStudant)

server.get("/studants", getAllStudants);

server.get("/status/:name",studantAproved)

server.listen(2000, () => {
  console.log("server runing in port 2000");
});
