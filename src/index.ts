import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './config/database';
import { bookRoutes } from './routes/bookRoutes';

const app = express();
const PORT = process.env.PORT || 3009;

app.use(bodyParser.json());

app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

