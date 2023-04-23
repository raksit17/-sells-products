import { IsArray, IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderProductDto } from './create.order.dto'

export class OrderDto {
  @IsUUID()
  readonly id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  readonly products: CreateOrderProductDto[];

  @IsNotEmpty()
  readonly quantities: Record<number, number>;

  @IsNumber()
  readonly totalPrice: number;
}