import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import User from './User.ts';

@Table
class Contact extends Model {

  @Column({ unique: false, allowNull: false })
  name: string;

  @Column({ allowNull: true })
  lastname: string;

  @Column({ allowNull: true })
  phone: string;

  @Column({ allowNull: true })
  address: string;

  @Column({ allowNull: true })
  email: string;

  @Column({ allowNull: true })
  mobilePhone: string;

  // Foreign key to reference the owner (User)
  @ForeignKey(() => User)
  @Column
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;
}

export default Contact;
