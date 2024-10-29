import { IsNotEmpty, IsOptional, IsBoolean, IsString, IsInt, IsDate, IsDateString } from 'class-validator';

export class CreateTodoDto {
    @IsInt()
    @IsOptional()
    categoryId?: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    @IsNotEmpty()
    dueDate: string;
} 