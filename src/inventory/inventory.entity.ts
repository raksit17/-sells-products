import { ProductEntity } from 'src/product/product.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Inventory')
export class InventoryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
  
    @OneToOne(() => ProductEntity)
    product: ProductEntity;
  
    @Column()
    stock: number;
}
