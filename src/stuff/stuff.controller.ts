import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserSession } from 'src/common/decorators/user-session.decorator';
import {
  CreateStuffBody,
  createStuffBodyValidationPipe,
} from './interfaces/create-stuff.interface';
import { StuffService } from './stuff.service';
import { escapeString, unescapeString } from 'src/common/utils/escape-string';

@Controller('stuff')
export class StuffController {
  constructor(private stuffService: StuffService) {}

  @Post()
  async createStuff(
    @UserSession() sessionId: string,
    @Res() res: Response,
    @Body(createStuffBodyValidationPipe) body: CreateStuffBody,
  ) {
    const { title, raw_content } = body;

    const content = escapeString(raw_content);

    const { slug, stuffId } = await this.stuffService.createStuff({
      title: title,
      content,
      ownerTag: sessionId,
    });

    return res.status(HttpStatus.CREATED).json({
      slug,
      stuffId,
    });
  }

  @Get('/:slug')
  async getStuffBySlug(@Res() res: Response, @Param('slug') slug: string) {
    const stuff = await this.stuffService.getStuffBySlug(slug);

    if (!stuff) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Stuff not found' });
    }

    return res.status(HttpStatus.OK).json({
      stuff: {
        id: stuff.id,
        title: stuff.title,
        content: JSON.parse(unescapeString(stuff.content.raw)),
        createdAt: stuff.createdAt,
        updatedAt: stuff.updatedAt,
      },
    });
  }
  @Get('read/:slug')
  async readStuff(@Res() res: Response, @Param('slug') slug: string) {
    const stuff = await this.stuffService.getStuffBySlug(slug);

    if (!stuff) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Stuff not found' });
    }

    return res.status(HttpStatus.OK).json({
      ...JSON.parse(unescapeString(stuff.content.raw)),
    });
  }
}
