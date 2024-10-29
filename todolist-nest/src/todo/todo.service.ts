import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTodoDto: CreateTodoDto, userId: number) {
    const { categoryId, title, description, dueDate } = createTodoDto;

    const todo = await this.prisma.todo.create({
      data: {
        categoryId,
        title,
        description,
        dueDate,
        userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        dueDate: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return todo;
  }

  async findAll(userId: number) {
    const todos = await this.prisma.todo.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        dueDate: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return todos;
  }

  async findOne(id: number, userId: number) {
    const todo = await this.prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        dueDate: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!todo) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, userId: number) {
    const { categoryId, title, description, dueDate } = updateTodoDto;

    try {
      const todo = await this.prisma.todo.update({
        where: {
          id,
          userId,
        },
        data: {
          categoryId,
          title,
          description,
          dueDate,
        },
        select: {
          id: true,
          title: true,
          description: true,
          dueDate: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return todo;
    } catch {
      throw new NotFoundException('Tarefa não encontrada');
    }
  }

  async remove(id: number, userId: number) {
    try {
      await this.prisma.todo.delete({
        where: {
          id,
          userId,
        },
      });
    } catch {
      throw new NotFoundException('Tarefa não encontrada');
    }
  }
}
