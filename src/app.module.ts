import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransitionsModule } from './transitions/transitions.module';

@Module({
  imports: [TransitionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
