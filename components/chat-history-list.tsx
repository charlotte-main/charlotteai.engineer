"use client";

import type { CreateMessage, Message } from "ai";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import type { Chat } from "@/lib/db/schema";
import { fetcher } from "@/lib/utils";
import { Button } from "./ui/button";

interface ChatHistoryListProps {
  append: (
    message: Message | CreateMessage
  ) => Promise<string | null | undefined>;
  chatId: string;
}

export function ChatHistoryList({ append, chatId }: ChatHistoryListProps) {
  const router = useRouter();
  const { data: history } = useSWR<Array<Chat>>("/api/history", fetcher, {
    fallbackData: [],
  });

  // Get the 5 most recent chats (not just titles)
  const recentChats = history?.slice(0, 5) || [];

  return (
    <div className="flex flex-wrap gap-2 mb-4 overflow-auto">
      {recentChats.map((chat) => (
        <Button
          key={chat.id}
          className="px-4 py-2 text-sm rounded-full transition-colors"
          onClick={() => {
            router.push(`/chat/${chat.id}`);
          }}
        >
          {chat.title}
        </Button>
      ))}
    </div>
  );
}
