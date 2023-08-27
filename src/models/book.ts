import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Book extends Model {
  public id!: string;
  public title!: string;
  public author!: string;
  public publishedYear!: number;
}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'books',
  }
);

export { Book };

