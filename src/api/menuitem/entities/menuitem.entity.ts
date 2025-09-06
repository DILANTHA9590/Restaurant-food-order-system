import { Category } from "src/api/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";


@Entity("menuitem")
export class Menuitem {


    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column({nullable:false})
    image:string

    @Column({nullable:false , unique:true})
     name : string

    @Column("json", { nullable:true})
     altNames : string[]

    @Column({nullable:false, default: 0})
    price:number
    
    @Column({nullable:false, default: 0})
    lastPrice:number

    @Column("text",{nullable: true})
    description:string

    @Column({nullable:false ,default: true})
        availability:boolean


    @CreateDateColumn({nullable:false,type:"timestamp"})
        createdAt: Date;


    @UpdateDateColumn({nullable:false,type:"timestamp"})
        updatedAt: Date;


    @ManyToOne(() => Category, (category) => category.menuitems)
    @JoinColumn({ name: "cat_id" })
    category: Category;

}
   