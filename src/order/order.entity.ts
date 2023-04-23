import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { ProductEntity } from '../product/product.entity';
  
  @Entity()
  export class OrderEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
  
    @ManyToMany(() => ProductEntity)
    @JoinTable()
    products: ProductEntity[];
  
    @Column({ type: 'json' })
    quantities: Record<number, number>;
  
    @CreateDateColumn({type:'timestamptz'})
    createdAt: Date;
    // Add any other required fields
  }