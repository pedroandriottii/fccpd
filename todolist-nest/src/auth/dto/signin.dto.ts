import { IsNotEmpty, MinLength } from 'class-validator';

export default class SigninDto {
  @IsNotEmpty({ message: 'Username é obrigatório' })
  username: string;

  @IsNotEmpty({ message: 'Password é obrigatório' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  password: string;
}
