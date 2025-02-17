"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ChatRequestOptions, CreateMessage, Message } from "ai";
import { memo } from "react";

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
}

// Add color and SVG options
const backgroundColors = [
  "bg-pink-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-purple-100",
  "bg-yellow-100",
  "bg-orange-100",
];

// Update the decorative SVGs with svgicon.net style doodles
const decorativeSvgs = [
  // Brush stroke
  <svg
    key="brush"
    className="absolute right-2 bottom-2 w-10 h-10 text-black/10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      d="M3 21c3-3 6-15 18-15M3 16c3-3 6-9 18-9M3 11c3-3 6-3 18-3"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="2 4"
    />
  </svg>,
  // Scribble circle
  <svg
    key="scribble-circle"
    className="absolute right-2 bottom-2 w-10 h-10 text-black/10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      d="M12 3c6.5-.5 9.5 4 9 9-.5 5-4.5 9-9 9s-8.5-4-9-9c-.5-5 2.5-9.5 9-9z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="3 3"
    />
  </svg>,
  // Wavy lines
  <svg
    key="wavy"
    className="absolute right-2 bottom-2 w-10 h-10 text-black/10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      d="M2 6c2-2 4 2 6 0c2-2 4 2 6 0c2-2 4 2 6 0M2 12c2-2 4 2 6 0c2-2 4 2 6 0c2-2 4 2 6 0M2 18c2-2 4 2 6 0c2-2 4 2 6 0c2-2 4 2 6 0"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>,
  // Abstract arrows
  <svg
    key="arrows"
    className="absolute right-2 bottom-2 w-10 h-10 text-black/10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      d="M12 3v18M12 3l-4 4M12 3l4 4M12 21l-4-4M12 21l4-4"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>,
];

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: "How does Charlotte write prompts",
      label: "give the docs",
      action: "Give the best resolution for 2024",
    },
    {
      title: "What is Charlotte's tech stack?",
      label: "please list her technical skills",
      action: "What are the advantages of using Next.js?",
    },
    {
      title: "Show me the latest Blog posts",
      label: "list the 10 most recent",
      action: "What are the advantages of using Next.js?",
    },
    {
      title: "How was this website built?",
      label: "give me a high level overview",
      action: "What are the advantages of using Next.js?",
    },
    {
      title: "What Projects has Charlotte worked on?",
      label: `list the 10 most recent`,
      action: `Help me write an essay about silicon valley`,
    },
    {
      title: "What is the weather in Ipswich UK?",
      label: "in Ipswich UK?",
      action: "What is the weather in Ipswich UK?",
    },
  ];

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-full p-2">
        {suggestedActions.map((suggestedAction, index) => {
          const randomColor =
            backgroundColors[
              Math.floor(Math.random() * backgroundColors.length)
            ];
          const randomSvg =
            decorativeSvgs[Math.floor(Math.random() * decorativeSvgs.length)];

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.05 * index }}
              key={`suggested-action-${suggestedAction.title}-${index}`}
              className="flex-shrink-0"
            >
              <Button
                variant="ghost"
                onClick={async () => {
                  window.history.replaceState({}, "", `/chat/${chatId}`);
                  append({
                    role: "user",
                    content: suggestedAction.action,
                  });
                }}
                className={`relative text-left h-48 rounded-2xl px-6 py-8 w-[260px] flex flex-col justify-between items-start ${randomColor} hover:scale-105 transition-transform duration-200 overflow-hidden`}
              >
                <div className="space-y-2 max-w-full">
                  <h3 className="font-medium text-lg leading-tight break-words whitespace-pre-wrap pr-8">
                    {suggestedAction.title}
                  </h3>
                  <span className="text-xs text-muted-foreground block">
                    {suggestedAction.label}
                  </span>
                </div>
                {randomSvg}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
