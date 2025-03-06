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
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('search-all')
  searchAll(@Request() req: any) {
    try {
      const { query } = req.query;
      return this.searchService.searchAll(query);
    } catch (e) {
      return {
        auth: [],
        songs: [],
        categories: [],
      };
    }
  }
}
