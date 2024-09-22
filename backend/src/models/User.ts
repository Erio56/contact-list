import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import Contact from './Contact.ts';

@Table
class User extends Model {

  @Column({ unique: true, allowNull: false })
  username: string;

  @Column({ allowNull: false })
  password: string;

  @HasMany(() => Contact)
  owner: User;
}

export default User;