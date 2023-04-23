import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateInventoryItemDto {
  @IsUUID()
  id: string;

  @IsInt()
  @Min(0)
  stock: number;
}

export class CreateInventoryDto {
  data: CreateInventoryItemDto[];
}

export class UpdateProductStockDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(0)
  stock: number;
}