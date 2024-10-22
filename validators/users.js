import Joi from "joi";

export const registerUserValidator = Joi.object({
  businessName: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "vendor")
});

export const loginUserValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const updateProfileValidator = Joi.object({
    userName: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string()
});