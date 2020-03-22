import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Purchase } from '../purchase/purchase.entity';
import { User } from '../user/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => User,
    user => user.products,
  )
  user: User;

  @OneToMany(
    type => Purchase,
    purchase => purchase.product,
  )
  purchases: Purchase[];

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'double' })
  price: number;

  @Column({ type: 'double' })
  amount: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ type: 'datetime' })
  date: Date;
}
