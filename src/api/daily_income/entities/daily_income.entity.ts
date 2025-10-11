import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Entity('daily_incomes')
@Unique('UQ_date', ['date'])
export class DailyIncome {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string;

  @Column('int', { default: 0 })
  totalOrders: number;

  @Column('int', { default: 0 }) // Changed from decimal to int
  totalIncome: number;

  @Column('int', { default: 0 }) // Changed from decimal to int
  totalProfit: number;

  @CreateDateColumn()
  createdAt: Date;
}
