import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req: { userid: number },
  ) {
    return await this.categoryService.create(createCategoryDto, req.userid);
  }

  @Get()
  async findAll(@Req() req: { userid: number }) {
    return await this.categoryService.findAll(req.userid);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: { userid: number }) {
    return await this.categoryService.findOne(+id, req.userid);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: { userid: number },
  ) {
    return await this.categoryService.update(
      +id,
      updateCategoryDto,
      req.userid,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: { userid: number }) {
    return await this.categoryService.remove(+id, req.userid);
  }
}
