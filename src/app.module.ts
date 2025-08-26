import { Module } from '@nestjs/common';

import { UserModule } from './api/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    
    
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: '.env',
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get<string>('DB_HOST'),
    //     port: configService.get<number>('DB_PORT'),
    //     username: configService.get<string>('DB_USERNAME'),
    //     password: configService.get<string>('DB_PASS'),
    //     database: configService.get<string>('DB_NAME'),
    //     entities: [],
    //     autoLoadEntities: true,
    //     synchronize: true,
    //     logging: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    // TypeOrmModule.forFeature([
    
    // ]),
  
  
  ],

})
export class AppModule {}
