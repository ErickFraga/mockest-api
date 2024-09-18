import { Inject, Injectable } from '@nestjs/common';
import { Stuff } from './interfaces/stuff.interface';
import { Optional } from 'src/common/types/opitional';
import { slugify } from 'src/common/utils/slugify';
import { nanoid } from 'nanoid';
import { Model } from 'mongoose';
import dayjs from 'dayjs';

@Injectable()
export class StuffService {
  // private readonly stuffs: Stuff[] = [];

  constructor(
    @Inject('STUFFS_MODEL') private readonly stuffsModel: Model<Stuff>,
  ) {}

  async createStuff(stuff: Optional<Stuff, 'slug' | 'createdAt'>) {
    const slug = slugify(`${stuff.title} ${nanoid()}`);

    const { id } = await this.stuffsModel.create({
      ...stuff,
      slug,
      createdAt: new Date().toISOString(),
    });

    // this.stuffs.push({
    //   ...stuff,
    //   slug,
    //   createdAt: new Date(),
    // });

    return {
      stuffId: id,
      slug,
    };
  }

  async getStuffBySlug(slug?: string) {
    if (!slug) {
      return null;
    }

    const stuff = await this.stuffsModel.findOne({ slug });

    return stuff ?? null;
  }
}
