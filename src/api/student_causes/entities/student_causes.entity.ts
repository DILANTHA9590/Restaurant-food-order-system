import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('student_causes')
export class StudentCauses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  category: string;

  @Column({ type: 'int', default: 0 })
  priority: number; // 1-10 scale

  @Column({ type: 'varchar', length: 50, default: 'active' })
  status: string; // active, inactive, resolved

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
