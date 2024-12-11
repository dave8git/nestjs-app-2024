import { Controller, Get, Post, Put, Body, Delete, Param, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';


@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get('/extended')
    getAllExtended(): any {
    return this.productsService.getAllExtended();
    }
    @Get('/extended/:id')
    async getExtendedById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getExtendedById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
    }

    @Get('/')
    public getAll(): any {
        return this.productsService.getAll();
    }
    // @Get('/:id')
    // public getById(@Param('id', new ParseUUIDPipe()) id: string) {
    //     const prod = this.productsService.getById(id);
    //     if(!prod) throw new NotFoundException('Product not found');
    // }
    @Get('/:id')
    getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const prod = this.productsService.getById(id);
        if (!prod) throw new NotFoundException('Product not found');
        return prod;
    }
    // @Delete('/:id')
    // public deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    //     if (!this.productsService.getById(id))
    //         throw new NotFoundException('Product not found');
    //     this.productsService.deleteById(id);
    //     return { success: true };
    // }
    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!(await this.productsService.getById(id)))
            throw new NotFoundException('Product not found');
        await this.productsService.deleteById(id);
        return { success: true };
    }
    @Post('/')
    public create(@Body() productData: CreateProductDTO) {
        return this.productsService.create(productData);
    }
    // @Put('/:id')
    // public update(
    //     @Param('id', new ParseUUIDPipe()) id: string,
    //     @Body() productData: UpdateProductDTO,
    // ) {
    //     if (!this.productsService.getById(id))
    //         throw new NotFoundException('Product not found');

    //     this.productsService.updateById(id, productData);
    //     return { success: true };
    // }
    @Put('/:id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() productData: UpdateProductDTO,
      ) {
        if (!(await this.productsService.getById(id)))
          throw new NotFoundException('Product not found');
      
        await this.productsService.updateById(id, productData);
        return { success: true };
      }
}
