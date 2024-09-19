import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { Optional } from 'src/common/types/opitional';
import { slugify } from 'src/common/utils/slugify';
import { Stuff } from './schemas/stuff.schema';
import { IStuff } from './interfaces/stuff.interface';
import { Content } from './schemas/content.schema';

@Injectable()
export class StuffService {
  // private readonly stuffs: Stuff[] = [];

  constructor(
    @InjectModel(Content.name) private readonly contentsModel: Model<Content>,
    @InjectModel(Stuff.name) private readonly stuffsModel: Model<Stuff>,
  ) {}

  async createStuff(
    stuff: Optional<IStuff, 'slug' | 'createdAt' | 'updatedAt'>,
  ) {
    const slug = slugify(`${stuff.title} ${nanoid()}`);

    const content = await this.contentsModel.create({
      raw: stuff.content,
    });

    const { id } = await this.stuffsModel.create({
      ...stuff,
      slug,
      content: content._id,
      createdAt: new Date().toISOString(),
    });

    return {
      stuffId: id,
      slug,
    };
  }

  async getStuffBySlug(slug?: string) {
    if (!slug) {
      return null;
    }

    const stuff = await this.stuffsModel.findOne({ slug }).populate('content');

    return stuff ?? null;
  }
}
