import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import SignupDto from './dto/signup.dto';
import SigninDto from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createAuthDto: SignupDto) {
    Logger.log('bati no signup');
    return this.authService.signup(createAuthDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    Logger.log('bati no signin');
    return this.authService.signin(signinDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
