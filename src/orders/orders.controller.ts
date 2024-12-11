import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CreateOrderDTO } from '../orders/dtos/create-orders.dto';
import { UpdateOrderDTO } from '../orders/dtos/update-orders.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Delete('/:id')
  async deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Product not found');
    await this.ordersService.deleteOrder(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');

    await this.ordersService.updateById(id, orderData);
    return { success: true };
  }
}

// @Controller('orders')
// export class OrdersController {
//     constructor(private ordersService: OrdersService) {}

//   @Get('/')
//   getAll(): any {
//     return this.ordersService.getAll();
//   }

//   @Get('/:id')
//   getById(@Param('id', new ParseUUIDPipe()) id: string) {
//     const order = this.ordersService.getById(id);
//     if (!order) throw new NotFoundException('Order not found');
//     return order;
//   }

//   @Delete('/:id')
//   deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
//     if (!this.ordersService.getById(id))
//       throw new NotFoundException('Order not found');
//     this.ordersService.deleteById(id);
//     return { success: true };
//   }

//   @Post('/')
//   public create(@Body() orderData: CreateOrderDTO) {
//     return this.ordersService.create(orderData);
//   }

//   @Put('/:id')
//   update(
//     @Param('id', new ParseUUIDPipe()) id: string,
//     @Body() orderData: UpdateOrderDTO,
//   ) {
//     if (!this.ordersService.getById(id))
//       throw new NotFoundException('Order not found');

//     this.ordersService.updateById(id, orderData);
//     return { success: true };
//   }
// }