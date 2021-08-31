import { Controller, Get, Post, Param, Put } from '@nestjs/common';
import { TransitionsService } from './transitions.service';

@Controller('transitions')
export class TransitionsController {
  constructor(private readonly transitionsService: TransitionsService) {}

  @Get("")
  get() {
    return this.transitionsService.get();
  }

  @Post("")
  post() {
    return this.transitionsService.reset();
  }

  @Put(':color')
  goNext(@Param('color') color: string) {
    return this.transitionsService.goNext(color);
  }
}
