import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, AdminGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('admins')
  @ApiOperation({ summary: 'Lister tous les administrateurs' })
  @ApiResponse({ status: 200, description: 'Liste des administrateurs' })
  async getAdmins() {
    return this.usersService.getAdmins();
  }

  @Post('admins')
  @ApiOperation({ summary: 'Créer un nouvel administrateur' })
  @ApiResponse({ status: 201, description: 'Administrateur créé' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé' })
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.usersService.createAdmin(createAdminDto);
  }

  @Put('admins/:id')
  @ApiOperation({ summary: 'Modifier un administrateur' })
  @ApiResponse({ status: 200, description: 'Administrateur modifié' })
  async updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.usersService.updateAdmin(id, updateAdminDto);
  }

  @Put('admins/:id/toggle')
  @ApiOperation({ summary: 'Activer/Désactiver un administrateur' })
  @ApiResponse({ status: 200, description: 'Statut modifié' })
  async toggleAdmin(@Param('id') id: string) {
    return this.usersService.toggleAdmin(id);
  }

  @Delete('admins/:id')
  @ApiOperation({ summary: 'Supprimer un administrateur' })
  @ApiResponse({ status: 200, description: 'Administrateur supprimé' })
  async deleteAdmin(@Param('id') id: string) {
    return this.usersService.deleteAdmin(id);
  }
}
