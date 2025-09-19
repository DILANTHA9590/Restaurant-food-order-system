import { Booking } from "src/api/booking/entities/booking.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

export enum TableStatus {
  BOOKED = "Booked",
  AVAILABLE = "Available",
}

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  tableId: string;

  @Column({
    nullable: false,
    type: "enum",
    enum: TableStatus,
    default: TableStatus.AVAILABLE,
  })
  status: TableStatus;

  @Column("simple-json", { nullable: false })
  image: string[];

  @Column("text", { nullable: true })
  description: string;

  // Relations
  @OneToMany(() => Booking, (booking) => booking.table)
  bookings: Booking[];
}
