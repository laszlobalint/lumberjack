import { UserDto } from '../auth/models/user.model';
import { CreateCustomerDto, CustomerDto } from './customers.model';
import { ProductDto } from './products.model';

export interface PurchaseDto {
  id: number;
  userId: number;
  amount: number;
  price: number;
  description: string;
  completed: boolean;
  date: Date;
  product: ProductDto;
  customer: CustomerDto;
  user: UserDto;
}

export interface CreatePurchaseDto {
  amount: number;
  price: number;
  productId: number;
  customerId?: number;
  customer?: CreateCustomerDto;
  description?: string;
  completed: boolean;
}
