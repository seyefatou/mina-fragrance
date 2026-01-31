import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto } from './dto/category.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les catégories' })
  @ApiResponse({ status: 200, description: 'Liste des catégories', type: [CategoryResponseDto] })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une catégorie par ID' })
  @ApiResponse({ status: 200, description: 'Catégorie trouvée', type: CategoryResponseDto })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Récupère une catégorie par slug' })
  @ApiResponse({ status: 200, description: 'Catégorie trouvée', type: CategoryResponseDto })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
  findBySlug(@Param('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crée une nouvelle catégorie (Admin)' })
  @ApiResponse({ status: 201, description: 'Catégorie créée', type: CategoryResponseDto })
  @ApiResponse({ status: 409, description: 'Catégorie déjà existante' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifie une catégorie (Admin)' })
  @ApiResponse({ status: 200, description: 'Catégorie modifiée', type: CategoryResponseDto })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprime une catégorie (Admin)' })
  @ApiResponse({ status: 200, description: 'Catégorie supprimée' })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
  @ApiResponse({ status: 409, description: 'Catégorie contient des produits' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
