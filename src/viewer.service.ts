import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { VideoCreatedEvent } from './video-created.event';

@Injectable()
export class ViewerService {
  @OnEvent('video.created', { async: true })
  async notify({ title }:VideoCreatedEvent) {
    console.log('1. notifying subscribers...', title);
    return 1;
  }

  @OnEvent('video.created', { async: true })
  async doSomething({ title }:VideoCreatedEvent) {
    console.log('2. do something');
    return 2;
  }
}
