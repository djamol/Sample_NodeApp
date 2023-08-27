
const request = require('supertest');
const app = require('../../app'); 
const { sequelize } = require('../config/database');
const { Book } = require('../models/book');

beforeAll(async () => {
  await sequelize.sync(); 
});

afterAll(async () => {
  await sequelize.close(); 
});

describe('POST /api/books', () => {
  it('should create a new book', async () => {
    const response = await request(app)
      .post('/api/books')
      .send({
        title: 'Sample Book',
        author: 'Sample Author',
        publishedYear: 2022,
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'Sample Book');
    expect(response.body).toHaveProperty('author', 'Sample Author');
    expect(response.body).toHaveProperty('publishedYear', 2022);
  });

  it('should return 400 Bad Request on invalid input data', async () => {
    const response = await request(app)
      .post('/api/books')
      .send({
        title: '', // Invalid input
        author: 'Sample Author',
        publishedYear: 2022,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});

