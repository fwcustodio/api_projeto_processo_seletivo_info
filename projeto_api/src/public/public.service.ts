import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicService {
  findAll() {
    return `This action returns all usuarios`;
  }
}
