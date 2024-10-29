import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [AuthModule, CategoryModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
