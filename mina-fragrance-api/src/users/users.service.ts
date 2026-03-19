import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAdmins() {
    return this.prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: createAdminDto.email },
    });

    if (existing) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: createAdminDto.email,
        password: hashedPassword,
        name: createAdminDto.name,
        role: 'ADMIN',
        isActive: true,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };
  }

  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Administrateur non trouvé');
    }

    const data: any = {};
    if (updateAdminDto.name) data.name = updateAdminDto.name;
    if (updateAdminDto.email) {
      const existing = await this.prisma.user.findUnique({
        where: { email: updateAdminDto.email },
      });
      if (existing && existing.id !== id) {
        throw new ConflictException('Cet email est déjà utilisé');
      }
      data.email = updateAdminDto.email;
    }
    if (updateAdminDto.password) {
      data.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async toggleAdmin(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Administrateur non trouvé');
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return updated;
  }

  async deleteAdmin(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Administrateur non trouvé');
    }

    await this.prisma.user.delete({ where: { id } });

    return { message: 'Administrateur supprimé avec succès' };
  }
}
