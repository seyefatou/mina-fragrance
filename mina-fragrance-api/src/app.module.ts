import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';
import { SmsModule } from './sms/sms.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    SmsModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    UploadModule,
    UsersModule,
  ],
})
export class AppModule {}
