import { Module } from '@nestjs/common';
import { CommController } from './comm.controller';
import { CommService } from './comm.service';

import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [CommController],
  providers: [CommService],
})

export class CommModule {
}
