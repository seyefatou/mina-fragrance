import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // Create categories
  const categories = [
    { name: 'Parfums & Brumes', slug: 'parfums-brumes' },
    { name: 'Soins du Corps', slug: 'soins-corps' },
    { name: 'Déodorants', slug: 'deodorants' },
  ];

  console.log('📁 Creating categories...');
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: category,
    });
    console.log(`   ✓ ${created.name}`);
  }

  // Create admin user if not exists
  const adminEmail = 'admin@minaafragrance.com';
  console.log('\n👤 Creating admin user...');

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin MinaaFragrance',
        role: 'ADMIN',
      },
    });
    console.log('   ✓ Admin créé: admin@minaafragrance.com / admin123');
  } else {
    console.log('   ℹ Admin existe déjà');
  }

  // Create some sample products
  console.log('\n📦 Creating sample products...');

  const parfumsCategory = await prisma.category.findUnique({ where: { slug: 'parfums-brumes' } });
  const soinsCategory = await prisma.category.findUnique({ where: { slug: 'soins-corps' } });
  const deoCategory = await prisma.category.findUnique({ where: { slug: 'deodorants' } });

  if (parfumsCategory && soinsCategory && deoCategory) {
    const products = [
      {
        name: 'Parfum Rose Élégance',
        description: 'Un parfum envoûtant aux notes de rose et de jasmin. Parfait pour les occasions spéciales.',
        price: 15000,
        categoryId: parfumsCategory.id,
        stock: 25,
        featured: true,
        images: '[]',
      },
      {
        name: 'Brume Corporelle Vanille',
        description: 'Une brume légère et rafraîchissante aux douces notes de vanille.',
        price: 8000,
        categoryId: parfumsCategory.id,
        stock: 30,
        featured: true,
        images: '[]',
      },
      {
        name: 'Lait de Corps Karité',
        description: 'Un lait hydratant enrichi au beurre de karité pour une peau douce et nourrie.',
        price: 6500,
        categoryId: soinsCategory.id,
        stock: 40,
        featured: true,
        images: '[]',
      },
      {
        name: 'Huile Anti-Vergetures',
        description: 'Huile naturelle pour prévenir et atténuer les vergetures. Formule enrichie en vitamine E.',
        price: 9500,
        categoryId: soinsCategory.id,
        stock: 20,
        featured: false,
        images: '[]',
      },
      {
        name: 'Gel Douche Fleur de Coton',
        description: 'Gel douche doux et moussant aux extraits de fleur de coton.',
        price: 4500,
        categoryId: soinsCategory.id,
        stock: 50,
        featured: false,
        images: '[]',
      },
      {
        name: 'Crème Mains Aloe Vera',
        description: 'Crème hydratante pour les mains à l\'aloe vera. Absorption rapide.',
        price: 3500,
        categoryId: soinsCategory.id,
        stock: 35,
        featured: false,
        images: '[]',
      },
      {
        name: 'Déocrème Naturel',
        description: 'Déodorant crème 100% naturel, efficace 24h. Sans aluminium.',
        price: 5000,
        categoryId: deoCategory.id,
        stock: 45,
        featured: true,
        images: '[]',
      },
      {
        name: 'Déodorant Spray Fresh',
        description: 'Déodorant spray longue durée avec une fraîcheur intense.',
        price: 4000,
        categoryId: deoCategory.id,
        stock: 60,
        featured: false,
        images: '[]',
      },
      {
        name: 'Déodorant Stick Douceur',
        description: 'Déodorant stick pratique et efficace. Format voyage.',
        price: 3500,
        categoryId: deoCategory.id,
        stock: 55,
        featured: false,
        images: '[]',
      },
    ];

    for (const product of products) {
      const existing = await prisma.product.findFirst({ where: { name: product.name } });
      if (!existing) {
        await prisma.product.create({ data: product });
        console.log(`   ✓ ${product.name}`);
      } else {
        console.log(`   ℹ ${product.name} existe déjà`);
      }
    }
  }

  console.log('\n✅ Seeding terminé avec succès!');
  console.log('\n📋 Récapitulatif:');
  console.log(`   - ${await prisma.category.count()} catégories`);
  console.log(`   - ${await prisma.product.count()} produits`);
  console.log(`   - ${await prisma.user.count()} utilisateurs`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
