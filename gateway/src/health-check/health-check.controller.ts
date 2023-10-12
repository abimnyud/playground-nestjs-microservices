import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('health check')
@Controller('health-check')
export class HealthCheckController {
  @Get()
  healthCheck(@Res() res: Response) {
    res.status(HttpStatus.OK).send('OK');
  }
}
