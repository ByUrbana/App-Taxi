import { BadRequestException, Injectable } from '@nestjs/common';

import * as fs from 'fs';
import { join } from 'path';
import * as fastify from 'fastify';
import { Repository } from 'typeorm';
import { MediaEntity } from '@urbana/database/media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as util from 'util';
import { pipeline } from 'stream';
import urlJoin from 'proper-url-join';

const pump = util.promisify(pipeline);

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
  ) {}

  async uploadMedia(
    req: fastify.FastifyRequest,
    res: fastify.FastifyReply,
    dir: string,
    fileNamePrefix?: string,
    saveToDb = true,
  ): Promise<string | null> {
    //Check request is multipart
    if (!req.isMultipart()) {
      res.send(new BadRequestException());
      return;
    }
    const data = await req.file();
    await fs.promises.mkdir(dir, { recursive: true });
    const _fileName = join(
      dir,
      fileNamePrefix != null
        ? `${fileNamePrefix}-${data.filename}`
        : data.filename,
    );
    await pump(data.file, fs.createWriteStream(_fileName));
    let id = '0';
    if (saveToDb) {
      const insert = await this.mediaRepository.insert({ address: _fileName });
      id = insert.raw.insertId.toString();
    }
    res.code(200).send({
      id: id,
      address: urlJoin(process.env.CDN_URL, _fileName),
    });
  }
}
