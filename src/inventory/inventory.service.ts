
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from './inventory.entity';
import { CreateInventoryDto, UpdateProductStockDto } from './create.dto';
import { ProductEntity } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { CronJob } from 'cron';

@Injectable()
export class InventoryService {

    // constructor(@InjectRepository(InventoryEntity) repo) {
    //     super(repo);
    // }
    constructor(
        @InjectRepository(InventoryEntity)
        private readonly inventoryRepository: Repository<InventoryEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {
       
     }

    async importInventoryFromCsv(filePath: string): Promise<void> {
        const inventoryData = [];
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data', (data: any) => {
            inventoryData.push(data);
          })
          .on('end', async () => {
            for (const data of inventoryData) {
              const product = await this.productRepository.findOne(data.productId);
              if (!product) {
                throw new Error(`Product with ID ${data.productId} not found`);
              }
              const inventory = new InventoryEntity();
              inventory.product = product;
              inventory.stock = parseInt(data.stock);
              await this.inventoryRepository.save(inventory);
            }
          });
      }

    async getAllProducts(): Promise<InventoryEntity[]> {
        return this.inventoryRepository.find({ relations: ['product'] });
    }

    async getProductById(id: string): Promise<InventoryEntity> {
        return this.inventoryRepository.findOne({ where: { id: id }, relations: ['product'] });
    }

    async updateProductStock(updateProductStockDto: UpdateProductStockDto): Promise<InventoryEntity> {
        const { productId, stock } = updateProductStockDto;
        const inventoryEntity = await this.inventoryRepository.findOne({
            where: { product: { id: productId } },
            relations: ['product'],
        });
        inventoryEntity.stock = stock;
        return this.inventoryRepository.save(inventoryEntity);
    }

}
