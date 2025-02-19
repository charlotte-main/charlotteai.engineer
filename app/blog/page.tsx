import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.slug} className="border-b pb-6">
            <Link
              href={`/blog/${post.slug}`}
              className="text-2xl font-semibold hover:text-blue-500"
            >
              {post.title}
            </Link>
            <div className="text-gray-500 mt-2">{formatDate(post.date)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
