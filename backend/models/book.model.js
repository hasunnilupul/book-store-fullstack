import mongoose, {Schema} from "mongoose";
import idToIdPlugin from "../utils/idToIdPlugin.js";

// book schema
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    deletedAt: {
        type: Date,
        required: false
    }
}, { timestamps: true });

// add the plugin to removed _id and deletedAt attributes
bookSchema.plugin(idToIdPlugin);

export const Book = mongoose.model('Books', bookSchema);