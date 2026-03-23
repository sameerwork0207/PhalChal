import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing existing data...')
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()
  await prisma.village.deleteMany()

  console.log('Creating villages...')
  const villagesData = [
    { name: 'Dhamori', distance: 11 },
    { name: 'Pohegaon', distance: 9 },
    { name: 'Yesgaon', distance: 9 },
    { name: 'Sonewadi', distance: 11 },
    { name: 'Kolpewadi', distance: 12 },
    { name: 'Padhegaon', distance: 10.5 },
    { name: 'Karandi BK', distance: 12 }
  ]

  const createdVillages = []
  for (const v of villagesData) {
    const village = await prisma.village.create({ data: v })
    createdVillages.push(village)
  }

  const defaultPassword = await bcrypt.hash('password123', 10)

  console.log('Creating users...')
  // Admin
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@khetconnect.com',
      password: defaultPassword,
      role: 'ADMIN',
      phone: '9999999999'
    }
  })

  // Delivery Partner
  const delivery = await prisma.user.create({
    data: {
      name: 'Raju Delivery',
      email: 'delivery@khetconnect.com',
      password: defaultPassword,
      role: 'DELIVERY',
      phone: '8888888888',
      villageId: createdVillages[0].id
    }
  })

  // Farmer
  const farmer = await prisma.user.create({
    data: {
      name: 'Kisan Ramesh',
      email: 'farmer@khetconnect.com',
      password: defaultPassword,
      role: 'FARMER',
      phone: '7777777777',
      villageId: createdVillages[1].id
    }
  })

  // Student
  const student = await prisma.user.create({
    data: {
      name: 'Rahul Student',
      email: 'student@example.com',
      password: defaultPassword,
      role: 'STUDENT',
      phone: '6666666666'
    }
  })

  console.log('Creating products...')
  const productsData = [
    { name: 'Onion', category: 'Vegetables', price: 40, unit: 'kg' },
    { name: 'Potato', category: 'Vegetables', price: 30, unit: 'kg' },
    { name: 'Tomato', category: 'Vegetables', price: 25, unit: 'kg' },
    { name: 'Banana', category: 'Fruits', price: 50, unit: 'dozen' },
    { name: 'Milk', category: 'Dairy', price: 60, unit: 'liter' },
    { name: 'Paneer', category: 'Dairy', price: 320, unit: 'kg' }
  ]

  for (const p of productsData) {
    await prisma.product.create({
      data: {
        ...p,
        farmerId: farmer.id
      }
    })
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
