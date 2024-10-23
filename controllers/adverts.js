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
        await AdvertModel.create({
            ...value,
            user: req.auth.id
        });
        // Respond to request
        res.status(201).json("Advert was added!");
    } catch (error) {
        next(error);
    }
}

export const getAdverts = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 15, skip = 0 } = req.query;
        // Fetch ads from database 
        const adverts = await AdvertModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        // Return response
        res.status(200).json(adverts);
    } catch (error) {
        next(error);
    }
}

export const countAdverts = async (req, res, next) => {
    try {
        const { filter = "{}" } = req.query;
        // Count adverts in database 
        const count = await AdvertModel.countdocuments(JSON.parse(filter));
        // Respond to request
        res.json({ count });
    } catch (error) {
        next(error);
    }
}

export const getAdvert = async (req, res, next) => {
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
        console.log(req.params, req.auth);
        const advert = await AdvertModel.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.auth.id
            },
            value, { new: true });
        if (!advert) {
            return res.status(404).json("Advert not found!");
        }
        res.status(200).json("Advert updated!");
    } catch (error) {
        next(error);
    }
}

export const deleteAdvert = async (req, res, next) => {
    try {
        const advert = await AdvertModel.findOneAndDelete(
            {
                _id: req.params.id,
                user: req.auth.id
            }
        );
        if (!advert) {
            return res.status(404).json("Advert not found!");
        }
        res.status(200).json("Advert deleted.");
    } catch (error) {
        next(error);
    }
}