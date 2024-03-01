import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('authors')
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({name: 'nationality'})
  nationality!: string
  
  @Column({name: 'name'})
  name!: string

  @Column({name: 'created_at'})
  createdAt!: Date

  @Column({name: 'updated_at'})
  updatedAt!: Date
}
