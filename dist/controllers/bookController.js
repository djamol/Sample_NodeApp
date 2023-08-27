"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const express_validator_1 = require("express-validator");
const book_1 = require("../models/book");
class BookController {
    async create(req, res) {
        const { title, author, publishedYear } = req.body;
        // Validation
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const book = await book_1.Book.create({ title, author, publishedYear });
            res.status(201).json(book);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async update(req, res) {
        const { id } = req.params;
        const { title, author, publishedYear } = req.body;
        // Validation
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const book = await book_1.Book.findByPk(id);
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }
            book.title = title;
            book.author = author;
            book.publishedYear = publishedYear;
            await book.save();
            res.status(200).json(book);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async remove(req, res) {
        const { id } = req.params;
        try {
            const book = await book_1.Book.findByPk(id);
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }
            await book.destroy();
            res.status(204).send(); // No content (book deleted successfully)
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getAll(req, res) {
        try {
            const books = await book_1.Book.findAll();
            res.status(200).json(books);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getById(req, res) {
        const { id } = req.params;
        try {
            const book = await book_1.Book.findByPk(id);
            if (!book) {
                res.status(404).json({ error: 'Book not found' });
            }
            else {
                res.status(200).json(book);
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.bookController = new BookController();
