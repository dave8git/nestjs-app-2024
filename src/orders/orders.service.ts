import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { Order } from '@prisma/client'
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class OrdersService {
    constructor(private prismaService: PrismaService) {}

    public getAll(): Promise<Order[]> {
        return this.prismaService.order.findMany();
      }

      public getById(id: Order['id']): Promise<Order | null> {
        return this.prismaService.order.findUnique({
          where: { id },
        });
    }

    public deleteById(id: Order['id']): Promise<Order> {
        return this.prismaService.order.delete({
        where: { id },
        });
    }

    public create(
        orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<Order> {
        return this.prismaService.order.create({
            data: orderData,
        });
    }
      
    public updateById(
      id: Order['id'],
      orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<Order> {
      return this.prismaService.order.update({
        where: { id },
        data: orderData,
      });
    }
}

// @Injectable()
// export class OrdersService {
//     public getAll(): Order[] {
//         return db.orders;
//     }

//     public getById(id: Order['id']): Order | null {
//         return db.orders.find((p) => p.id === id);
//     }

//     public deleteById(id: Order['id']): void {
//         db.orders = db.orders.filter((p) => p.id !== id);
//     }

//     public create(orderData: Omit<Order, 'id'>): Order {
//         const newOrder = { ...orderData, id: uuidv4() };
//         db.orders.push(newOrder);
//         return newOrder;
//     }
      
//     public updateById(id: Order['id'], orderData: Omit<Order, 'id'>): void {
//         db.orders = db.orders.map((p) => {
//           if (p.id === id) {
//             return { ...p, ...orderData };
//           }
//           return p;
//         });
//     }
// }
