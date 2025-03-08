import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('create-song-queues')
  addSongToQueue(@Body() data: { songId: string; uid: string }) {
    try {
      return this.queueService.addSongToQueue(data.songId, data.uid);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('playlist-queues')
  addPlaylistToQueue(@Body() data: { playlistId: string }) {
    try {
      return this.queueService.addPlaylistToQueue(data.playlistId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('playlist-queues-random')
  addPlaylistToQueueRandom(@Body() data: { playlistId: string }) {
    try {
      return this.queueService.addPlaylistToQueueRandom(data.playlistId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-song-queues-user')
  getSongQueue(@Body() data: { uid: string }) {
    try {
      return this.queueService.getSongQueue(data.uid);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete-song-queues')
  removeSongFromQueue(@Body() data: { uid: string; songId: string }) {
    try {
      return this.queueService.removeSongFromQueue(data.uid, data.songId);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
