export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="prose prose-lg max-w-3xl mx-auto px-4 py-8">
      {children}
    </article>
  );
}
