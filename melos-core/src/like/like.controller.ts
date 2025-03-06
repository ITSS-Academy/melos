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
  Request,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('create-like')
  createLike(@Body() data: { song_id: string; uid: string }) {
    try {
      return this.likeService.create(data.song_id, data.uid);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-song-liked-by-uid')
  getSongLikedByUid(@Request() req: any) {
    try {
      const { uid } = req.query;
      return this.likeService.getSongLikedByUid(uid);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-song-id-liked-by-uid')
  getSongIdLikedByUid(@Request() req: any) {
    try {
      const { uid } = req.query;
      return this.likeService.getSongIdLikedByUid(uid);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete-like')
  removeLike(@Body() data: { uid: string; song_id: string }) {
    try {
      return this.likeService.remove(data.uid, data.song_id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
