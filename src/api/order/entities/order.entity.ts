import { User } from "src/api/user/entities/user.entity";
import { Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/browser";

export class Order {


    @PrimaryGeneratedColumn("uuid")
    id:string


    @Column({nullable:false,unique:true})
    OrderId:string


    @Column("decimal",{nullable:false}) // i dicide this first creatd ordered item tbale and after create order order table creatw
    //with it total price   
    totalPrice:number

    @Column("decimal",{nullable:false})
    discountPrice:number

        @Column({nullable:false})
        email:string
        @Column({nullable:false})
        mobileNo: string
        @Column({nullable:false})
        paymentId:string
        @Column({nullable:false})
address:string

@CreateDateColumn({type:"timestamp"})
createdAt:Date

@UpdateDateColumn({type:"timestamp"})
UpdatedAt:Date




}
