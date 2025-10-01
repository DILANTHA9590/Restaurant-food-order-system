import { Module } from '@nestjs/common';

import { UserModule } from './api/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './api/user/entities/user.entity';
import { AuthModule } from './api/auth/auth.module';
import { CategoryModule } from './api/category/category.module';
import { MenuitemModule } from './api/menuitem/menuitem.module';
import { OrderModule } from './api/order/order.module';
import { OrderedItemModule } from './api/ordered-item/ordered-item.module';
import { Category } from './api/category/entities/category.entity';
import { Menuitem } from './api/menuitem/entities/menuitem.entity';
import { Order } from './api/order/entities/order.entity';
import { OrderedItem } from './api/ordered-item/entities/ordered-item.entity';
import { BookingModule } from './api/booking/booking.module';
import { Booking } from './api/booking/entities/booking.entity';
import { TableModule } from './api/table/table.module';
import { Table } from './api/table/entities/table.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [User,Category,Menuitem,Order ,OrderedItem,Booking,Table],
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User,Category,Menuitem,Order ,OrderedItem,Booking,Table]),

    UserModule,

    AuthModule,

    CategoryModule,

    MenuitemModule,

    OrderModule,

    OrderedItemModule,

    BookingModule,
    TableModule,
  ],
})
export class AppModule {}




// import { Module } from '@nestjs/common';

// import { UserModule } from './api/user/user.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './api/user/entities/user.entity';
// import { AuthModule } from './api/auth/auth.module';
// import { CategoryModule } from './api/category/category.module';
// import { MenuitemModule } from './api/menuitem/menuitem.module';
// import { OrderModule } from './api/order/order.module';
// import { OrderedItemModule } from './api/ordered-item/ordered-item.module';
// import { Category } from './api/category/entities/category.entity';
// import { Menuitem } from './api/menuitem/entities/menuitem.entity';
// import { Order } from './api/order/entities/order.entity';
// import { OrderedItem } from './api/ordered-item/entities/ordered-item.entity';
// import { BookingModule } from './api/booking/booking.module';
// import { Booking } from './api/booking/entities/booking.entity';
// import { TableModule } from './api/table/table.module';
// import { Table } from './api/table/entities/table.entity';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: '.env',
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         type: 'mysql',
//         url: configService.get<string>('DATABASE_URL'),
//         // host: configService.get<string>('DB_HOST'),
//         // port: configService.get<number>('DB_PORT'),
//         // username: configService.get<string>('DB_USERNAME'),
//         // password: configService.get<string>('DB_PASS'),
//         // database: configService.get<string>('DB_NAME'),
//         // entities: [User,Category,Menuitem,Order ,OrderedItem,Booking,Table],
//         autoLoadEntities: true,
//         synchronize: true,
//         // logging: true,
//       }),
//       inject: [ConfigService],
//     }),
//     // TypeOrmModule.forFeature([User,Category,Menuitem,Order ,OrderedItem,Booking,Table]),

//     UserModule,

//     AuthModule,

//     CategoryModule,

//     MenuitemModule,

//     OrderModule,

//     OrderedItemModule,

//     BookingModule,
//     TableModule,
//   ],
// })
// export class AppModule {}


        