import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto, userid: number) {
    const { name, description } = createCategoryDto;

    const category = await this.prisma.category.create({
      data: {
        name,
        description,
        userId: userid,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return category;
  }

  async findAll(userid: number) {
    const categories = await this.prisma.category.findMany({
      where: {
        userId: userid,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return categories;
  }

  async findOne(id: number, userid: number) {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
        userId: userid,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    userid: number,
  ) {
    try {
      const newCategory = await this.prisma.category.update({
        where: {
          id,
          userId: userid,
        },
        data: {
          name: updateCategoryDto.name,
          description: updateCategoryDto.description,
        },
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
      return newCategory;
    } catch {
      throw new NotFoundException('Categoria não encontrada');
    }
  }

  async remove(id: number, userid: number) {
    try {
      await this.prisma.category.delete({
        where: {
          id,
          userId: userid,
        },
      });
    } catch {
      throw new NotFoundException('Categoria não encontrada');
    }
  }
}
