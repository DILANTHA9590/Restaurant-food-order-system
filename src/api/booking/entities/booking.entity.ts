import { flatten } from '@nestjs/common';
import { User } from 'src/api/user/entities/user.entity';
import { Table } from 'src/api/table/entities/table.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED'
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique:true})
  bookingId:string

  @Column({nullable:false})
  customerName: string;

  @Column({nullable:false})
  customerContact: string;

  @Column({ type: 'int' })
  numberOfGuests: number;

  @Column({ nullable: true })
  specialRequest: string;

  @Column({nullable:false})
  email:string
  
  @Column({type:"timestamp", nullable:true})
  startDateTime: Date;

  @Column({type:"timestamp", nullable:true})
  endDateTime: Date;


  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.COMPLETED,
  })
  status: BookingStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

 @ManyToOne(() => Table, (table) => table.bookings, { eager: true })
  @JoinColumn({ name: "tableId" }) 
 table: Table;

   // User relation
  @ManyToOne(() => User, (user) => user.bookings, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;
}
