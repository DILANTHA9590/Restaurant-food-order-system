import { Menuitem } from "src/api/menuitem/entities/menuitem.entity";
import { Order } from "src/api/order/entities/order.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class OrderedItem {

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({nullable:false})
    ProductName:string

    @Column({nullable:false})
    quantity:number

    @Column("decimal",{nullable:false})
    lastprice:number

    @Column({nullable:false})
    image:string


@ManyToOne(()=>Order,(order)=>order.orderedItems,{onDelete:"CASCADE"})  
order:Order

@ManyToOne(()=>Menuitem,(menuitem)=>menuitem.orderedItems,{onDelete:"CASCADE"})
menuitem:Menuitem

}
