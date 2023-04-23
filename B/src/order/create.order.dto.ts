import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateOrderDto {
    products: CreateOrderProductDto[];
  }
  
  export class CreateOrderProductDto {
    id: string;
    quantity: number;
  }