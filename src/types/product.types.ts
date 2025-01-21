import { Decimal } from "@prisma/client/runtime/library";

export interface CreateProductDto {
    name: string;
    description?: string;
    price: number ;  // Accept multiple types for flexibility
    stock: number;
    imageUrl?: string;
    category: string;
  }
  
  export interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: Decimal;
    stock?: number;
    imageUrl?: string;
    category?: string;
  }