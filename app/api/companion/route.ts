import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();

    const { name, description, instructions, src, seed, categoryId } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized Access", { status: 400 });
    }

    if (
      !name ||
      !description ||
      !instructions ||
      !src ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse("Missing Required Fields", { status: 400 });
    }

    //TODO : check for subscription

    const companion = await prismadb.companion.create({
      data: {
        userId: user.id,
        userName: user.firstName,
        name,
        description,
        instructions,
        src,
        seed,
        categoryId,
      },
    });

    return NextResponse.json(companion);

  } catch (error) {

    console.log("COMPANION API", error);

  }
}
