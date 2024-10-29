import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import SignupDto from './dto/signup.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import SigninDto from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: SignupDto) {
    const { email, username, password }: SignupDto = createAuthDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });

      const payload = { username: user.username, userid: user.id };

      const token = await this.jwtService.signAsync(payload);

      return {
        login: true,
        token: token,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Usuário já cadastrado');
      }
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  async signin(signinDto: SigninDto) {
    const { username, password }: SigninDto = signinDto;

    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Usuário ou senha inválidos');
    }

    const payload = { username: user.username, userid: user.id };

    const token = await this.jwtService.signAsync(payload);

    return {
      login: true,
      token: token,
    };
  }
}
