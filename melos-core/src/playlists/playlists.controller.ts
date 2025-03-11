import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Query,
  Request,
  Put,
  Delete,
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
    try {
      console.log('data', data);
      data.songs_id = [];

      if (!file) {
        return await this.playlistsService.createPlaylistWithoutImage(data);
      } else {
        return await this.playlistsService.createPlaylistWithImage(file, data);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update-songList')
  async updateSongList(@Body() data: any) {
    try {
      console.log('data', data);
      if (!data.id) {
        throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
      }

      if (!data.songId) {
        throw new HttpException('SongId is required', HttpStatus.BAD_REQUEST);
      }

      return await this.playlistsService.addSongToPlaylist(
        data.id,
        data.songId,
        data.uid,
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update-playlist')
  @UseInterceptors(FileInterceptor('file')) // Nhận file từ FormData
  async updatePlaylist(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: Partial<any>,
  ) {
    try {
      console.log('data', data);
      data.songs_id = [];

      if (!file) {
        return await this.playlistsService.updatePlaylistWithoutImage(
          data.id,
          data.uid,
          data.name,
          data.description,
        );
      } else {
        return await this.playlistsService.updatePlaylistWithImage(
          data.id,
          data.uid,
          data.name,
          data.description,
          file,
        );
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('playlist-song')
  async getPlaylistSong(@Request() req: any) {
    try {
      const { id } = req.query;
      console.log('req', id);

      return await this.playlistsService.getSongByPlaylistId(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('pin')
  async pinPlaylist(@Body() data: any) {
    try {
      console.log('data', data);
      if (!data.id) {
        throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
      }
      return await this.playlistsService.updatePinedPlaylist(data.id, data.uid);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async deletePlaylist(@Request() req: any) {
    try {
      const { id, uid } = req.query;
      if (!id) {
        throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
      } else if (!uid) {
        throw new HttpException('Uid is required', HttpStatus.BAD_REQUEST);
      }
      return await this.playlistsService.deletePlaylist(id, uid);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('song')
  async deleteSongFromPlaylist(@Request() req: any) {
    try {
      const { id, songId, uid } = req.query;

      if (!id) {
        throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
      }
      if (!songId) {
        throw new HttpException('SongId is required', HttpStatus.BAD_REQUEST);
      }
      return await this.playlistsService.removeSongFromPlaylist(
        id,
        songId,
        uid,
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user')
  async getPlayListsByUserId(@Request() req: any) {
    try {
      const { uid } = req.query;
      console.log('uid', uid);
      return await this.playlistsService.getPlayListsByUserId(uid);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user/playlist')
  async getPlaylistById(@Request() req: any) {
    try {
      const { id } = req.query;
      return await this.playlistsService.getPlaylistById(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('list-songsid')
  async getListSongsIdByUid(@Request() req: any) {
    try {
      const { uid } = req.query;
      console.log('uid list', uid);
      return await this.playlistsService.getListSongsIdAllPlaylists(uid);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
