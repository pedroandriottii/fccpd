import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  @MaxLength(100, { message: 'O campo nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsOptional()
  @MaxLength(255, {
    message: 'O campo descrição deve ter no máximo 255 caracteres',
  })
  description?: string;
}
