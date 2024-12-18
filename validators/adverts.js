import Joi from "joi";

export const addAdvertValidator = Joi.object({
    title: Joi.string().required(),
    media: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required().valid("electronics", "clothing", "interior", "accessories", "automoblie", "kitchen", "art", "food", "construction")
});

export const updateAdvertValidator = Joi.object({
    title: Joi.string(),
    media: Joi.string(),
    description: Joi.string(),
    price: Joi.string(),
    category: Joi.string()
});