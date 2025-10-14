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

@Column('decimal', { precision: 10, scale: 2, default: 0 })
totalIncome: number;
  @Column('int', { default: 0 }) // Changed from decimal to int
  totalProfit: number;

  @CreateDateColumn()
  createdAt: Date;
}
