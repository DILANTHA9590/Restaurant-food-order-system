import { identity } from "rxjs";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('user-verify')
export class UserVerification {

@PrimaryGeneratedColumn('uuid')
id:string

@Column()
email:string

@Column()
Otp:string

@Column({type:'timestamp'})
expireTime:Date

@CreateDateColumn({type:'timestamp'})
createdAt:Date














}


