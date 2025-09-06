import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings.js';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  STAFF = 'staff',
}

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNmI5N2M4Ni04ODNhLTQ4NjctYmIwZS0wN2NjMDA0Yzg4MzAiLCJlbWFpbCI6Im1la3RhQGV4YW1wbGUuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzU3MTI3MDIxLCJleHAiOjE3NTcxMzA2MjF9.GtZxzZsI2WKoPvEC0vrSTNztd3VS5zxUMkdOAUBn10c    customer
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MGJjNjVkYi0xZDNjLTRmNmEtOTY1Yi1hZTI0ZDE0ZTRiY2EiLCJlbWFpbCI6Im1la3RhYUBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NzEyNzIxMywiZXhwIjoxNzU3MTMwODEzfQ.UXRZdEMWhExDvZub1o0YmnZDidiefeoj_NW1Xc6T2F8 admin