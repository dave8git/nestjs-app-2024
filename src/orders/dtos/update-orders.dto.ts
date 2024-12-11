import { Transform } from 'class-transformer';
import { IsNotEmpty, Length, IsUUID, IsString } from 'class-validator';

export class UpdateOrderDTO {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    productId: string;
  
    @IsNotEmpty()
    @IsString()
    @IsString()
    clientId: string;
  }