import Link from "next/link";
import { getPosts, getUser } from "@/lib/posts";

import { connection } from "next/server";

export const instant = false;

export default async function Dashboard() {
  await connection();

  const userId = 1;

  const [user, posts] = await Promise.all([
    getUser(userId),
    getPosts(),
  ]);

  const userPosts = posts.filter((post) => post.userId === userId);

  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#20201e]">
      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-10">
        <nav className="flex items-center justify-between border-b border-stone-200 pb-5">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            the.dev<span className="text-blue-600">/</span>journal
          </Link>
          <span className="text-xs text-stone-500">Account dashboard</span>
        </nav>

        <header className="border-b border-stone-200 py-10 sm:py-14">
          <Link
            href="/"
            className="text-sm text-stone-500 transition hover:text-blue-700"
          >
            ← Back to articles
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Personal workspace
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Welcome back, {user.name}.
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-stone-600">
            Manage your reading activity and explore the engineering notes
            published on the blog.
          </p>
        </header>

        <section className="grid gap-px border border-stone-200 bg-stone-200 sm:grid-cols-3">
          <div className="bg-[#fafaf9] p-6 sm:p-7">
            <p className="text-sm text-stone-500">Username</p>
            <p className="mt-3 text-lg font-medium">{user.username}</p>
          </div>

          <div className="bg-[#fafaf9] p-6 sm:p-7">
            <p className="text-sm text-stone-500">Available articles</p>
            <p className="mt-3 text-3xl font-semibold tabular-nums">
              {userPosts.length.toString().padStart(2, "0")}
            </p>
          </div>

          <div className="bg-[#fafaf9] p-6 sm:p-7">
            <p className="text-sm text-stone-500">Email address</p>
            <p className="mt-3 break-words text-sm font-medium">
              {user.email}
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-stone-500">
                Your library
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Published articles
              </h2>
            </div>
            <span className="text-sm text-stone-500">
              {userPosts.length} articles
            </span>
          </div>

          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {userPosts.map((post, index) => (
              <article
                key={post.id}
                className="group flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex gap-5">
                  <span className="pt-1 font-mono text-sm text-stone-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-medium text-blue-700">
                        {post.category}
                      </span>
                      <span className="text-stone-400">
                        {post.difficulty}
                      </span>
                      <span className="text-stone-400">
                        {post.readTime} read
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold tracking-tight transition group-hover:text-blue-700">
                      {post.title}
                    </h3>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                      {post.body}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-stone-200 px-2 py-1 text-xs text-stone-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.id}`}
                  className="shrink-0 text-sm font-medium text-stone-600 transition hover:text-blue-700 sm:pt-1"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <footer className="border-t border-stone-200 py-6 text-xs leading-5 text-stone-500">
          the.dev/journal · Dashboard rendered on the server.
        </footer>
      </div>
    </main>
  );
}