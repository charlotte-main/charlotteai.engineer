import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  description?: string;
}

function parsePost(filePath: string, slug: string): BlogPost {
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return {
    slug,
    title: data.title,
    date: data.date,
    content,
    description: data.description,
  };
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(POSTS_PATH);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      return parsePost(path.join(POSTS_PATH, file), slug);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return parsePost(fullPath, slug);
}
