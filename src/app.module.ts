import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VideoService } from './video.service';
import { ViewerService } from './viewer.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [VideoService, ViewerService],
})
export class AppModule {}
