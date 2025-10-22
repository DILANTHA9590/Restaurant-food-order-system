import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../booking/entities/booking.entity';
import { Table, TableStatus } from './entities/table.entity';
import { Not, Repository } from 'typeorm';
import { genarateId } from '../common/interfaces/utills/booking-number';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
  ) {}

  async create(createTableDto: CreateTableDto) {
    const count = await this.tableRepository.count({});
    if (count === 0) count + 1;
    const tableId = genarateId('TBL', count);

    const tableData = await this.tableRepository.save({
      ...createTableDto,
      tableId: tableId,
      status: TableStatus.AVAILABLE,
    });

    return {
      message: 'Table created succsessfully',
      statusCode: HttpStatus.CREATED,
      tableData,
    };
  }

  // get availnle  tables
  async getAvailableTable(page: number = 1, limit: number = 10) {
    const [result, total] = await this.tableRepository.findAndCount({
      where: {
        status: Not(TableStatus.BOOKED),
      },
      skip: (page - 1) * limit, // offset
      take: limit, // limit
    });

    if (result.length === 0) {
      return {
        message: 'No available table found',
        data: [],
        total,
        page,
        limit,
        statusCode: HttpStatus.OK,
      };
    }

    return {
      message: 'Available tables fetched successfully',
      data: result,
      total, // total rows
      page, // current page
      limit, // per page
      statusCode: HttpStatus.OK,
    };
  }

  //get booken table details
  async getBookedTable(page: number = 1, limit: number = 10) {
    const [result, total] = await this.tableRepository.findAndCount({
      where: {
        status: Not(TableStatus.AVAILABLE),
      },
      skip: (page - 1) * limit, // offset
      take: limit, // limit
    });

    if (result.length === 0) {
      return {
        message: 'No available table found',
        data: [],
        total,
        page,
        limit,
        statusCode: HttpStatus.OK,
      };
    }

    return {
      message: 'Available tables fetched successfully',
      data: result,
      total, // total rows
      page, // current page
      limit, // per page
      statusCode: HttpStatus.OK,
    };
  }

  async updateTable(id: string, updateTableDto: UpdateTableDto) {
    const existingTable = await this.tableRepository.findOne({
      where: { id: id },
    });

    if (!existingTable) {
      throw new NotFoundException('No  table found');
    }

    const updateData = this.tableRepository.merge(
      existingTable,
      updateTableDto,
    );

   await this.tableRepository.save(updateData);

    return {
      message: 'Table created successfully',
      statusCode: HttpStatus.OK,
    };
  }

}
