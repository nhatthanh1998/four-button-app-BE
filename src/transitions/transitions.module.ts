import { Module } from '@nestjs/common';
import { TransitionsService } from './transitions.service';
import { TransitionsController } from './transitions.controller';

@Module({
  controllers: [TransitionsController],
  providers: [TransitionsService]
})
export class TransitionsModule {}
