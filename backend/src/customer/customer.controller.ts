import { Body, Controller, Get, Param, Post, Put, UseGuards, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';

@ApiTags('customer')
@Controller('customer')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(+id);
  }

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.customerService.remove(+id);
  }
}
