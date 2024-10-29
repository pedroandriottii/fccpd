import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export default class SignupDto {
  @IsNotEmpty({ message: 'Username é obrigatório' })
  username: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'Password é obrigatório' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  password: string;
}
