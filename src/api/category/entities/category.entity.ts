import { Menuitem } from "src/api/menuitem/entities/menuitem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export class Category {

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column("simple-json", {nullable: true})
    image:string[]

    @Column({nullable: true , unique: true})
    categoryName:string

    @Column("text",{nullable: true})
    description:string
        @Column({nullable: true})
        rating:number


@OneToMany(() => Menuitem, (menuitem) => menuitem.category)
menuitems: Menuitem[]
}
