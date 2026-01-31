import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto, OrderResponseDto } from './dto/order.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Liste les commandes de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des commandes', type: [OrderResponseDto] })
  findAll(@Request() req: any) {
    const isAdmin = req.user.role === 'ADMIN';
    return this.ordersService.findAll(req.user.sub, isAdmin);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Statistiques des commandes (Admin)' })
  @ApiResponse({ status: 200, description: 'Statistiques' })
  getStats() {
    return this.ordersService.getStats();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupère une commande par ID' })
  @ApiResponse({ status: 200, description: 'Commande trouvée', type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  findOne(@Param('id') id: string, @Request() req: any) {
    const isAdmin = req.user.role === 'ADMIN';
    return this.ordersService.findOne(id, req.user.sub, isAdmin);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crée une nouvelle commande' })
  @ApiResponse({ status: 201, description: 'Commande créée', type: OrderResponseDto })
  @ApiResponse({ status: 400, description: 'Données invalides ou stock insuffisant' })
  create(@Body() createOrderDto: CreateOrderDto, @Request() req: any) {
    return this.ordersService.create(req.user.sub, createOrderDto);
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Met à jour le statut d\'une commande (Admin)' })
  @ApiResponse({ status: 200, description: 'Statut mis à jour', type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, updateStatusDto);
  }
}
