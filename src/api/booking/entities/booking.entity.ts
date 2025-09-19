import { flatten } from '@nestjs/common';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
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

  @Column({ type: 'date' })
  bookingDate: Date; // reservation date/time

  @Column({ nullable: true })
  specialRequest: string;

  @Column({nullable:false})
  email:string
  
  @Column({ nullable: false})
  starttime: string;

  @Column({ nullable: false})
  endtime: string;


  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.CONFIRMED,
  })
  status: BookingStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
