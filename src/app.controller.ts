import { Controller, Get, Post } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller()
export class AppController {
  constructor(private readonly videoService: VideoService) {}

  @Post('video')
  createVideo() {
    return this.videoService.publish();
  }
}
