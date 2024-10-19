import { Router } from "express";
import { Book } from "../models/book.model.js";
import { now } from "mongoose";

// express router
const bookRoutes = Router();

// route for create a book
bookRoutes.post("/", async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (title && author && publishYear) {
            const book = await Book.create({ title, author, publishedYear: publishYear, deletedAt: null });
            return res.status(201).json({ data: book });
        }

        return res.status(400).send({ message: "Following fields are required: title, author, publishYear" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// route for get all books
bookRoutes.get("/", async (req, res) => {
    try {
        const books = await Book.find({ deletedAt: null });
        return res.status(200).json({ count: books.length, data: books });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// route for get a book by id
bookRoutes.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findOne({ _id: id, deletedAt: null });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ data: book });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// route for updating a book
bookRoutes.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishYear } = req.body;

        if (title && author && publishYear) {
            const result = await Book.findOneAndUpdate({ _id: id, deletedAt: null }, { title, author, publishedYear: publishYear });

            if (!result) {
                return res.status(404).json({ message: "Book not found" });
            }

            return res.status(200).json({ message: "Book updated successfully" });
        }

        return res.status(400).send({ message: "Following fields are required: title, author, publishYear" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// route for deleting a book
bookRoutes.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findOneAndUpdate({ _id: id, deletedAt: null }, { deletedAt: now() });

        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default bookRoutes;