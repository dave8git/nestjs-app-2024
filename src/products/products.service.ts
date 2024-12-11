import { Injectable, Get } from '@nestjs/common';
//import { db, Product } from './../db';
import { Product } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private prismaService: PrismaService) { }
    // public getAll(): Product[] {
    //     return db.products;
    // }
    public getAllExtended(): Promise<Product[]> {
        return this.prismaService.product.findMany({
            include: { orders: true },
        });
    }
    public getExtendedById(id: Product['id']): Promise<Product | null> {
        return this.prismaService.product.findUnique({
            where: { id },
            include: { orders: true },
        });
    }
    public getAll(): Promise<Product[]> {
        return this.prismaService.product.findMany();
    }
    // public getById(id: Product['id']): Product | null { // Product['id'] jako typu uzyj tego którego używa właściwość id w interfejsie Product
    //     return db.products.find((p) => p.id === id);
    // }
    public getById(id: Product['id']): Promise<Product | null> {
        return this.prismaService.product.findUnique({
            where: { id },
        });
    }
    // public deleteById(id: Product['id']): void {
    //     db.products = db.products.filter((p) => p.id !== id);
    // }
    public deleteById(id: Product['id']): Promise<Product> {
        return this.prismaService.product.delete({
            where: { id },
        });
    }
    // public create(productData: Omit<Product, 'id'>): Product {
    //     const newProduct = { ...productData, id: uuidv4() };
    //     db.products.push(newProduct);
    //     return newProduct;
    // }
    public create(
        productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<Product> {
        return this.prismaService.product.create({
            data: productData,
        });
    }
    public updateById(
        id: Product['id'],
        productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<Product> {
        return this.prismaService.product.update({
            where: { id },
            data: productData,
        });
    }
}
