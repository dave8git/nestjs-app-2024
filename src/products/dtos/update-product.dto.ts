import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Length, Min, IsOptional } from 'class-validator';

// export class UpdateProductDTO {
//   @IsNotEmpty()
//   @Length(10, 20)
//   name: string;

//   @IsNotEmpty()
//   @IsInt()
//   @Min(0)
//   price: number;

//   @IsString()
//   @IsNotEmpty()
//   @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
//   description: string;
// }

export class UpdateProductDTO {
  @IsNotEmpty()
  @Length(10, 20)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  description: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}