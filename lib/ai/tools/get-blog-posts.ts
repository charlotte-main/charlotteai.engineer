import { tool } from "ai";
import { z } from "zod";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const getBlogPosts = tool({
  description:
    "Get blog posts. Can fetch most recent post or multiple posts with limit",
  parameters: z.object({
    limit: z
      .number()
      .optional()
      .describe(
        "Number of posts to return. If not provided, returns most recent post"
      ),
  }),
  execute: async ({ limit }) => {
    const posts = getAllPosts();
    if (posts.length === 0) {
      return {
        type: "error",
        message: "No blog posts found",
      };
    }

    // Format posts for display
    const formattedPosts = posts.map((post) => ({
      title: post.title,
      slug: post.slug,
      date: post.date,
      description: post.description || `Read ${post.title}`,
      url: `/blog/${post.slug}`,
    }));

    if (!limit) {
      // Return most recent post
      return {
        type: "single",
        post: formattedPosts[0],
      };
    }

    // Return limited number of posts
    return {
      type: "multiple",
      posts: formattedPosts.slice(0, limit),
    };
  },
});
