import Link from "next/link";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";
import { getPost } from "@/lib/posts";

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, index) => ({
    id: String(index + 1),
  }));
}

async function CachedBlogPost({ id }: { id: string }) {
  "use cache";

  cacheLife({
    stale: 60,
    revalidate: 60,
    expire: 300,
  });

  const post = await getPost(id);

  if (!post || !post.id) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#20201e]">
      <div className="mx-auto max-w-4xl px-6 py-8 sm:px-10">
        <nav className="flex items-center justify-between border-b border-stone-200 pb-5">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            the.dev<span className="text-blue-600">/</span>journal
          </Link>

          <Link
            href="/dashboard"
            className="text-sm text-stone-500 transition hover:text-blue-700"
          >
            Dashboard ↗
          </Link>
        </nav>

        <article>
          <header className="border-b border-stone-200 py-10 sm:py-14">
            <Link
              href="/"
              className="text-sm text-stone-500 transition hover:text-blue-700"
            >
              ← Back to all articles
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
              <span className="font-semibold uppercase tracking-widest text-blue-700">
                {post.category}
              </span>
              <span className="text-stone-300">/</span>
              <span className="text-stone-500">{post.difficulty}</span>
              <span className="text-stone-300">/</span>
              <span className="text-stone-500">{post.readTime} read</span>
            </div>

            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600">
              {post.body}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-stone-200 px-3 py-1.5 text-xs text-stone-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {post.problem && (
            <div className="grid gap-12 py-10 sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-14">
              <div className="min-w-0 space-y-10">
                <section>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-700">
                    01 / Problem
                  </p>
                  <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                    Problem statement
                  </h2>
                  <p className="whitespace-pre-line text-base leading-8 text-stone-600">
                    {post.problem.statement}
                  </p>
                </section>

                <section>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-700">
                    02 / Examples
                  </p>
                  <h2 className="mb-5 text-2xl font-semibold tracking-tight">
                    Worked examples
                  </h2>

                  <div className="space-y-4">
                    {post.problem.examples.map((example, index) => (
                      <div
                        key={index}
                        className="border border-stone-200 p-5 sm:p-6"
                      >
                        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-stone-500">
                          Example {index + 1}
                        </p>
                        <div className="space-y-4 text-sm">
                          <div>
                            <p className="mb-2 text-stone-500">Input</p>
                            <pre className="overflow-x-auto whitespace-pre-wrap break-words bg-stone-100 p-3 font-mono text-stone-800">
                              {example.input}
                            </pre>
                          </div>
                          <div>
                            <p className="mb-2 text-stone-500">Output</p>
                            <pre className="overflow-x-auto whitespace-pre-wrap break-words bg-stone-100 p-3 font-mono text-stone-800">
                              {example.output}
                            </pre>
                          </div>
                          {example.explanation && (
                            <p className="leading-7 text-stone-600">
                              {example.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-700">
                    03 / Constraints
                  </p>
                  <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                    Constraints
                  </h2>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-stone-600">
                    {post.problem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-700">
                    04 / Solution
                  </p>
                  <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                    Approach
                  </h2>
                  <p className="whitespace-pre-line text-base leading-8 text-stone-600">
                    {post.problem.approach}
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                    C++ implementation
                  </h2>
                  <div className="overflow-hidden border border-stone-800">
                    <div className="flex items-center justify-between bg-stone-900 px-4 py-3 text-xs text-stone-400">
                      <span>solution.cpp</span>
                      <span>C++</span>
                    </div>
                    <pre className="overflow-x-auto bg-[#20201e] p-5 text-sm leading-7 text-stone-100">
                      <code>{post.problem.solution}</code>
                    </pre>
                  </div>
                </section>

                <section>
                  <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                    Complexity analysis
                  </h2>
                  <div className="grid gap-px border border-stone-200 bg-stone-200 sm:grid-cols-2">
                    <div className="bg-[#fafaf9] p-5">
                      <p className="text-sm text-stone-500">Time complexity</p>
                      <p className="mt-2 font-mono text-lg font-semibold">
                        {post.problem.complexity.time}
                      </p>
                    </div>
                    <div className="bg-[#fafaf9] p-5">
                      <p className="text-sm text-stone-500">Space complexity</p>
                      <p className="mt-2 font-mono text-lg font-semibold">
                        {post.problem.complexity.space}
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="h-fit border-t border-stone-200 pt-5 sm:sticky sm:top-8 sm:border-t-0 sm:pt-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                  Article details
                </p>
                <div className="mt-5 space-y-5 text-sm">
                  <div>
                    <p className="text-stone-500">Article</p>
                    <p className="mt-1 font-medium">
                      {String(post.id).padStart(2, "0")} / 10
                    </p>
                  </div>
                  <div>
                    <p className="text-stone-500">Category</p>
                    <p className="mt-1 font-medium">{post.category}</p>
                  </div>
                  <div>
                    <p className="text-stone-500">Difficulty</p>
                    <p className="mt-1 font-medium">{post.difficulty}</p>
                  </div>
                  <div>
                    <p className="text-stone-500">Reading time</p>
                    <p className="mt-1 font-medium">{post.readTime}</p>
                  </div>
                </div>

                <Link
                  href="/"
                  className="mt-8 inline-block text-sm font-medium text-blue-700 hover:text-blue-900"
                >
                  Explore more articles →
                </Link>
              </aside>
            </div>
          )}

          {!post.problem && (
            <section className="max-w-2xl py-10">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Article
              </h2>
              <p className="whitespace-pre-line text-base leading-8 text-stone-600">
                {post.body}
              </p>
            </section>
          )}
        </article>

        <footer className="border-t border-stone-200 py-6 text-xs leading-5 text-stone-500">
          the.dev/journal · Article content is cached and revalidated on the server.
        </footer>
      </div>
    </main>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!/^\d+$/.test(id) || Number(id) < 1 || Number(id) > 10) {
    notFound();
  }

  return <CachedBlogPost id={id} />;
}