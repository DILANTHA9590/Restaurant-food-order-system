import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings.js";

export enum UserRole {

    ADMIN = "admin",
    CUSTOMER = "customer",
    STAFF = "staff"
}

@Entity()
export class User {

   @PrimaryGeneratedColumn("uuid")
   id:string;

   @Column({nullable: false})
   name: string;

   @Column({nullable: false ,unique:true})
   email: string;

   @Column({nullable: false})
   password: string;

 @Column({default:false})
   isVerified: boolean;


 @Column({default:false})
   isBlocked: boolean;

@Column({type:"enum", enum:UserRole, default:UserRole.CUSTOMER})
   role: UserRole;


   @CreateDateColumn({nullable: false})
   createdAt: Date;

   @UpdateDateColumn({nullable: false})
   updatedAt: Date;

}



