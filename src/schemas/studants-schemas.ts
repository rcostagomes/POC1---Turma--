import Joi from "joi";

export const StudantSchema = Joi.object({
    name: Joi.string().min(1).required(),
    turma: Joi.string().min(1).required()
})