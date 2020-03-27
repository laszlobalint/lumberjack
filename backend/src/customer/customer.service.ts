import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customerRepository.findOneOrFail({ where: { id } });
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    let user = await this.userRepository.findOneOrFail({
      where: { id: createCustomerDto.createdBy },
      relations: ['customers', 'products', 'purchases'],
    });

    let customer = new Customer({
      name: createCustomerDto.name,
      address: createCustomerDto.address,
      phone: createCustomerDto.phone,
      companyName: createCustomerDto.companyName,
      taxId: createCustomerDto.taxId,
      nationalId: createCustomerDto.nationalId,
      checkingAccount: createCustomerDto.checkingAccount,
      description: createCustomerDto.description,
      purchases: [],
      user,
    });

    return await this.customerRepository.save(customer);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    let customer = await this.customerRepository.findOneOrFail({
      where: { id },
    });
    let updatedCustomer = Object.assign(customer, updateCustomerDto);

    return this.customerRepository.save(updatedCustomer);
  }

  async remove(id: number): Promise<DeleteResult> {
    const customer = await this.customerRepository.findOneOrFail({
      where: { id },
    });

    return this.customerRepository.delete(customer.id);
  }
}
