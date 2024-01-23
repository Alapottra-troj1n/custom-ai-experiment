import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();

    const { name, description, instructions, src, seed, categoryId } = body;

    if (!params.companionId) {
      return new NextResponse("Companion ID is required", { status: 400 });
    }

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

    const companion = await prismadb.companion.update({
      where: {
        id: params.companionId,
        userId: user.id
      },
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

export async function DELETE(req:Request, {params}: {params: {
  companionId:string
}}) {

  try {

    const { userId } = auth();

    if(!userId){
      return new Response('Forbidden Access', {status: 401})
    }

    const companion = await prismadb.companion.delete({
      where: {
        id: params.companionId
      }
    })

    
    
    return NextResponse.json(companion);

  } catch (error) {
      console.log(error)
      return new NextResponse("Internal Error", { status: 500 });
  }
  
}