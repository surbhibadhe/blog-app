
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";

const categories = ["All", "DSA", "Backend", "System Design"];

export default function ArticleFilters({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 border-b border-stone-200 pb-5 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            The collection
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Problems and concepts worth understanding.
          </p>
        </div>

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search articles..."
          aria-label="Search articles"
          className="w-full border-b border-stone-300 bg-transparent py-2 text-sm outline-none placeholder:text-stone-400 sm:w-52"
        />
      </div>

      <div className="flex flex-wrap gap-2 py-5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeCategory === category
                ? "bg-[#20201e] text-white"
                : "border border-stone-200 text-stone-600 hover:border-stone-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="divide-y divide-stone-200 border-t border-stone-200">
        {filteredPosts.map((post, index) => (
          <article
            key={post.id}
            className="group grid gap-3 py-6 sm:grid-cols-[50px_1fr_auto] sm:items-start sm:gap-5"
          >
            <span className="pt-1 font-mono text-xs text-stone-400">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <div className="mb-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="font-medium text-blue-700">
                  {post.category}
                </span>
                <span className="text-stone-400">/</span>
                <span className="text-stone-500">{post.difficulty}</span>
                <span className="text-stone-400">/</span>
                <span className="text-stone-500">{post.readTime}</span>
              </div>

              <Link href={`/blog/${post.id}`}>
                <h3 className="text-lg font-semibold tracking-tight transition group-hover:text-blue-700">
                  {post.title}
                </h3>
              </Link>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                {post.body}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-stone-400">
                    #{tag.replaceAll(" ", "")}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/blog/${post.id}`}
              aria-label={`Read ${post.title}`}
              className="hidden pt-1 text-stone-400 transition group-hover:translate-x-1 group-hover:text-blue-700 sm:block"
            >
              →
            </Link>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <p className="py-12 text-center text-sm text-stone-500">
            No articles match your search.
          </p>
        )}
      </div>
    </section>
  );
}
