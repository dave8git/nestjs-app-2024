import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsUUID, Length } from 'class-validator';

export class CreateOrderDTO {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    productId: string;
  
    @IsNotEmpty()
    @IsString()
    @IsString()
    clientId: string;
  }