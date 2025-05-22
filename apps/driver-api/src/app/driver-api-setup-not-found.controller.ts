import { Controller, Get, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Controller()
export class DriverApiSetupNotFoundController {
  @Get('/')
  main(@Res() res: FastifyReply) {
    return res.redirect('/admin', 301);
  }

  @Get('/restart')
  restart(@Res() res: FastifyReply) {
    res.send('✅ Restarting...');
    process.exit(1);
  }
}
