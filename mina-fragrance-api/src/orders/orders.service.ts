import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SmsService } from '../sms/sms.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private smsService: SmsService,
  ) {}

  async findAll(userId?: string, isAdmin = false) {
    const where = isAdmin ? {} : { userId };

    return this.prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId?: string, isAdmin = false) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Commande non trouvée');
    }

    if (!isAdmin && order.userId !== userId) {
      throw new NotFoundException('Commande non trouvée');
    }

    return order;
  }

  async create(userId: string | null, createOrderDto: CreateOrderDto) {
    const productIds = createOrderDto.items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('Un ou plusieurs produits n\'existent pas');
    }

    for (const item of createOrderDto.items) {
      const product = products.find((p) => p.id === item.productId);
      if (product && product.stock < item.quantity) {
        throw new BadRequestException(
          `Stock insuffisant pour le produit "${product.name}". Disponible: ${product.stock}`,
        );
      }
    }

    let total = 0;
    const orderItems = createOrderDto.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const orderData: any = {
      total,
      address: createOrderDto.address,
      phone: createOrderDto.phone,
      items: {
        create: orderItems,
      },
    };

    if (userId) {
      orderData.userId = userId;
    } else {
      orderData.guestName = createOrderDto.guestName;
      orderData.guestEmail = createOrderDto.guestEmail;
    }

    const order = await this.prisma.order.create({
      data: orderData,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    for (const item of createOrderDto.items) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return order;
  }

  async updateStatus(id: string, updateStatusDto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Commande non trouvée');
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: updateStatusDto.status,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Envoyer un SMS au client si un numéro de téléphone est disponible
    const phone = updatedOrder.phone;
    if (phone) {
      const orderRef = updatedOrder.id.slice(0, 8).toUpperCase();

      switch (updateStatusDto.status) {
        case 'CONFIRMED':
          await this.smsService.sendOrderConfirmed(phone, orderRef, updatedOrder.total);
          break;
        case 'SHIPPED':
          await this.smsService.sendOrderShipped(phone, orderRef);
          break;
        case 'DELIVERED':
          await this.smsService.sendOrderDelivered(phone, orderRef);
          break;
      }
    }

    return updatedOrder;
  }

  async getStats() {
    const [totalOrders, totalRevenue, pendingOrders, ordersByStatus] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.order.aggregate({
        _sum: {
          total: true,
        },
      }),
      this.prisma.order.count({
        where: { status: 'PENDING' },
      }),
      this.prisma.order.groupBy({
        by: ['status'],
        _count: true,
      }),
    ]);

    return {
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      pendingOrders,
      ordersByStatus,
    };
  }
}
