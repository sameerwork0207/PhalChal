import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { items, slot, villageId, total, commission, deliveryFee } = body;

    // In a real app we'd verify item prices and recalculate totals on the server
    
    const order = await prisma.order.create({
      data: {
        studentId: session.user.id,
        villageId,
        slot,
        total,
        commission,
        deliveryFee,
        status: "PLACED",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let orders;
    if (session.user.role === "STUDENT") {
      orders = await prisma.order.findMany({
        where: { studentId: session.user.id },
        include: { items: { include: { product: true } }, village: true, deliveryBoy: true },
        orderBy: { createdAt: "desc" }
      });
    } else if (session.user.role === "FARMER") {
      // Find orders that contain items from this farmer
      orders = await prisma.order.findMany({
        where: {
          items: {
            some: {
              product: { farmerId: session.user.id }
            }
          }
        },
        include: { items: { include: { product: true } }, village: true }
      });
    } else if (session.user.role === "DELIVERY") {
      // Find orders for the delivery guy's village
       const user = await prisma.user.findUnique({ where: { id: session.user.id }});
       orders = await prisma.order.findMany({
         where: { villageId: user?.villageId || "" },
         include: { student: true, items: { include: { product: true } }, village: true }
       });
    } else {
       // ADMIN
       orders = await prisma.order.findMany({
         include: { student: true, village: true }
       });
    }

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
