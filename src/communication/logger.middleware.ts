import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { EXCEPTION_ERROR_MSG, EXCEPTION_STATUS_CODE } from "../constants"
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req['startTime'] = Date.now();
    if(req.headers['x-sender'] || req.body['x-sender']) {
      req.body['sender'] = req.headers['x-sender'] || req.body['x-sender'] 
      console.log('Sender in middleware ....======>', req.body['sender']);
    }
    if(req.headers['x-receiver'] || req.body['x-receiver']) {
      req.body['receiver'] = req.headers['x-receiver'] || req.body['x-receiver'] 
      console.log('Receiver in middleware ....======>', req.body['receiver']);
    }
    if(!req.body['sender'] || !req.body['receiver']) {
      throw new HttpException(EXCEPTION_ERROR_MSG, EXCEPTION_STATUS_CODE)
    }
    next();
  }
}
