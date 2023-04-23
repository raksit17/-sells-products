import { Controller, Get, Param } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';



@Controller('product')
export class ProductController {

  // constructor(private service: ProductService) { }
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.findOne(id);
  }

}
