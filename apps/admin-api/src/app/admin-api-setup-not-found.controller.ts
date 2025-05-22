import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import * as fastify from 'fastify';
import * as fs from 'fs';
import { join } from 'path';
import * as util from 'util';
import { pipeline } from 'stream';
import urlJoin from 'proper-url-join';
const pump = util.promisify(pipeline);

@Controller()
export class AdminApiSetupNotFoundController {
  constructor() {}

  @Get('/restart')
  restart(@Res() res: FastifyReply) {
    res.send('✅ Restarting...');
    process.exit(1);
  }

  @Post('upload')
  async upload(
    @Req() req: fastify.FastifyRequest,
    @Res() res: fastify.FastifyReply,
  ) {
    if (!req.isMultipart()) {
      res.send(new BadRequestException());
      return;
    }
    const data = await req.file();
    await fs.promises.mkdir('uploads', { recursive: true });
    const _fileName = join('uploads', `${data.filename}`);
    await pump(data.file, fs.createWriteStream(_fileName));
    res.code(200).send({
      id: '0',
      address: urlJoin(process.env.CDN_URL, _fileName),
    });
  }
}
