import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"

@Entity('users')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!:number

  @Column({name: 'name'})
  name!: string

  @Column({name: 'password', select: false})
  password!: string

  @Column({name: 'email'})
  email!: string

  @Column({name: 'created_at'})
  createdAt!: Date

  @Column({name: 'updated_at'})
  updatedAt!: Date

  @Column({name: 'is_active'})
  isActive!: boolean

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn ({ name: "role_id" }) // campo personalizado en la bd
  role!: Role;
}
