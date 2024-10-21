import { AdvertModel } from "../models/adverts.js";
import { addAdvertValidator, updateAdvertValidator } from "../validators/adverts.js";

export const addAdvert = async (req, res, next) => {
    try {
        // Validate vendor inputs
        const { error, value } = addAdvertValidator.validate({
            ...req.body,
            media: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Write advert to database
        await AdvertModel.create(value);
        // Respond to request
        res.status(201).json("Advert was added!");
    } catch (error) {
        next(error);
    }
}

export const getAdverts = async (req, res, next) => {
    try {
        const { filter = "{}", limit = 10, skip = 0 } = req.query;
        // Fetch ads from database 
        const adverts = await AdvertModel
            .find(JSON.parse(filter))
            .limit(limit)
            .skip(skip);
        // Return response
        res.status(200).json(adverts);
    } catch (error) {
        next(error);
    }
}

export const getAdvertById = async (req, res, next) => {
    try {
        // Fetch a book for database
        const advert = await AdvertModel.findById(req.params.id);
        // Return Response
        res.status(200).json(advert);
    } catch (error) {
        next(error);
    }
}

export const updateAdvert = async (req, res, next) => {
    try {
        const { error, value } = updateAdvertValidator.validate({
            ...req.body,
            media: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        await AdvertModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json("Advert updated!");
    } catch (error) {
        next(error);
    }
}

export const deleteAdvert = async (req, res, next) => {
    try {
        await AdvertModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Advert was deleted!");
    } catch (error) {
        next(error);
    }
}