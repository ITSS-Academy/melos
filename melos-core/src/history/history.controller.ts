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
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  async createHistory(@Body() data: { uid: string; songId: string }) {
    try {
      return this.historyService.createHistory(data.uid, data.songId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getHistoriesByUid(@Request() req: any) {
    try {
      const { uid } = req.query;
      return this.historyService.getHistoriesByUid(uid);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
