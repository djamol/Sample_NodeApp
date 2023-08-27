import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Book } from '../models/book';

class BookController {
  public async create(req: Request, res: Response) {
    const { title, author, publishedYear } = req.body;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
      success: false,
      message: 'Invalid input data',
      errors: errors.array(),
    });
    }

    try {
      const book = await Book.create({ title, author, publishedYear });
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ 
      success: false,
      message: 'Internal Server Error',
      errors: null
      });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, author, publishedYear } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: errors.array() 
      });
    }

    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ 
          success: false,
          message: 'Book Not Found',
          errors: null
          });
      }

      book.title = title;
      book.author = author;
      book.publishedYear = publishedYear;
      await book.save();

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Internal Server Error',
        errors: null
        });
    }
  }


 public async remove(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ 
          success: false,
          message: 'Book Not Found',
          errors: null
          });
      }

      await book.destroy();
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Internal Server Error',
        errors: null
        });
    }
  }

 public async getAll(req: Request, res: Response) {
    try {
      const books = await Book.findAll();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Internal Server Error',
        errors: null
        });
    }
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const book = await Book.findByPk(id);
      if (!book) {
        res.status(404).json({ 
          success: false,
          message: 'Book Not Found',
          errors: null
          });
      } else {
        res.status(200).json(book);
      }
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Internal Server Error',
        errors: null
        });
    }
  }

}

export const bookController = new BookController();


