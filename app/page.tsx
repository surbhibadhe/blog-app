
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import ArticleFilters from "@/app/components/ArticleFilters";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#20201e]">
      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-10">
        <nav className="flex items-center justify-between border-b border-stone-200 pb-5">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            the.dev<span className="text-blue-600">/</span>journal
          </Link>

          <Link
            href="/dashboard"
            className="text-sm text-stone-600 transition hover:text-black"
          >
            Dashboard ↗
          </Link>
        </nav>

        <header className="py-16 sm:py-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
            Notes on software engineering
          </p>

          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Think clearly.
            <br />
            <span className="text-stone-400">
              Build better software.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-stone-600">
            Practical DSA problems, backend fundamentals, and engineering
            concepts — explained with code, complexity, and real examples.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-stone-500">
            <span>10 articles</span>
            <span>·</span>
            <span>C++ and backend engineering</span>
            <span>·</span>
            <span>Practical learning notes</span>
          </div>
        </header>

        <ArticleFilters posts={posts} />

        <footer className="mt-16 flex flex-col justify-between gap-3 border-t border-stone-200 py-6 text-xs text-stone-500 sm:flex-row">
          <span>the.dev/journal</span>
          <span>Built with Next.js · Learn by building</span>
        </footer>
      </div>
    </main>
  );
}
