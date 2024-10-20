import Joi from "joi";

export const registerUserValidator = Joi.object({
  userName: Joi.string().required(),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "vendor")
});

export const loginUserValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


export const updateProfile = joi.object({
    userName: Joi.string().required(),
    fullName: Joi.string().required(),
    avatar: Joi.string()
})