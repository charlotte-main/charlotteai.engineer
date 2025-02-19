import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default components with custom styling
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-3">{children}</h2>
    ),
    p: ({ children }) => <p className="mb-4">{children}</p>,
    a: ({ href, children }) => (
      <Link href={href || ""} className="text-blue-500 hover:underline">
        {children}
      </Link>
    ),
    img: ({ src, alt, ...props }: ImageProps) => (
      <Image
        src={src}
        alt={alt || ""}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...props}
      />
    ),
    ...components,
  };
}
