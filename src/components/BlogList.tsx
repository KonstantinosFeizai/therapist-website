"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

export default function BlogList({
  posts,
  lang,
}: {
  posts: any[];
  lang: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // 1. Φιλτράρισμα
  const filteredPosts = useMemo(() => {
    setCurrentPage(1);
    return posts.filter((post) => {
      const matchesSearch =
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;

      // Η νέα λογική για τις κατηγορίες:
      const matchesCategory =
        selectedCategory === "All" ||
        post.categories?.includes(selectedCategory); // Ελέγχει αν η κατηγορία υπάρχει στον πίνακα

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  // 2. Υπολογισμός Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const categories = useMemo(() => {
    // Παίρνουμε όλες τις κατηγορίες από όλα τα posts και τις βάζουμε σε έναν ενιαίο πίνακα
    const allCats = posts.flatMap((post) => post.categories || []);
    // Κρατάμε μόνο τις μοναδικές τιμές
    return ["All", ...new Set(allCats)];
  }, [posts]);

  return (
    <div>
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat: any) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-slate-800 text-white shadow-lg"
                  : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
              }`}
            >
              {cat === "All" ? (lang === "el" ? "Όλα" : "All") : cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder={lang === "el" ? "Αναζήτηση..." : "Search articles..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-100 shadow-sm text-slate-600"
          />
          <svg
            className="absolute right-4 top-3.5 h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Grid  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {currentPosts.map((post: any) => (
          <Link
            href={`/${lang}/blog/${post.slug}`}
            key={post.slug}
            className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative h-72 w-full overflow-hidden">
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}

              {/* Εδώ είναι η διόρθωση: Ελέγχουμε αν υπάρχει ο πίνακας categories και αν έχει περιεχόμενο */}
              {post.categories && post.categories.length > 0 && (
                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                  {post.categories.slice(0, 2).map((cat: string) => (
                    <span
                      key={cat}
                      className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-slate-800 rounded-2xl shadow-sm"
                    >
                      {cat}
                    </span>
                  ))}
                  {/* Προαιρετικό: Ένδειξη αν υπάρχουν περισσότερες από 2 */}
                  {post.categories.length > 2 && (
                    <span className="px-2 py-2 bg-white/70 backdrop-blur-sm text-[10px] font-bold text-slate-600 rounded-2xl shadow-sm">
                      +{post.categories.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-slate-400">
                  {new Date(post.publishedAt).toLocaleDateString(
                    lang === "el" ? "el-GR" : "en-US",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-sky-500 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-500 font-light text-sm line-clamp-2 leading-relaxed">
                {post.excerpt ||
                  (lang === "el" ? "Διαβάστε περισσότερα..." : "Read more...")}
              </p>
              <div className="mt-6 flex items-center text-sm font-medium text-slate-800 gap-2">
                {lang === "el" ? "Διαβάστε περισσότερα" : "Read more"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12 pb-10">
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-slate-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                  currentPage === i + 1
                    ? "bg-slate-800 text-white shadow-md"
                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-slate-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
