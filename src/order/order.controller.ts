import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
import { CreateOrderDto } from './create.order.dto';
import { OrderEntity } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  async getAllOrders(): Promise<OrderEntity[]> {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<OrderEntity> {
    return this.orderService.getOrderById(id);
  }
}






