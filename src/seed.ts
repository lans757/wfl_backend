import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const hashedPasswordUser = await bcrypt.hash('user123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@wfl.com' },
    update: {},
    create: {
      email: 'admin@wfl.com',
      password: hashedPassword,
      name: 'Administrador WFL',
      role: 'admin',
    },
  });

  const testUser = await prisma.user.upsert({
    where: { email: 'user@wfl.com' },
    update: {},
    create: {
      email: 'user@wfl.com',
      password: hashedPasswordUser,
      name: 'Usuario de Prueba',
      role: 'user',
    },
  });

  console.log('Usuario admin creado:', adminUser);
  console.log('Email: admin@wfl.com');
  console.log('Password: admin123');
  console.log('Role:', adminUser.role);

  console.log('Usuario de prueba creado:', testUser);
  console.log('Email: user@wfl.com');
  console.log('Password: user123');
  console.log('Role:', testUser.role);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });