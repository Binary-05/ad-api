import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const advertSchema = new Schema({
    title: { type: String, required: true },
    media: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: ["electronics", "clothing", "interior", "accessories", "automoblie", "kitchen", "art", "food", "construction"],
        required: true
    },
    user: { type: Types.ObjectId, required: true, ref: "User"}
}, {
    timestamps: true
});

advertSchema.plugin(toJSON);

export const AdvertModel = model("Advert", advertSchema);
