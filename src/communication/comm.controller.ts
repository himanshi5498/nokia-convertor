import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CommService } from './comm.service';
import { ResponseInterceptor } from './response.interceptor';

@Controller('earth-mars-comm')
@UseInterceptors(ResponseInterceptor)
export class CommController {
  constructor(private readonly appService: CommService) {}

  @Post('/message')
  sendMessage(
    @Body('message') message: string,
    @Body('sender') sender: string,
    @Body('receiver') receiver: string,
    @Body('startTime') startTime: number,
  ): string {
    return this.appService.sendMsg(message, sender, receiver, startTime);
  }
}
