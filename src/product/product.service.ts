// import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { CronJob } from 'cron';
import axios from 'axios';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
    ) {
        const job = new CronJob('*/5 * * * * *', async () => {
            try {
              const response = await axios.get(process.env.INVENTRTY);
              const products = response.data;
      
              // Save or update products in database
              for (const product of products) {
                await this.productRepository.save(product);
              }
            } catch (error) {
              console.error(`Failed to sync products from inventory server: ${error}`);
            }
          });
      
          job.start();
     }


    findAll(): Promise<ProductEntity[]> {
        return this.productRepository.find();
    }

    findOne(id: string): Promise<ProductEntity> {
        return this.productRepository.findOne({ where: { id: id } });
    }
}
