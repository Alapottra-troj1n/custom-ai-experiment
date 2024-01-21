import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatClient from "./_components/client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatId = async ({ params }: ChatIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      Message: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
          //important
        },
      },
      _count: {
        select: {
          Message: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect("/");
  }

  return <ChatClient companion={companion} />;
};

export default ChatId;
