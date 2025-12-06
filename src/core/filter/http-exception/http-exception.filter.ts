interface ValidationErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

type ExceptionResponse = string | ValidationErrorResponse;

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionResponse = exception.getResponse();
    const status = exception.getStatus();

    let data: ExceptionResponse;

    if (typeof exceptionResponse === 'string') {
      data = exceptionResponse;
    } else {
      data = exceptionResponse as ValidationErrorResponse;
    }

    response.status(status).send({
      code: -1,
      data,
    });
  }
}
