import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderDto } from './order.dto';
import { ProductEntity } from 'src/product/product.entity';
import { CreateOrderDto } from './create.order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>,
    ) { }

    async createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
        const order = new OrderEntity();
        order.quantities = createOrderDto.products.reduce(
            (quantities, product) => ({ ...quantities, [product.id]: product.quantity }),
            {},
        );
        order.products = createOrderDto.products.map(product => {
            const p = new ProductEntity();
            p.id = product.id;
            return p;
        });
        return this.orderRepository.save(order);
    }

    async getAllOrders(): Promise<OrderEntity[]> {
        return this.orderRepository.find();
    }

    async getOrderById(id: string): Promise<OrderEntity> {
        return this.orderRepository.findOne({ where: { id: id },relations: ['products'] });
    }
}