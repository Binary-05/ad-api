import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const advertSchema = new Schema({
    title: { type: String, required: true },
    media: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, 
        enum: [ "electronics", "clothing" ], 
        required: true }
}, {
    timestamps: true
});

advertSchema.plugin(toJSON);

export const AdvertModel = model("Advert", advertSchema);
