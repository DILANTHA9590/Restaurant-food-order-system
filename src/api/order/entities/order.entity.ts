import { Entity, Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderedItem } from "src/api/ordered-item/entities/ordered-item.entity";
import { User } from "src/api/user/entities/user.entity";

@Entity("order")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  orderId: string;

  @Column("decimal", { precision: 10, scale: 2, nullable: false })
  totalPrice: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: false })
  discountPrice: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  mobileNo: string;

  @Column({ nullable: false })
  paymentId: string;

  @Column({ nullable: false })
  address: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => OrderedItem, (orderedItem) => orderedItem.order, { cascade: true })
  orderedItems: OrderedItem[];
}
