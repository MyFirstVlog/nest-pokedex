import * as Joi from 'joi'

//? Crear validation schema que evalua atributos de un objeto

export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIIT: Joi.number().default(6)
})