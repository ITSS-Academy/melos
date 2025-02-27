import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file')) // Nhận file từ FormData
  async createPlaylist(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: Partial<any>,
  ) {
    if (!file) {
      return await this.playlistsService.createPlaylistWithoutImage(data);
    } else {
      return await this.playlistsService.createPlaylistWithImage(file, data);
    }
  }
}
