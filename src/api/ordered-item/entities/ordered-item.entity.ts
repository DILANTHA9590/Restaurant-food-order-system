import { Menuitem } from "src/api/menuitem/entities/menuitem.entity"
import { Order } from "src/api/order/entities/order.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("ordered_item")
export class OrderedItem {
    @PrimaryGeneratedColumn("uuid")  
    id: string

    @Column({nullable:false})
    ProductName: string   // snapshot of product name

    @Column({nullable:false})
    quantity: number

    @Column("decimal",{nullable:false})
    lastprice: number     // snapshot of price at order time

    @Column("simple-json", {nullable: true})
    image:string[]      // snapshot of product image

    @ManyToOne(()=>Order,(order)=>order.orderedItems,{onDelete:"CASCADE"})  
    order: Order

    @ManyToOne(()=>Menuitem,(menuitem)=>menuitem.orderedItems,{onDelete:"CASCADE"})
    menuitem: Menuitem
}
