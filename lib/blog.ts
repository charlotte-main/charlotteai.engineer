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

function parseFileName(fileName: string) {
  const match = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.mdx$/);
  if (!match) {
    throw new Error(`Invalid blog post filename: ${fileName}`);
  }

  const [, date, slug] = match;
  return { date, slug };
}

// Test the function
console.assert(
  parseFileName("2024-01-21-hello-world.mdx").slug === "hello-world",
  "Slug parsing failed"
);
console.assert(
  parseFileName("2024-01-21-hello-world.mdx").date === "2024-01-21",
  "Date parsing failed"
);

function parsePost(filePath: string, fileName: string): BlogPost {
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  const { date, slug } = parseFileName(fileName);

  return {
    slug,
    title: data.title,
    // Use file date if frontmatter date is not provided
    date: data.date || date,
    content,
    description: data.description,
  };
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(POSTS_PATH);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((fileName) => {
      return parsePost(path.join(POSTS_PATH, fileName), fileName);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const files = fs.readdirSync(POSTS_PATH);
  const fileName = files.find((file) => file.endsWith(`-${slug}.mdx`));

  if (!fileName) {
    return null;
  }

  const fullPath = path.join(POSTS_PATH, fileName);
  return parsePost(fullPath, fileName);
}
