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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(
    @Body() data: { song_id: string; uid: string; content: string },
  ) {
    try {
      return this.commentService.createComment(
        data.song_id,
        data.uid,
        data.content,
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('song-comment')
  getCommentBySongId(@Request() req: any) {
    try {
      const { song_id } = req.query;
      return this.commentService.getCommentBySongId(song_id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  deleteComeentById(@Request() req: any) {
    try {
      const { id, uid } = req.query;
      return this.commentService.deleteComeentById(id, uid);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
