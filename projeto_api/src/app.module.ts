import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger_middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthMiddleware } from './common/middleware/auth_middleware';
import { PublicModule } from './public/public.module';
import { VeiculosModule } from './veiculos/veiculos.module';
import { config } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), PublicModule, VeiculosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).exclude('public/(.*)').forRoutes('*');
  }
}
