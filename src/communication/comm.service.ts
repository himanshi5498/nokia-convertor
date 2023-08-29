import { HttpException, Injectable } from '@nestjs/common';
import { COMM_USERS, EXCEPTION_ERROR_MSG, EXCEPTION_STATUS_CODE, msgCharMapping, msgCharMappingReverse } from 'src/constants';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CommService {
  constructor(private eventEmitter: EventEmitter2) { }
  sendMsg(message: string, sender: string, receiver: string, startTime): string {
    const validMsg: boolean = this.validMsg(message);
    const translateMsg: string = this.translateMsg(message, sender, receiver);
    if (receiver == COMM_USERS.EARTH) {
      this.eventEmitter.emit(
        'earth.msg.receive', translateMsg
      );
    }
    if (receiver == COMM_USERS.MARS) {
      this.eventEmitter.emit(
        'mars.msg.receive', translateMsg
      );
    }

    return translateMsg;
  }

  /*
  as per the assignment space is conidered space, * as *, # as # when converted from english
  to numeric and vice versa so writing the logic according to that only.
  We know nokia has a different functionality but making this acc to assignment and the tool mentioned
  **/
  translateMsg(message: string, sender: string, receiver: string): string {
    let finalMsg = '', tempString = '';
    message = message.toLowerCase();
    for (let start = 0; start < message.length; start++) {
      switch (sender) {
        case COMM_USERS.EARTH: {
          if (msgCharMapping[message[start]]) {
            if (finalMsg && (msgCharMapping[message[start]].toString()[0] == finalMsg[finalMsg.length - 1])) {
              finalMsg += '.';
            }
            finalMsg += msgCharMapping[message[start]];
          } else {
            finalMsg += message[start];
          }
        }
          break;
        case COMM_USERS.MARS: {
          if (msgCharMappingReverse[message[start]]) {
            if (start + 1 < message.length && message[start + 1] == message[start]) {
              tempString += message[start];
              continue;
            }
            tempString +=  message[start];
            finalMsg += msgCharMappingReverse[tempString] ? msgCharMappingReverse[tempString]: '';
            tempString = '';
          } else {
            if (message[start] != '.') {
              finalMsg += message[start];
            }
            tempString = '';
          }
        }
      }
    }
    return finalMsg;

  }

  validMsg(message: string) {
    if (!(/^[A-Za-z\s\*\#]*$/.test(message)) && !(/^[0-9\s\*\#\.]*$/.test(message))) {
      throw new HttpException(EXCEPTION_ERROR_MSG, EXCEPTION_STATUS_CODE)
    }
    return true
  }

  @OnEvent('earth.msg.receive')
  receiveMsgOnEarth(msg: string) {
    console.log("Earth receiver received the message ....====>", msg);
  }

  @OnEvent('mars.msg.receive')
  receiveMsgOnMars(msg: string) {
    console.log("Mars receiver received the message ....====>", msg);
  }
}
