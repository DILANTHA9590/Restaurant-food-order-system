import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('customer_ratings')
export class CustomerRating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { nullable: false })
  rating: number; // 1-5 stars

  @Column('text', { nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.ratings, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
}
