import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductEntity } from './product/product.entity';
import { OrderEntity } from './order/order.entity';
import { InventoryEntity } from './inventory/inventory.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [ProductEntity,OrderEntity,InventoryEntity],
  synchronize: true,
};

export default config;