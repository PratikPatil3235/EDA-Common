import { Injectable } from '@nestjs/common';
import { ViewerService } from './viewer.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { VideoCreatedEvent } from './video-created.event';

@Injectable()
export class VideoService {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  async publish() {
    const title = 'How to smash a like button';
    console.log('Publishing a new Video');

    const result = await this.eventEmitter.emitAsync('video.created',
        new VideoCreatedEvent(title)
    );

    console.log(result);

    return 'all done';
  }
}
