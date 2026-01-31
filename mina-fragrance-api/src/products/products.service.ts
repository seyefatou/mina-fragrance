import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Helper to parse images from JSON string
  private parseImages(images: string): string[] {
    try {
      return JSON.parse(images);
    } catch {
      return [];
    }
  }

  // Helper to transform product with parsed images
  private transformProduct(product: any) {
    if (!product) return product;
    return {
      ...product,
      images: this.parseImages(product.images),
    };
  }

  async findAll(query: ProductQueryDto) {
    const where: any = {};

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.featured !== undefined) {
      where.featured = query.featured;
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      where.price = {};
      if (query.minPrice !== undefined) {
        where.price.gte = query.minPrice;
      }
      if (query.maxPrice !== undefined) {
        where.price.lte = query.maxPrice;
      }
    }

    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products: products.map((p) => this.transformProduct(p)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findFeatured() {
    const products = await this.prisma.product.findMany({
      where: { featured: true },
      include: {
        category: true,
      },
      take: 8,
      orderBy: { createdAt: 'desc' },
    });

    return products.map((p) => this.transformProduct(p));
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Produit non trouvé');
    }

    return this.transformProduct(product);
  }

  async create(createProductDto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Catégorie non trouvée');
    }

    const product = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        images: JSON.stringify(createProductDto.images || []),
        categoryId: createProductDto.categoryId,
        stock: createProductDto.stock || 0,
        featured: createProductDto.featured || false,
      },
      include: {
        category: true,
      },
    });

    return this.transformProduct(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    if (updateProductDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: updateProductDto.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Catégorie non trouvée');
      }
    }

    const updateData: any = { ...updateProductDto };

    // Convert images array to JSON string if provided
    if (updateProductDto.images) {
      updateData.images = JSON.stringify(updateProductDto.images);
    }

    const product = await this.prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
      },
    });

    return this.transformProduct(product);
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }

  async updateStock(id: string, quantity: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Produit non trouvé');
    }

    const updated = await this.prisma.product.update({
      where: { id },
      data: {
        stock: product.stock + quantity,
      },
    });

    return this.transformProduct(updated);
  }
}
