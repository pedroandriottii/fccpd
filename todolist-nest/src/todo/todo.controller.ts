import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Req() req: { userid: number }, @Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.create(createTodoDto, req.userid);
  }

  @Get()
  async findAll(@Req() req: { userid: number }) {
    return await this.todoService.findAll(req.userid);
  }

  @Get(':id')
  async findOne(@Req() req: {userid: number } , @Param('id') id: string) {
    return await this.todoService.findOne(+id, req.userid);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTodoDto: UpdateTodoDto, 
    @Req() req: { userid: number}) {
    return await this.todoService.update(+id, updateTodoDto, req.userid);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: { userid: number }) {
    return await this.todoService.remove(+id, req.userid);
  }
}
