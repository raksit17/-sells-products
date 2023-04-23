import { Column, Entity, PrimaryGeneratedColumn, } from 'typeorm';

@Entity('Product')
export class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  price: number;

  @Column()
  description: string;

}
