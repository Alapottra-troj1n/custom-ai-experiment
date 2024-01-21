'use client'

import { Companion, Message } from "@prisma/client";


interface ChatClientProps {
        companion : Companion & {
            Message: Message[]
            _count: {
                Message: number
            }
        }
}

const ChatClient = ({companion}: ChatClientProps) => {
    return ( <div  className="flex flex-col h-full p-4 space-y-2">
        ChatID client
    </div> );
}
 
export default ChatClient;