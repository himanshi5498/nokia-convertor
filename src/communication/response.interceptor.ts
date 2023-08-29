import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { COMM_USERS, RESPONSE_MSGS } from 'src/constants';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request: Request | any = ctx.getRequest<Request>();
        console.log('Time taken to complete request  ....====>', (Date.now() - request.startTime) / 1000 + " sec");

        const response = next
            .handle()
            .pipe(map(data => {
                const dataObj = {
                    [`${request.body.receiver == COMM_USERS.EARTH ? RESPONSE_MSGS.EARTH : RESPONSE_MSGS.MARS}`]: data,
                    "Nokia Translation": request.body.message
                }
                console.log("JSON response in interception .....====>", JSON.stringify(dataObj));
                return dataObj;
            }
            ));
        console.log("--------------")
        return response;
    }
}