import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommModule} from './communication/comm.module';
import { LoggerMiddleware } from './communication/logger.middleware';

@Module({
  imports: [
    CommModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('earth-mars-comm');
  }
}
