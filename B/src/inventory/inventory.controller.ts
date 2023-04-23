import { Body, Controller, Post,Get, Put, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateProductStockDto } from './create.dto';
import { InventoryEntity } from './inventory.entity';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('inventory')
export class InventoryController {

  // constructor(private service: InventoryService) { }
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('/import')
  @UseInterceptors(FileInterceptor('file'))
  async importInventory(@UploadedFile() file: any): Promise<void> {
    return this.inventoryService.importInventoryFromCsv(file);
  }

  @Get('/products')
  async getAllProducts(): Promise<InventoryEntity[]> {
    return this.inventoryService.getAllProducts();
  }

  @Get('/products/:id')
  async getProductById(@Param('id') id: string): Promise<InventoryEntity> {
    return this.inventoryService.getProductById(id);
  }

  @Put('/products')
  async updateProductStock(@Body() updateProductStockDto: UpdateProductStockDto): Promise<InventoryEntity> {
    return this.inventoryService.updateProductStock(updateProductStockDto);
  }

}
